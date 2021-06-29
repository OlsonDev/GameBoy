<script>
  import Button from 'UI/Button.svelte'
  import { isOpen } from 'Stores/LayersPanel.js';

  $: icon = $isOpen ? 'hide layers' : 'show layers'

  function onClick() {
    $isOpen = !$isOpen
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
