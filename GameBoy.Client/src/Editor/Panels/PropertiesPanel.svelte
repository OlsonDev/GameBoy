<script>
  import Panel from 'UI/Panel.svelte';
  import { selectedObject } from 'Stores/Editor.js';
  import { isOpen, isGlowing } from 'Stores/PropertiesPanel.js';
</script>

{#if $isOpen}
  <Panel name="Properties" icon="mdi:file-document-edit" isGlowing={$isGlowing} class="properties-panel">
    {#if $selectedObject == null}
      No object selected
    {:else}
      TODO...
    {/if}
  </Panel>
{/if}
