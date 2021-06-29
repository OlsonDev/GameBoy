<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, scene } from 'Stores/SceneGraphPanel.js'
</script>

{#if $isOpen}
  <Panel name="Scene graph">
    {#each $scene as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}