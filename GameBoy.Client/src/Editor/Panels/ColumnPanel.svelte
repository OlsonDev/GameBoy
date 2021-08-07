<script>
  export let panel // This container panel itself
  export let panels = [] // The panels in the this container
</script>

<div class="panel p-1 bg-gray-800 text-white border border-gray-900">
  <div class="tabs">
    {#each panels as panel (panel.id)}
      <svelte:component this={panel.panelComponent} {...panel.props} {panel} />
    {/each}
  </div>
</div>