<script>
  import { addType, panels, panelsElem } from 'Stores/DynamicPanels.js'
  import ContentPanel from 'Editor/Panels/ContentPanel.svelte'
  import LayersPanel from 'Editor/Panels/LayersPanel.svelte'
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import PanelEventHandler from 'UI/PanelEventHandler.svelte'
  import PanelDropTarget from 'UI/PanelDropTarget.svelte'
  import PanelDropTargetHint from 'UI/PanelDropTargetHint.svelte'
  import PropertiesPanel from 'Editor/Panels/PropertiesPanel.svelte'
  import SceneGraphPanel from 'Editor/Panels/SceneGraphPanel.svelte'
  import TextureEditorPanel from 'Editor/Panels/TextureEditorPanel.svelte'
  import TabPanel from 'Editor/Panels/TabPanel.svelte'
  import ColumnPanel from 'Editor/Panels/ColumnPanel.svelte'
  import RowPanel from 'Editor/Panels/RowPanel.svelte'

  const contentPlacement = { bottom: 0 }
  const layersPlacement = { right: 0, top: 0 }
  const propertiesPlacement = { right: 0, bottom: 0 }
  const sceneGraphPlacement = { left: 0, top: 0, bottom: 0 }

  addType('content', ContentPanel, { placement: contentPlacement })
  addType('layers', LayersPanel, { placement: layersPlacement })
  addType('properties', PropertiesPanel, { placement: propertiesPlacement })
  addType('scene-graph', SceneGraphPanel, { placement: sceneGraphPlacement })
  addType('texture-editor', TextureEditorPanel)
  addType('tab-panel', TabPanel)
  addType('column-panel', ColumnPanel)
  addType('row-panel', RowPanel)

  $: if ($panelsElem && $panels.length) addPanelTypes()
  let addedPanelTypes = false
  function addPanelTypes() {
    if (addedPanelTypes) return
    addedPanelTypes = true
    const height = $panelsElem.offsetHeight
    const width = $panelsElem.offsetWidth
    const sidePanelWidth = 0.2 * width
    const halfHeight = 0.5 * height
    const contentHeight = 0.3 * height
    // TODO: Why is this sometimes like 1/10th what it should be?
    // console.log(height)
    // TODO: This code sucks. Figure out a better way to avoid this race condition
    // where $panelsElem's size can't be figured out till later.
    for (const panel of $panels) {
      const p = panel.placement
      switch (panel.type) {
        case 'content':
          p.height = contentHeight
          p.left = sidePanelWidth
          p.right = sidePanelWidth
          break;
        case 'layers':
          p.height = halfHeight
          p.width = sidePanelWidth
          break;
        case 'properties':
          p.height = halfHeight
          p.width = sidePanelWidth
          break;
        case 'scene-graph':
          p.width = sidePanelWidth
          break;
      }
    }
    $panels = $panels
  }
</script>

<main class="flex flex-col h-screen w-screen overflow-hidden bg-sky-900">
  <MainTitleBar />

  <div bind:this={$panelsElem} class="panels relative flex-grow">
    {#each $panels as panel (panel.id)}
      <svelte:component this={panel.panelComponent} {...panel.props} {panel} />
    {/each}

    <PanelDropTargetHint />
    <PanelDropTarget />
  </div>
</main>

<PanelEventHandler />
