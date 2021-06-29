<script>
  import Button from 'UI/Button.svelte'
  import { isOpen } from 'Stores/PropertiesPanel.js';

  $: icon = $isOpen ? 'hide props' : 'show props'

  function onClick() {
    $isOpen = !$isOpen
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
