<script>
  import Button from 'UI/Button.svelte'

  export let isPlaying

  $: icon = isPlaying ? 'pause' : 'play'

  function onClick() {
    isPlaying = !isPlaying
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
