<script>
  import Panel from 'UI/Panel.svelte'
  import Button from 'UI/Button.svelte'

  export let panel
  export let panelProps = {}
  export let texture

  let bgStyle = 'none'

  const bgButtonStyle = 'width: 26px; height: 26px'
</script>

<Panel {panel} name="Texture" icon="mdi:wall" class="texture-panel" {...panelProps}>
  {texture.name}

  <div class="flex gap-1">
    <Button onClick={() => (bgStyle = 'none')} style={bgButtonStyle} class="border-2 {bgStyle === 'none' ? ' border-pink-800' : 'border-warmGray-500'}" title="No background"></Button>
    <Button onClick={() => (bgStyle = 'white')} style={bgButtonStyle} class="border-2 {bgStyle === 'white' ? ' border-pink-800' : 'border-warmGray-500'} bg-white" title="White background"></Button>
    <Button onClick={() => (bgStyle = 'checkerboard')} style={bgButtonStyle} class="border-2 {bgStyle === 'checkerboard' ? ' border-pink-800' : 'border-warmGray-500'}" title="Checkboard background"><img alt="Checkerboard background" src="/images/checkerboard.png"/></Button>
  </div>

</Panel>
