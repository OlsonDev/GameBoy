import { get, writable } from 'svelte/store';
import UI from 'Services/UI.js';
import { noop } from 'lodash';

let panelId = 0
const types = {}
const singletons = {}
export function addPanelType(type, panelComponent, { placement = null, resize = null } = {}) {
  resize ??= noop

  types[type] = {
    type,
    panelComponent,
    resize
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
export const isResizingPanel = writable(null);
export const isDraggingPanel = writable(null);
export const dropPanel = writable(null);
export const dropIntent = writable(null);
export const dropPanelPlacement = writable(null);

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

export function openPanel(type, props, placement = null) {
  const panel = { props, id: panelId++, ...types[type] }
  panel.props.panel = panel
  panels.update(all => {
    const elem = get(panelsElem)
    // If not passed, make it floating in the center of the view, 1/4 the size of the view
    panel.placement = placement ?? UI.newPlacement({
      width: elem.offsetWidth * 0.50,
      height: elem.offsetHeight * 0.50,
      top: elem.offsetHeight * 0.25,
      left: elem.offsetWidth * 0.25,
    })

    all.push(panel)
    return all
  })
  return panel
}

export function moveToTop(panel, offset = 0) {
  panels.update(all => {
    const i = all.indexOf(panel)
    if (i >= 0) all.splice(i, 1)
    const spliceIndex = Math.max(0, all.length - offset)
    all.splice(spliceIndex, 0, panel)
    return all
  })
}

const edgeMetas = {
  top: {
    dockGrowth: 'height',
    dockZeros: ['top', 'left', 'right'],
  },
  bottom: {
    dockGrowth: 'height',
    dockZeros: ['bottom', 'left', 'right'],
  },
  left: {
    dockGrowth: 'width',
    dockZeros: ['left', 'top', 'bottom'],
  },
  right: {
    dockGrowth: 'width',
    dockZeros: ['right', 'top', 'bottom'],
  },
}

function getPanelsElemDimensions() {
  const elem = get(panelsElem)
  return {
    height: elem.offsetHeight,
    width: elem.offsetWidth,
  }
}

export function buildDockPlacement(edge) {
  const dimensions = getPanelsElemDimensions()
  const edgeMeta = edgeMetas[edge]
  const dimension = 0.2 * dimensions[edgeMeta.dockGrowth]
  const placement = {
    [edgeMeta.dockGrowth]: dimension,
    translateX: 0,
    translateY: 0,
  }
  for (const dockZero of edgeMeta.dockZeros) {
    placement[dockZero] = 0
  }

  return UI.newPlacement(placement)
}

function dockLeftRight(placement, left, right) {
  if (left.type !== 'row-panel' && right.type  === 'row-panel') {
    [left, right] = [right, left];
  }
  const rightIsRowPanel = right.type === 'row-panel'
  const reuseRowPanel = left.type === 'row-panel'
  const rowPanel = reuseRowPanel
    ? left
    : openPanel(
      'row-panel'
      , {  panels: rightIsRowPanel ? [left, ...right.props.panels] : [left, right] }
      , placement)

  if (reuseRowPanel) {
    rowPanel.placement = placement
    if (rightIsRowPanel) rowPanel.props.panels.push(...right.props.panels)
    else rowPanel.props.panels.push(right)
  }

  const dimensions = getPanelsElemDimensions()
  const { width, height } = UI.normalize(placement, dimensions)
  let totalChildPanelWidth = 0
  const panelToNormalizedPlacement = new Map()
  for (const p of rowPanel.props.panels) {
    p.parentPanel = rowPanel
    const n = UI.normalize(p.placement, dimensions)
    panelToNormalizedPlacement.set(p, n)
    totalChildPanelWidth += n.width
  }
  let leftoverWidth = width
  for (let i = 0; i < rowPanel.props.panels.length - 1; i++) {
    const p = rowPanel.props.panels[i]
    const n = panelToNormalizedPlacement.get(p)
    const newChildPanelWidth = width * n.width / totalChildPanelWidth
    leftoverWidth -= newChildPanelWidth
    p.placement = UI.newPlacement({ height, width: newChildPanelWidth })
  }
  rowPanel.props.panels[rowPanel.props.panels.length - 1].placement = UI.newPlacement({ height, width: leftoverWidth })

  const panelsToRemove = reuseRowPanel ? [right] : [left, right]
  panels.update(all => all.filter(p => !panelsToRemove.includes(p)))

}

function dockTopBottom(placement, top, bottom) {
  const p = placement
  const elem = get(panelsElem)
  const height = (p.height ?? elem.offsetHeight - (p.top ?? 0) - (p.bottom ?? 0)) / 2
  top.placement = UI.newPlacement({ ...placement, height, top: p.top, bottom: p.bottom == null ? null : p.bottom + height })
  bottom.placement = UI.newPlacement({ ...placement, height, bottom: p.bottom, top: p.top == null ? null : p.top + height })
  panels.update(all => all)
}

function toTabPanel(placement, panelToPutTabsFirst, panelToPutTabsSecond) {
  if (panelToPutTabsFirst.type !== 'tab-panel' && panelToPutTabsSecond.type  === 'tab-panel') {
    [panelToPutTabsFirst, panelToPutTabsSecond] = [panelToPutTabsSecond, panelToPutTabsFirst];
  }
  const secondIsTabPanel = panelToPutTabsSecond.type === 'tab-panel'
  const reuseTabPanel = panelToPutTabsFirst.type === 'tab-panel'
  const tabPanel = reuseTabPanel
    ? panelToPutTabsFirst
    : openPanel(
      'tab-panel'
      , {  panels: secondIsTabPanel ? [panelToPutTabsFirst, ...panelToPutTabsSecond.props.panels] : [panelToPutTabsFirst, panelToPutTabsSecond] }
      , placement)

  if (reuseTabPanel) {
    tabPanel.placement = placement
    if (secondIsTabPanel) tabPanel.props.panels.push(...panelToPutTabsSecond.props.panels)
    else tabPanel.props.panels.push(panelToPutTabsSecond)
  }
  const panelsToRemove = reuseTabPanel ? [panelToPutTabsSecond] : [panelToPutTabsFirst, panelToPutTabsSecond]
  panels.update(all => all.filter(p => !panelsToRemove.includes(p)))
}

export function dockPanel(panel, intent) {
  if (intent.toPanel) {
    const { placement } = intent.toPanel
    switch (intent.target) {
      case 'left': return dockLeftRight(placement, panel, intent.toPanel)
      case 'right': return dockLeftRight(placement, intent.toPanel, panel)
      case 'center': return toTabPanel(placement, intent.toPanel, panel)
      case 'top': return dockTopBottom(placement, panel, intent.toPanel)
      case 'bottom': return dockTopBottom(placement, panel, intent.toPanel)
    }

    return;
  }
  const edge = intent.target
  panel.placement = buildDockPlacement(edge)
  const edgeMeta = edgeMetas[edge]
  panels.update(all => {
    for (const p of all) {
      // TODO: Improve re-placement of other panels
      if (p === panel || UI.isFloatingPlacement(p.placement)) continue;
      if (edgeMeta.dockZeros.some(dockZero => p.placement[dockZero] !== 0)) continue
      p.placement[edge] = dimension
    }

    return all
  })
}

export function undockPanel(panel, panelElem) {
  UI.makeFloatingPlacement(panel.placement, panelElem)
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
}