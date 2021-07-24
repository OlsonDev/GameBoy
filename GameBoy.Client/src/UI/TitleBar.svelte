<script>
  let className = null;
  export { className as class };
</script>

<div class="title-bar top-0 flex gap-1 bg-gray-800{className ? ` ${className}` : ''}">
  <slot />
</div>

<style>
  .title-bar {
    height: var(--title-bar-height);
  }
</style>
