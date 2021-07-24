<script>
  import { noop } from 'lodash'
  import Icon from 'UI/Icon.svelte'
  import UI from 'Services/UI.js'

  export let placement
  export let name
  export let icon
  export let isGlowing = false
  let className = null
  export { className as class }
  export let onContextMenu = noop
  export let noHeader = false
  export let noBody = false
</script>

<div
  class="panel absolute p-1 bg-gray-800 text-white border border-gray-900{className ? ` ${className}` : ''}"
  class:is-glowing={isGlowing}
  on:contextmenu={onContextMenu}
  style={UI.placementStyle(placement)}
>
  {#if !noHeader}
    <h3 class="flex items-center gap-2 text-sm">
      <Icon name={icon} width={24} height={24} />
      <span>{name}</span>
      <slot name="header" />
    </h3>
  {/if}

  {#if !noBody}
    <slot />
  {/if}
</div>

<style lang="postcss">
  .panel.is-glowing {
      box-shadow: inset 0 0 10px 0 theme('colors.yellow.500');
      @apply border-yellow-500;
  }
</style>
