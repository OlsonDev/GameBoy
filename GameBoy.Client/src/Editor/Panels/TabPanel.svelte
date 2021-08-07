<script>
  import { clamp } from 'lodash'
  import { moveToTop, isDraggingPanel, resizePanel, undockPanel, dropPanelPlacement } from 'Stores/DynamicPanels.js'
  import Icon from 'UI/Icon.svelte'
  import interact from 'interactjs'
  import UI from 'Services/UI.js'

  export let panel // The TabPanel itself
  export let panels = [] // The Panels in the TabPanel
  let className = null
  export { className as class }

  let activePanel = null
  let activePanelIndex = -1

  $: panels, setActivePanelIfNecessary()

  function setActivePanelIfNecessary() {
    const foundIndex = panels.indexOf(activePanel)
    if (foundIndex >= 0) {
      if (activePanelIndex !== foundIndex) activePanelIndex = foundIndex
      return
    }
    if (panels.length) {
      activePanelIndex = clamp(activePanelIndex - 1, 0, panels.length - 1)
      activePanel = panels[activePanelIndex]
      return
    }
    activePanelIndex = -1
    activePanel = null
  }

  export function onResize(oldPlacement, newPlacement) {
    console.log('onResize called!')
  }



  // TODO: Consolidate this with <Panel>:



  let panelElem = null
  let dragElem = null
  $: panelElem, dragElem, setInteractable()
  $: panelElem, dragElem, panel, setResizableEdges()

  const resizableListeners = {
    move: resizeMoveListener,
  }

  let interactable = null
  function setInteractable() {
    if (!panelElem || !dragElem) return
    interactable = interact(panelElem)
      .draggable({
        allowFrom: dragElem,
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
        margin: 4,
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
    undockPanel(panel, panelElem)
    panel = panel
  }

  function dragMoveListener(e) {
    moveToTop(panel)
    panel.placement.translateX += e.dx
    panel.placement.translateY += e.dy
    $isDraggingPanel = panel
  }

  function dragEndListener(e) {
    if ($isDraggingPanel === panel) {
      $isDraggingPanel = null
      $dropPanelPlacement = null
    }
  }

  function resizeMoveListener(e) {
    moveToTop(panel)
    resizePanel(panel, e)
    panel = panel
  }
</script>

<div
  bind:this={panelElem}
  class="panel bg-gray-800 text-white border border-gray-800 absolute{className ? ` ${className}` : ''}"
  style={UI.placementStyle(panel.placement)}
  on:focusin={() => moveToTop(panel)}
  on:click={() => moveToTop(panel)}
>

<div bind:this={dragElem} class="tabs flex items-start bg-gray-600">
    <div>
      <Icon name="mdi:drag" />
    </div>
    {#each panels as panel (panel.id)}
      <div on:click={() => (activePanel = panel)} class="cursor-pointer px-2 {panel === activePanel ? 'bg-gray-800' : 'bg-gray-700'}">
        <svelte:component this={panel.panelComponent} {...panel.props} {panel} noBody/>
      </div>
    {/each}
  </div>

  <div class="content p-1 w-full h-full">
    {#if activePanel}
      <svelte:component this={activePanel.panelComponent} {...activePanel.props} panel={activePanel} noHeader/>
    {/if}
  </div>
</div>
