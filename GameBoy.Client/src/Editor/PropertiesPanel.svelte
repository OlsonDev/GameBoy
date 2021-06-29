<script>
  import Panel from 'UI/Panel.svelte'

  export let object = null
  export let isVisible
</script>

{#if isVisible}
  <Panel name="Properties">
    {#if object == null}
      No object selected
    {:else}
      TODO...
    {/if}
  </Panel>
{/if}
