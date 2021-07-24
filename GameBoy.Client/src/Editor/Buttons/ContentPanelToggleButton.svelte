<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isOpen, isGlowing } from 'Stores/ContentPanel.js'
  import { toggleSingleton } from 'Stores/DynamicPanels.js'

  let icon
  let title

  $: $isOpen, update()

  function update() {
    toggleSingleton('content', $isOpen)
    if ($isOpen) {
      icon = 'mdi:archive'
      title = 'Click to close the Content panel'
    } else {
      icon = 'mdi:archive-outline'
      title = 'Click to open the Content panel'
    }
  }
</script>

<ToggleButton bind:value={$isOpen} bind:mayChange={$isGlowing} {icon} {title} />