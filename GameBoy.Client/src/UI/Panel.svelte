<script>
  import Icon from 'UI/Icon.svelte'
  import Badge from 'UI/Badge.svelte'

  export let name
  export let icon
  export let isGlowing = false
  let className = null;
  export { className as class };
</script>

<div class="panel{className ? ` ${className}` : ''}" class:is-glowing={isGlowing}>
  <h3>
    <Icon name={icon} width={24} height={24} />
    <span>{name}</span>
    <slot name="header" />
  </h3>

  <slot />
</div>

<style lang="scss">
  .panel {
    background: #424242;
    border: 1px solid #212121;
    padding: 5px;
    color: #fff;

    > h3 {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
    }

    &.is-glowing {
      box-shadow: inset 0 0 10px 0 #FF9F00;
      border-color: #FF9F00;
    }
  }
</style>
