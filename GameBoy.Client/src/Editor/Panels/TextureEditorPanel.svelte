<script>
  import Panel from 'UI/Panel.svelte'

  export let texture
</script>

<Panel name="Texture" icon="mdi:brick" class="texture-panel">
  {texture.name}
</Panel>