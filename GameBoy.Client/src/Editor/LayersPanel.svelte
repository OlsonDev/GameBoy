<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, layers } from 'Stores/LayersPanel.js'
</script>

{#if $isOpen}
  <Panel name="Layers">
    {#each $layers as layer, i (i)}
      {layer.name} ({layer.objects.length})
    {/each}
  </Panel>
{/if}