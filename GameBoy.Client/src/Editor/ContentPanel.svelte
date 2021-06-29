<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, content } from 'Stores/ContentPanel.js'
</script>

{#if $isOpen}
  <Panel name="Content">
    {#each $content as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}