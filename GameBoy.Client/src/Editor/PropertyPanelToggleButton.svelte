<script>
  import Button from 'UI/Button.svelte'

  export let isVisible

  $: icon = isVisible ? 'hide props' : 'show props'

  function onClick() {
    isVisible = !isVisible
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
