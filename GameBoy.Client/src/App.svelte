<script>
  import ContentPanel from 'Editor/Panels/ContentPanel.svelte'
  import LayersPanel from 'Editor/Panels/LayersPanel.svelte'
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import PropertiesPanel from 'Editor/Panels/PropertiesPanel.svelte'
  import SceneGraphPanel from 'Editor/Panels/SceneGraphPanel.svelte'
  import WorldViewport from 'Editor/WorldViewport.svelte'
</script>

<main>
  <WorldViewport />

  <div class="overlays">
    <MainTitleBar />
    <PropertiesPanel />
    <SceneGraphPanel />
    <LayersPanel />
    <ContentPanel />
  </div>
</main>

<style global lang="scss">
  main {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    :global(> *) {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .overlays {
      display: grid;
      grid-template-areas:
        "titlebar titlebar titlebar"
        "properties open scene"
        "properties open layers"
        "properties content layers";

        grid-template-rows: auto 4fr 1fr 2fr;
        grid-template-columns: 1fr 4fr  1fr;
    }

    :global(.main-title-bar) {
      grid-area: titlebar;
    }

    :global(.properties-panel) {
      grid-area: properties;
    }

    :global(.scene-graph-panel) {
      grid-area: scene;
    }

    :global(.layers-panel) {
      grid-area: layers;
    }

    :global(.content-panel) {
      grid-area: content;
    }
  }
</style>
