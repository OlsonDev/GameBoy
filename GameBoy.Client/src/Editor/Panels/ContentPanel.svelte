<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import ContentPanelContextMenu from 'Editor/Menus/ContentPanelContextMenu.svelte'
  import { isOpen, isGlowing, content } from 'Stores/ContentPanel.js'
  import { panelsElem } from 'Stores/DynamicPanels.js'
  import { pluralize } from 'Services/Strings.js'

  export let panel
  export let panelProps = {}

  $: isEmbedded = panelProps.noHeader || panelProps.noBody

  let showContextMenu = false

  let panelElem
  let menuLeft = 0
  let menuTop = 0

  function onContextMenu(e) {
    e.preventDefault()
    showContextMenu = true
    const { offsetParent } = panelElem
    const style = window.getComputedStyle(offsetParent);
    const matrix = new DOMMatrix(style.transform);
    const translateX = matrix.m41
    const translateY = matrix.m42
    menuLeft = e.clientX - offsetParent.offsetLeft - translateX
    menuTop = e.clientY - offsetParent.offsetTop - translateY
    if (isEmbedded) {
      menuLeft -= $panelsElem.offsetLeft
      menuTop -= $panelsElem.offsetTop
    }
  // TODO: Popper.js so it doesn't go offscreen
  }
</script>

{#if $isOpen}
  <Panel bind:panelElem {panel} name="Content" icon="mdi:archive" isGlowing={$isGlowing} class="content-panel" {onContextMenu} {...panelProps}>
    <div slot="header">
      <Badge countable={$content} title="{pluralize($content, 'item')} available" />
    </div>

    <div class={isEmbedded ? 'absolute w-full h-full' : ''}>
      {#each $content as object, i (i)}
        {object.name}
      {/each}
    </div>
  </Panel>

  <ContentPanelContextMenu bind:isOpen={showContextMenu} top={menuTop} left={menuLeft}/>
{/if}
