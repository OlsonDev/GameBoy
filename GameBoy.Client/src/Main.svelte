<script>
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import { panels } from 'Stores/DynamicPanels.js'

</script>

<main>
  <MainTitleBar />

  <div class="panels">
    {#each $panels as panel}
      <svelte:component this={panel.panelComponent} {...panel.props} />
    {/each}
  </div>
</main>

<style global lang="postcss">
  main {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    @apply bg-sky-900;
  }

  main > .panels {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
