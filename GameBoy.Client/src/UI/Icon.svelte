<script>
  import IconifyIcon from '@iconify/svelte';
  // See https://docs.iconify.design/icon-components/svelte/#properties

  export let name
  export let width = null
  export let height = null

  $: iconWidth = width ?? 32
  $: iconHeight = height ?? 32
</script>

<IconifyIcon icon={name} width={iconWidth} height={iconHeight} />