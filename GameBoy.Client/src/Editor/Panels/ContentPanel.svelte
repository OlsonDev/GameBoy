<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import ContentPanelContextMenu from 'Editor/Menus/ContentPanelContextMenu.svelte'
  import { isOpen, isGlowing, content } from 'Stores/ContentPanel.js'
  import { pluralize } from 'Services/Strings.js'

  let showContextMenu = false

  function onContextMenu(e) {
    e.preventDefault()
    showContextMenu = true
  }
</script>

{#if $isOpen}
  <Panel name="Content" icon="mdi:archive" isGlowing={$isGlowing} class="content-panel" {onContextMenu}>
    <div slot="header">
      <Badge countable={$content} title="{pluralize($content, 'item')} available" />
    </div>

    {#each $content as object, i (i)}
      {object.name}
    {/each}
  </Panel>

  <ContentPanelContextMenu bind:isOpen={showContextMenu}/>
{/if}
