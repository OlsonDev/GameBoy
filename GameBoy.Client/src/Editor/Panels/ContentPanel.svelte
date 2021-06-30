<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import { isOpen, isGlowing, content } from 'Stores/ContentPanel.js'
  import { pluralize } from 'Services/Strings.js'
</script>

{#if $isOpen}
  <Panel name="Content" icon="mdi:archive" isGlowing={$isGlowing} class="content-panel">
    <div slot="header" class="flex-center">
      <Badge pink countable={$content} title="{pluralize($content, 'item')} available" />
    </div>

    {#each $content as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}
