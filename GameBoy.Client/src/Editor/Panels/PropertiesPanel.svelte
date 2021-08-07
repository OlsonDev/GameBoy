<script>
  import Panel from 'UI/Panel.svelte';
  import { selectedObject } from 'Stores/Editor.js';
  import { isOpen, isGlowing } from 'Stores/PropertiesPanel.js';

  export let panel
  export let noHeader = false
  export let noBody = false

  $: entries = buildEntries($selectedObject)

  function buildEntries(object) {
    if (object == null) return null
    const entries = Object.entries(object).map(([key, value]) => ({ key, value }))
    return entries
  }
</script>

{#if $isOpen}
  <Panel {panel} name="Properties" icon="mdi:file-document-edit" isGlowing={$isGlowing} class="properties-panel" {noHeader} {noBody}>
    {#if entries == null}
      No object selected
    {:else}
      <table class="properties-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {#each entries as entry}
            <tr>
              <td>{entry.key}</td>
              <td>{entry.value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </Panel>
{/if}

<style lang="scss">
  .properties-table {
    text-align: left;

    th, td {
      padding: 0 20px 0 0;
    }
  }
</style>