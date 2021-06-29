<script>
  import Button from 'UI/Button.svelte'
  import { isOpen } from 'Stores/SceneGraphPanel.js';

  $: icon = $isOpen ? 'hide scene graph' : 'show scene graph'

  function onClick() {
    $isOpen = !$isOpen
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
