<script>
  import Icon from 'UI/Icon.svelte';

  export let onClick = null
  export let onFocus = null
  export let onBlur = null
  export let onMouseEnter = null
  export let onMouseLeave = null

  export let icon = null
  export let title
</script>

<button
  class="btn"
  {title}
  on:click={onClick}
  on:focus={onFocus}
  on:blur={onBlur}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}>{#if icon}<Icon name={icon} />{/if}<slot/></button>

<style>
  .btn {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
