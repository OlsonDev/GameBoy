<script>
  export let onClick = null
</script>

<button class="btn" on:click={onClick}><slot/></button>

<style>
  .btn {
    padding: 5px;
  }
</style>
