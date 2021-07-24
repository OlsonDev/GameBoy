<script>
  import Icon from 'UI/Icon.svelte';

  export let onClick = null
  export let onFocus = null
  export let onBlur = null
  export let onMouseEnter = null
  export let onMouseLeave = null

  export let icon = null
  export let iconWidth = null
  export let iconHeight = null
  export let title
  export let disabled = false
  let className = null
  export { className as class }
</script>

<button
  class="btn flex items-center gap-1{className ? ` ${className}` : ''}"
  {title}
  {disabled}
  on:click={onClick}
  on:focus={onFocus}
  on:blur={onBlur}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}>{#if icon}<Icon name={icon} width={iconWidth} height={iconHeight} />{/if}<slot/></button>

  <style lang="postcss">
    .btn.toggle-btn, .btn.title-bar-btn {
      @apply p-1 border border-white text-white;
    }

    .btn[disabled] {
      @apply cursor-default;
    }
  </style>