<script>
  import Panel from 'UI/Panel.svelte'

  export let placement
  export let noHeader = false
  export let noBody = false
  export let texture

</script>

<Panel name="Texture" icon="mdi:brick" class="texture-panel" {placement} {noHeader} {noBody}>
  {texture.name}
</Panel>
