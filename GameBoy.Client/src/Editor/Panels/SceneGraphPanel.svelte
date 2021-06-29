<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, isGlowing, scene } from 'Stores/SceneGraphPanel.js'
</script>

{#if $isOpen}
  <Panel name="Scene graph" icon="mdi:graph" isGlowing={$isGlowing}>
    {#each $scene as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}