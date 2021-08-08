<script>
  import { moveToTop, isDraggingPanel, isResizingPanel, resizePanel, undockPanel, dropPanelPlacement } from 'Stores/DynamicPanels.js'
  import { noop } from 'lodash'
  import Icon from 'UI/Icon.svelte'
  import interact from 'interactjs'
  import UI from 'Services/UI.js'

  export let panelElem = null
  export let panel
  export let name = null
  export let icon = null
  export let isGlowing = false
  let className = null
  export { className as class }
  export let onContextMenu = noop
  export let noHeader = false
  export let noBody = false
  export let isContainer = false
  export let isPositioned = false
  export let isDraggable = true
  export let isResizable = true
  export let resizableEdgeOverrides = {}
  export let draggableListeners = {}
  export let resizableListeners = {}

  $: isEmbedded = noBody || noHeader

  let headerElem = null
  $: panelElem, setInteractable()
  $: panelElem, headerElem, setDraggable()
  // TODO: setResizable() gets called roughly infinity times once a resize starts
  $: panelElem, setResizable()
  $: panelElem, panel, setResizableEdges()

  let interactable = null
  function setInteractable() {
    if (!panelElem || (!isDraggable && !isResizable)) return
    interactable = interact(panelElem)
  }

  let draggableHasBeenSet = false
  function setDraggable() {
    if (!interactable || !isDraggable || $isDraggingPanel === panel || draggableHasBeenSet) return
    draggableHasBeenSet = true
    interactable.draggable({
      allowFrom: headerElem,
      onstart: dragStartListener,
      onmove: dragMoveListener,
      onend: dragEndListener,
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'parent',
        })
      ],
    })
  }

  let resizableHasBeenSet = false
  function setResizable() {
    if (!interactable || !isResizable || $isResizingPanel === panel || resizableHasBeenSet) return
    resizableHasBeenSet = true
    interactable.resizable({
        edges: { ...UI.getPlacementResizeEdges(panel.placement), ...resizableEdgeOverrides },
        onstart: resizeStartListener,
        onmove: resizeMoveListener,
        onend: resizeEndListener,
        margin: 4,
        modifiers: isPositioned ? [] : [
          interact.modifiers.restrictSize({
            min: { width: 320, height: 240 }
          }),
        ],
      })
  }

  function setResizableEdges() {
    if (!interactable || !isResizable || $isResizingPanel === panel) return
    interactable.resizable({
      edges: { ...UI.getPlacementResizeEdges(panel.placement), ...resizableEdgeOverrides },
    })
  }

  function dragStartListener(e) {
    e.interactable.panel = panel
    $isDraggingPanel = panel
    const shouldUndock = draggableListeners.onstart?.(e)
    if (shouldUndock !== false) {
      undockPanel(panel, panelElem)
    }
    panel = panel
  }

  function dragMoveListener(e) {
    moveRootPanelToTop()
    panel.placement.translateX += e.dx
    panel.placement.translateY += e.dy
    draggableListeners.onmove?.(e)
  }

  function dragEndListener(e) {
    if ($isDraggingPanel === panel) {
      $isDraggingPanel = null
      $dropPanelPlacement = null
      draggableListeners.onend?.(e)
    }
  }

  function resizeStartListener(e) {
    e.interactable.panel = panel
    $isResizingPanel = panel
    resizableListeners.onstart?.(e)
  }

  function resizeMoveListener(e) {
    moveRootPanelToTop()
    resizePanel(panel, e)
    panel = panel
    resizableListeners.onmove?.(e)
  }

  function resizeEndListener(e) {
    if ($isDraggingPanel === panel) {
      $isResizingPanel = null
      resizableListeners.onend?.(e)
    }
  }

  function moveRootPanelToTop() {
    let p = panel
    while (p.parentPanel) {
      p = p.parentPanel
    }
    moveToTop(p)
  }
</script>

<div
  bind:this={panelElem}
  class="panel{isContainer ? '' : ' p-1'}{isEmbedded || isContainer ? '' : ' bg-gray-800 text-white border border-gray-900'}{isEmbedded || isPositioned ? '' : ' absolute'}{className ? ` ${className}` : ''}"
  class:is-glowing={isGlowing}
  style={isEmbedded && !isContainer ? null : UI.placementStyle(panel.placement)}
  on:contextmenu={noBody ? null : onContextMenu}
  on:focusin={isEmbedded ? null : moveRootPanelToTop}
  on:click={isEmbedded ? null : moveRootPanelToTop}
>
  {#if !noHeader && !isContainer}
    <h3 bind:this={headerElem} class="flex items-center gap-2 text-sm">
      <Icon name={icon} width={24} height={24} />
      <span>{name}</span>
      <slot name="header" />
    </h3>
  {/if}

  {#if !noBody}
    <slot />
  {/if}
</div>

<style lang="postcss">
  .panel.is-glowing {
      box-shadow: inset 0 0 10px 0 theme('colors.yellow.500');
      @apply border-yellow-500;
  }
</style>
