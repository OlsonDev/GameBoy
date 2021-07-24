<script>
  export let width
  export let height

  $: widthUnit = getUnit(width)
  $: heightUnit = getUnit(height)

  function getUnit(length) {
    if (typeof length === 'number') return 'px'
    return ''
  }
</script>

<div class="spacer" style="width: {width}{widthUnit}; height: {height}{heightUnit}"></div>