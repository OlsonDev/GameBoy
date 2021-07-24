<script>
  let className = null;
  export { className as class };
</script>

<div class="title-bar flex gap-1 bg-gray-800{className ? ` ${className}` : ''}">
  <slot />
</div>
