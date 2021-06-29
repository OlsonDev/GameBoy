<script>
  import Panel from 'UI/Panel.svelte'
  import { isOpen, isGlowing, content } from 'Stores/ContentPanel.js'
</script>

{#if $isOpen}
  <Panel name="Content" icon="mdi:archive" isGlowing={$isGlowing}>
    {#each $content as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}