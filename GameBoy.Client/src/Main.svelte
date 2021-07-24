<script>
  import MainTitleBar from 'Editor/MainTitleBar.svelte'
  import { panels } from 'Stores/DynamicPanels.js'
</script>

<main class="flex flex-col h-screen w-screen overflow-hidden bg-sky-900">
  <MainTitleBar />

  <div class="panels relative flex-grow">
    {#each $panels as panel}
      <svelte:component this={panel.panelComponent} {...panel.props} />
    {/each}
  </div>
</main>
