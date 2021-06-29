<script>
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import WorldViewport from 'Editor/WorldViewport.svelte'
  import PropertiesPanel from 'Editor/PropertiesPanel.svelte'

  let isPlaying = true
  let isPropertyPanelVisible = true

</script>

<main>
  <MainTitleBar {isPlaying} bind:isPropertyPanelVisible />
  <WorldViewport/>
  <PropertiesPanel isVisible={isPropertyPanelVisible}/>
</main>

<style lang="scss">
  main {
    display: grid;
  }
</style>
