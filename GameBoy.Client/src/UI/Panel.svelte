<script>
  import { moveToTop, isDraggingPanel, resizePanel } from 'Stores/DynamicPanels.js'
  import { noop } from 'lodash'
  import Icon from 'UI/Icon.svelte'
  import interact from 'interactjs'
  import UI from 'Services/UI.js'

  export let panel
  export let name
  export let icon
  export let isGlowing = false
  let className = null
  export { className as class }
  export let onContextMenu = noop
  export let noHeader = false
  export let noBody = false

  let panelElem = null
  let headerElem = null
  $: panelElem, headerElem, setInteractable()
  $: panelElem, headerElem, panel, setResizableEdges()

  const resizableListeners = {
    move: resizeMoveListener,
  }

  let interactable = null
  function setInteractable() {
    if (!panelElem || !headerElem) return
    interactable = interact(panelElem)
      .draggable({
        panel,
        allowFrom: headerElem,
        listeners: {
          start: dragStartListener,
          move: dragMoveListener,
          end: dragEndListener,
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent',
          })
        ],
      })
      .resizable({
        edges: UI.getPlacementResizeEdges(panel.placement),
        listeners: resizableListeners,
      })
  }

  function setResizableEdges() {
    if (!interactable) return
    const edges = UI.getPlacementResizeEdges(panel.placement)
    interactable.resizable({
      edges
    })
  }

  function dragStartListener(e) {
    e.interactable.panel = panel
    UI.makeFloatingPlacement(panel.placement, panelElem)
    panel = panel
  }

  function dragMoveListener(e) {
    moveToTop(panel)
    panel.placement.transformX += e.dx
    panel.placement.transformY += e.dy
    $isDraggingPanel = panel
  }

  function dragEndListener(e) {
    if ($isDraggingPanel === panel) {
      $isDraggingPanel = null
    }
  }

  function resizeMoveListener(e) {
    resizePanel(panel, e)
    panel = panel
  }
</script>

<div
  bind:this={panelElem}
  class="panel absolute p-1 bg-gray-800 text-white border border-gray-900{className ? ` ${className}` : ''}"
  class:is-glowing={isGlowing}
  on:contextmenu={onContextMenu}
  on:focusin={() => moveToTop(panel)}
  on:click={() => moveToTop(panel)}
  style={UI.placementStyle(panel.placement)}
>
  {#if !noHeader}
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
