<script>
  import Panel from 'UI/Panel.svelte';
  import { selectedObject } from 'Stores/Editor.js';
  import { isOpen, isGlowing } from 'Stores/PropertiesPanel.js';

  $: entries = buildEntries($selectedObject)

  function buildEntries(object) {
    if (object == null) return null
    const entries = Object.entries(object).map((key, value) => ({ key, value }))
    return entries
  }
</script>

{#if $isOpen}
  <Panel name="Properties" icon="mdi:file-document-edit" isGlowing={$isGlowing} class="properties-panel">
    {#if entries == null}
      No object selected
    {:else}
      {#each entries as entry}
        {entry.key}<br/>
      {/each}
    {/if}
  </Panel>
{/if}
