<script>
  import Panel from 'UI/Panel.svelte'
  import UI from 'Services/UI.js'

  export let panel // This container panel itself
  export let panels = [] // The panels in this container

  let panelElem

  const resizableListeners = {
    onstart: resizeContainerStartListener,
    onmove: resizeContainerMoveListener,
    onend: resizeContainerEndListener,
  }

  function buildPanelProps(i) {
    return {
      isPositioned: true,
      resizableEdgeOverrides: {
        top: false,
        bottom: false,
        left: i !== 0,
        right: i !== panels.length - 1,
      },
      draggableListeners: {
        onstart: dragChildStartListener,
      },
      resizableListeners: {
        onstart: resizeChildStartListener,
        onmove: resizeChildMoveListener,
        onend: resizeChildEndListener,
      }
    }
  }

  function getPanelsTotalWidth() {
    let totalWidth = 0
    for (const p of panels) {
      totalWidth += p.placement.width;
    }
    return totalWidth
  }

  function buildRelativeSizeMap(totalWidth = null) {
    totalWidth ??= getPanelsTotalWidth();
    const map = new Map()
    for (const p of panels) {
      map.set(p, p.placement.width / totalWidth)
    }
    return map
  }

  function resizePanelsToNewTotalSize(relativeSizeMap, height, newTotalWidth) {
    let leftoverWidth = newTotalWidth;
    for (let i = 0; i < panels.length - 1; i++) {
      const p = panels[i];
      const newPanelWidth = newTotalWidth * relativeSizeMap.get(p);
      leftoverWidth -= newPanelWidth;
      p.placement = UI.newPlacement({ height, width: newPanelWidth });
    }
    panels[panels.length - 1].placement = UI.newPlacement({ height, width: leftoverWidth });
  }

  let relativeSizeCache = null
  function resizeContainerStartListener() {
    relativeSizeCache = buildRelativeSizeMap()
  }

  function resizeContainerMoveListener(e) {
    resizePanelsToNewTotalSize(relativeSizeCache, e.rect.height, e.rect.width)
  }

  function resizeContainerEndListener() {
    relativeSizeCache = null
  }

  let combinedWidthBetweenSharedEdgePanels = null
  let sharedEdgePanel = null
  function resizeChildStartListener(e) {
    const child = e.interactable.panel
    const indexOffset = e.edges.left ? -1 : 1;
    const panelIndex = panels.indexOf(child) + indexOffset;
    sharedEdgePanel = panels[panelIndex];
    combinedWidthBetweenSharedEdgePanels = sharedEdgePanel.placement.width + child.placement.width;
  }

  function resizeChildMoveListener(e) {
    const child = e.interactable.panel
    child.placement = UI.newPlacement({ height: e.rect.height, width: e.rect.width })
    sharedEdgePanel.placement = UI.newPlacement({ height: e.rect.height, width: combinedWidthBetweenSharedEdgePanels - e.rect.width })
    panels = panels
  }

  function resizeChildEndListener() {
    combinedWidthBetweenSharedEdgePanels = null
    sharedEdgePanel = null
  }

  function dragChildStartListener(e) {
    const child = e.interactable.panel
    const { placement } = child
    let childLeft = 0;
    for (const p of panels) {
      if (p === child) break;
      childLeft += p.placement.width;
    }

    const totalWidth = getPanelsTotalWidth();
    const widthWithoutPanel = totalWidth - placement.width;
    const relativeSizeMap = buildRelativeSizeMap(widthWithoutPanel);
    child.placement = UI.newPlacement({ ...panel.placement, left: (panel.placement.left ?? 0) + childLeft, width: child.placement.width, height: child.placement.height });
    child.parentPanel = null;
    // We need to directly modify the array, otherwise panel.props.panels will just override our work.
    const i = panels.indexOf(child);
    panels.splice(i, 1);
    panels = panels;
    resizePanelsToNewTotalSize(relativeSizeMap, placement.height, totalWidth);
    return false
    // TODO: If only one child left in row panel, convert it to just the panel... and add it to this RowPanel's parent.
  }
</script>

<Panel bind:panelElem {panel} class="row-panel flex flex-row absolute" isContainer isDraggable={false} {resizableListeners}>
  {#each panels as panel, i (panel.id)}
    <svelte:component this={panel.panelComponent} {...panel.props} {panel} panelProps={buildPanelProps(i)} />
  {/each}
</Panel>
