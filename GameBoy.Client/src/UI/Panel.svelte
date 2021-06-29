<script>
  export let name
</script>

<div class="panel">
  <h3>{name}</h3>
  <slot />
</div>

<style lang="scss">
  .panel {
    border: 1px solid #666;
    padding: 5px;
  }
</style>
