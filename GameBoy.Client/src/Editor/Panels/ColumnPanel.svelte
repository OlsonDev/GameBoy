<script>
  import Panel from 'UI/Panel.svelte'

  export let panel // This container panel itself
  export let panels = [] // The panels in this container
</script>

<div class="panel">
  {#each panels as panel (panel.id)}
    <svelte:component this={panel.panelComponent} {...panel.props} {panel} />
  {/each}
</div>