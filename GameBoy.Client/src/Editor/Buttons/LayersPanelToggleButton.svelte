<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isOpen, isGlowing } from 'Stores/LayersPanel.js'
  import { toggleSingleton } from 'Stores/DynamicPanels.js'

  let icon
  let title

  $: $isOpen, update()

  function update() {
    toggleSingleton('layers', $isOpen)
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