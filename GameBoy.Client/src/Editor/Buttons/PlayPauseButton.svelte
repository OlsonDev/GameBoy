<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isPlaying } from 'Stores/Editor.js';

  let icon
  let title

  $: $isPlaying, update()

  function update() {
    if ($isPlaying) {
      icon = 'mdi:pause'
      title = 'Click to pause'
    } else {
      icon = 'mdi:play'
      title = 'Click to play'
    }
  }
</script>

<ToggleButton bind:value={$isPlaying} {icon} {title} />