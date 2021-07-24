import ContentPanel from 'Editor/Panels/ContentPanel.svelte'
import LayersPanel from 'Editor/Panels/LayersPanel.svelte'
import PropertiesPanel from 'Editor/Panels/PropertiesPanel.svelte'
import SceneGraphPanel from 'Editor/Panels/SceneGraphPanel.svelte'
import TextureEditorPanel from 'Editor/Panels/TextureEditorPanel.svelte'
import { writable } from 'svelte/store';

const types = {}
const singletons = {}
function addType(type, panelComponent, isSingleton = true) {
  types[type] = {
    type,
    panelComponent,
  }

  if (isSingleton) {
    singletons[type] = {
      type,
      panelComponent,
      props: {},
    }
  }
}

addType('content', ContentPanel)
addType('layers', LayersPanel)
addType('properties', PropertiesPanel)
addType('scene-graph', SceneGraphPanel)
addType('texture-editor', TextureEditorPanel, false)

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