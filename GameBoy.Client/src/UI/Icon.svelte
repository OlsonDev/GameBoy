<script>
  import IconifyIcon from '@iconify/svelte';
  // See https://docs.iconify.design/icon-components/svelte/#properties

  export let name
  export let width = 32
  export let height = 32
</script>

<IconifyIcon icon={name} {width} {height} />