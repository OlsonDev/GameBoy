import { writable } from 'svelte/store';
import UI from 'Services/UI.js';

let panelId = 0
const types = {}
const singletons = {}
export function addType(type, panelComponent, placement = null) {
  types[type] = {
    type,
    panelComponent,
  }

  const isSingleton = placement != null
  if (isSingleton) {
    singletons[type] = {
      type,
      id: panelId++,
      panelComponent,
      placement: UI.newPlacement(placement),
      props: {},
    }
  }
}

export const panels = writable([]);
export const isDraggingPanel = writable(null);

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
    const panel = { props, id: panelId++, ...types[type] }
    all.push(panel)
    return all
  })
}

export function moveToTop(panel) {
  panels.update(all => {
    const i = all.indexOf(panel)
    all.splice(i, 1)
    all.push(panel)
    return all
  })
}

export function dockPanel(panel, edge) {
  switch (edge) {
    case 'top':
      panel.placement = UI.newPlacement({ left: 0, top: 0, right: 0, height: '20vh' })
      break;
    case 'left':
      panel.placement = UI.newPlacement({ left: 0, top: 0, bottom: 0, width: '20vw' })
      break;
    case 'right':
      panel.placement = UI.newPlacement({ right: 0, top: 0, bottom: 0, width: '20vw' })
      break;
    case 'bottom':
      panel.placement = UI.newPlacement({ left: 0, right: 0, bottom: 0, height: '20vh' })
      break;
  }
  panel.placement.transformX = 0
  panel.placement.transformY = 0
  panels.update(all => all)
}

export function resizePanel(panel, { edges, rect, deltaRect }) {
  if (UI.isFloatingPlacement(panel.placement)) {
    if (edges.left) panel.placement.transformX += deltaRect.left
    if (edges.top) panel.placement.transformY += deltaRect.top
    panel.placement.width = `${rect.width}px`
    panel.placement.height = `${rect.height}px`
    return
  }
  if (edges.top && panel.placement.bottom === 0 || edges.bottom && panel.placement.top === 0) {
    panel.placement.height = `${rect.height}px`
    return
  }
  if (edges.left && panel.placement.right === 0 || edges.right && panel.placement.left === 0) {
    panel.placement.width = `${rect.width}px`
    return
  }
}