<script>
  import Icon from 'UI/Icon.svelte'

  export let name
  export let icon
  export let isGlowing = false
</script>

<div class="panel" class:is-glowing={isGlowing}>
  <h3><Icon name={icon} width={24} height={24} /> {name}</h3>
  <slot />
</div>

<style lang="scss">
  .panel {
    border: 1px solid #666;
    padding: 5px;

    > h3 {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &.is-glowing {
      box-shadow: inset 0 0 10px 0 #FF9F00;
      border-color: #FF9F00;
    }
  }
</style>
