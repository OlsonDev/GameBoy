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
  <MainTitleBar />
  <PropertiesPanel />
  <LayersPanel />
  <ContentPanel />
  <SceneGraphPanel />
</main>

<style lang="scss">
  main {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
  }
</style>
