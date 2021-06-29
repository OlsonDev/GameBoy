<script>
  import Panel from 'UI/Panel.svelte';
  import { selectedObject } from 'Stores/Editor.js';
  import { isOpen } from 'Stores/PropertiesPanel.js';
</script>

{#if $isOpen}
  <Panel name="Properties">
    {#if $selectedObject == null}
      No object selected
    {:else}
      TODO...
    {/if}
  </Panel>
{/if}