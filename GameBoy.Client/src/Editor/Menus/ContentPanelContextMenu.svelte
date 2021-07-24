<script>
  import Menu from 'UI/Menu.svelte'
  import MenuItem from 'UI/MenuItem.svelte'
  import MenuSection from 'UI/MenuSection.svelte'
  import { content, active } from 'Stores/ContentPanel.js'
  import { openPanel } from 'Stores/DynamicPanels.js'
  import { selectedObject } from 'Stores/Editor.js'

  export let isOpen = false

  function newTexture() {
    isOpen = false

    const texture = { type: 'texture', name: 'New texture', width: 64, height: 64, data: [] }
    $content.push(texture)
    $content = $content
    $active = texture

    openPanel('texture-editor', { texture })

    $selectedObject = texture
  }
</script>

<Menu bind:isOpen>
  <MenuSection icon="mdi:plus-box-outline" name="New…">
    <MenuItem icon="mdi:wall" onClick={newTexture}>Texture</MenuItem>
    <MenuItem icon="mdi:animation" disabled>Animation</MenuItem>
    <MenuItem icon="mdi:shape" disabled>Object</MenuItem>
  </MenuSection>

  <MenuSection icon="mdi:sort-alphabetical-variant" name="Sort by…">
    <MenuItem disabled>Type</MenuItem>
    <MenuItem disabled>Name</MenuItem>
    <MenuItem disabled>Date modified</MenuItem>
    <MenuItem disabled>Date created</MenuItem>
  </MenuSection>
</Menu>