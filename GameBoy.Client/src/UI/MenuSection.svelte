<script>
  import Icon from 'UI/Icon.svelte';

  export let name
  export let icon = null
</script>

<div class="menu-section contents">
  <div class="flex items-center gap-1 px-1">{#if icon}<Icon name={icon} width={24} height={24} /> {/if}{name}</div>
  <slot/>
</div>

<style global lang="scss">
  .menu-section {
    > :last-child {
      margin-bottom: 24px;
    }

    &:last-child > :last-child {
      margin-bottom: 0;
    }
  }
</style>