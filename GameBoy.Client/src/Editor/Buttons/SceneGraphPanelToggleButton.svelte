<script>
  import ToggleButton from 'UI/ToggleButton.svelte'
  import { isOpen, isGlowing } from 'Stores/SceneGraphPanel.js'
  import { toggleSingleton } from 'Stores/DynamicPanels.js'

  let icon
  let title

  $: $isOpen, update()

  function update() {
    toggleSingleton('scene-graph', $isOpen)
    if ($isOpen) {
      icon = 'mdi:graph'
      title = 'Click to close the Scene graph panel'
    } else {
      icon = 'mdi:graph-outline'
      title = 'Click to open the Scene graph panel'
    }
  }
</script>

<ToggleButton bind:value={$isOpen} bind:mayChange={$isGlowing} {icon} {title} />
