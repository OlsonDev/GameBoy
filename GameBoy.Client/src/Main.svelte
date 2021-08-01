<script>
  import { addType, panels } from 'Stores/DynamicPanels.js'
  import ContentPanel from 'Editor/Panels/ContentPanel.svelte'
  import LayersPanel from 'Editor/Panels/LayersPanel.svelte'
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import PropertiesPanel from 'Editor/Panels/PropertiesPanel.svelte'
  import SceneGraphPanel from 'Editor/Panels/SceneGraphPanel.svelte'
  import TextureEditorPanel from 'Editor/Panels/TextureEditorPanel.svelte'
  import PanelDropTarget from 'UI/PanelDropTarget.svelte'

  let panelsElem

  $: if (panelsElem) addPanelTypes()

  const px = n => `${n}px`

  function addPanelTypes() {
    console.log(panelsElem.offsetWidth, panelsElem.offsetHeight)
    const height = panelsElem.offsetHeight
    const width = panelsElem.offsetWidth
    addType('content', ContentPanel, { bottom: 0, height: px(0.3 * height), left: px(0.2 * width), right: px(0.2 * width) })
    addType('layers', LayersPanel, { right: 0, top: 0, bottom: px(0.5 * height), width: px(0.2 * width) })
    addType('properties', PropertiesPanel, { right: 0, top: px(0.5 * height), bottom: 0, width: px(0.2 * width) })
    addType('scene-graph', SceneGraphPanel, { left: 0, top: 0, bottom: 0, width: px(0.2 * width) })
    addType('texture-editor', TextureEditorPanel)
  }
</script>

<main class="flex flex-col h-screen w-screen overflow-hidden bg-sky-900">
  <MainTitleBar />

  <div bind:this={panelsElem} class="panels relative flex-grow">
    <div></div>
    {#each $panels as panel (panel.id)}
      <svelte:component this={panel.panelComponent} {...panel.props} {panel} />
    {/each}

    <PanelDropTarget />
  </div>
</main>
