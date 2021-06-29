<script>
  import Button from 'UI/Button.svelte';

  export let icon
  export let title
  export let value
  export let mayChange

  let isFocused = false
  let isOver = false

  $: mayChange = isFocused || isOver

  function onClick() {
    value = !value
  }
</script>

<Button
  {icon}
  {title}
  {onClick}
  onFocus={(() => isFocused = true)}
  onBlur={(() => isFocused = false)}
  onMouseEnter={(() => isOver = true)}
  onMouseLeave={(() => isOver = false)}
/>