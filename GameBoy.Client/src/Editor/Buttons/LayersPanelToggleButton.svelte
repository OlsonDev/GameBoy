<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isOpen, isGlowing } from 'Stores/LayersPanel.js';

  let icon
  let title

  $: $isOpen, update()

  function update() {
    if ($isOpen) {
      icon = 'mdi:layers'
      title = 'Click to close the Layers panel'
    } else {
      icon = 'mdi:layers-outline'
      title = 'Click to open the Layers panel'
    }
  }
</script>

<ToggleButton bind:value={$isOpen} bind:mayChange={$isGlowing} {icon} {title} />