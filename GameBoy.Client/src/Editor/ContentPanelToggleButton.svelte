<script>
  import Button from 'UI/Button.svelte'
  import { isOpen } from 'Stores/ContentPanel.js';

  $: icon = $isOpen ? 'hide content' : 'show content'

  function onClick() {
    $isOpen = !$isOpen
  }
</script>

<Button {icon} iconOnly {onClick}>{icon}</Button>
