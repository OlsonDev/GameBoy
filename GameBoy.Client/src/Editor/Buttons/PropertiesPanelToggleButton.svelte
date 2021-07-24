<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isOpen, isGlowing } from 'Stores/PropertiesPanel.js'
  import { toggleSingleton } from 'Stores/DynamicPanels.js'

  let icon
  let title

  $: $isOpen, update()

  function update() {
    toggleSingleton('properties', $isOpen)
    if ($isOpen) {
      icon = 'mdi:file-document-edit'
      title = 'Click to close the Properties panel'
    } else {
      icon = 'mdi:file-document-edit-outline'
      title = 'Click to open the Properties panel'
    }
  }
</script>

<ToggleButton bind:value={$isOpen} bind:mayChange={$isGlowing} {icon} {title} />