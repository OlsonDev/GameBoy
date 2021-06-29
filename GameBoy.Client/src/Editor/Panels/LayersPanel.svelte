<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, isGlowing, layers } from 'Stores/LayersPanel.js'
</script>

{#if $isOpen}
  <Panel name="Layers" icon="mdi:layers" isGlowing={$isGlowing}>
    {#each $layers as layer, i (i)}
      {layer.name} ({layer.objects.length})
    {/each}
  </Panel>
{/if}