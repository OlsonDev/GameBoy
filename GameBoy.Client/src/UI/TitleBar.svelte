<script>
  let className = null;
  export { className as class };
</script>

<div class="title-bar{className ? ` ${className}` : ''}">
  <slot />
</div>

<style lang="scss">
  .title-bar {
    display: flex;
    gap: 5px;
    background: #424242;
  }
</style>
