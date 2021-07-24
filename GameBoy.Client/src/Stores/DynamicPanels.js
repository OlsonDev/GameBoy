import ContentPanel from 'Editor/Panels/ContentPanel.svelte'
import LayersPanel from 'Editor/Panels/LayersPanel.svelte'
import PropertiesPanel from 'Editor/Panels/PropertiesPanel.svelte'
import SceneGraphPanel from 'Editor/Panels/SceneGraphPanel.svelte'
import TextureEditorPanel from 'Editor/Panels/TextureEditorPanel.svelte'
import { writable } from 'svelte/store';

const types = {}
const singletons = {}
function addType(type, panelComponent, placement = null) {
  types[type] = {
    type,
    panelComponent,
  }

  const isSingleton = placement != null
  if (isSingleton) {
    singletons[type] = {
      type,
      panelComponent,
      props: {
        placement
      },
    }
  }
}

addType('content', ContentPanel, { bottom: 0, height: '30vh', left: '20vw', right: '20vw' })
addType('layers', LayersPanel, { right: 0, top: 0, bottom: 'calc(50vh - var(--title-bar-height) / 2)', width: '20vw' })
addType('properties', PropertiesPanel, { right: 0, top: 'calc(50vh - var(--title-bar-height) / 2)', bottom: 0, width: '20vw' })
addType('scene-graph', SceneGraphPanel, { left: 0, top: 0, bottom: 0, width: '20vw' })
addType('texture-editor', TextureEditorPanel)

export const panels = writable([]);

export function toggleSingleton(type, isOpen) {
  const singleton = singletons[type]
  panels.update(all => {
    if (!isOpen) return all.filter(p => p !== singleton)
    if (!all.some(p => p === singleton)) {
      all.push(singleton)
    }
    return all
  })
}

export function openPanel(type, props) {
  panels.update(all => {
    const panel = { props, ...types[type] }
    all.push(panel)
    return all
  })
}
