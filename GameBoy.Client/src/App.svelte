<script>
  import ContentPanel from 'Editor/ContentPanel.svelte'
  import LayersPanel from 'Editor/LayersPanel.svelte'
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import PropertiesPanel from 'Editor/PropertiesPanel.svelte'
  import SceneGraphPanel from 'Editor/SceneGraphPanel.svelte'
  import WorldViewport from 'Editor/WorldViewport.svelte'
</script>

<main>
  <MainTitleBar />
  <WorldViewport />
  <PropertiesPanel />
  <LayersPanel />
  <ContentPanel />
  <SceneGraphPanel />
</main>

<style lang="scss">
  main {
    display: grid;
  }
</style>
