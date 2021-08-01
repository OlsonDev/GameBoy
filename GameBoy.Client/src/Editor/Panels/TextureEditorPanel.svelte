<script>
  import Panel from 'UI/Panel.svelte'

  export let panel
  export let noHeader = false
  export let noBody = false
  export let texture

</script>

<Panel {panel} name="Texture" icon="mdi:brick" class="texture-panel" {noHeader} {noBody}>
  {texture.name}
</Panel>
