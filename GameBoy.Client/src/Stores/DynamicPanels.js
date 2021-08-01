import { get, writable } from 'svelte/store';
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

export const panelsElem = writable(null);
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
  const elem = get(panelsElem)
  const height = elem.offsetHeight
  const width = elem.offsetWidth

  switch (edge) {
    case 'top':
      panel.placement = UI.newPlacement({ left: 0, top: 0, right: 0, height: 0.2 * height })
      break;
    case 'left':
      panel.placement = UI.newPlacement({ left: 0, top: 0, bottom: 0, width: 0.2 * width })
      break;
    case 'right':
      panel.placement = UI.newPlacement({ right: 0, top: 0, bottom: 0, width: 0.2 * width })
      break;
    case 'bottom':
      panel.placement = UI.newPlacement({ left: 0, right: 0, bottom: 0, height: 0.2 * height })
      break;
  }
  panel.placement.translateX = 0
  panel.placement.translateY = 0
  panels.update(all => all)
  // TODO: Fix overlaps.
}

export function undockPanel(panel, panelElem) {
  UI.makeFloatingPlacement(panel.placement, panelElem)
  // TODO: Move other panels to occupy space
}

export function resizePanel(panel, { edges, rect, deltaRect }) {
  if (UI.isFloatingPlacement(panel.placement)) {
    if (edges.left) panel.placement.translateX += deltaRect.left
    if (edges.top) panel.placement.translateY += deltaRect.top
    panel.placement.width = rect.width
    panel.placement.height = rect.height
    return
  }
  if (edges.top && panel.placement.bottom === 0 || edges.bottom && panel.placement.top === 0) {
    panel.placement.height = rect.height
    return
  }
  if (edges.left && panel.placement.right === 0 || edges.right && panel.placement.left === 0) {
    panel.placement.width = rect.width
    return
  }
  // TODO: Resize panels sharing edge.
}