<script>
  import { isDraggingPanel, dropPanel, dropPanelPlacement, panelsElem, panels, moveToTop } from 'Stores/DynamicPanels.js'
  import UI from 'Services/UI.js'

  let cache = null
  $: if ($isDraggingPanel === null) cache = null

  function onMouseMove(e) {
    if (!$isDraggingPanel) return
    cache ??= new Map()

    const container = {
      top: $panelsElem.offsetTop,
      left: $panelsElem.offsetLeft,
      width: $panelsElem.offsetWidth,
      height: $panelsElem.offsetHeight,
    };

    // Mouse is at (clientX, clientY)
    // We want the first panel we're on top of that we're not dragging
    // Loop panels in reverse because that's Z-index order
    for (let i = $panels.length - 1; i >= 0; i--) {
      const panel = $panels[i];
      if (panel === $isDraggingPanel) continue
      // TODO: Cache these values and recompute them when panels are dragged and the window resized.
      let { n, placement } = cache.get(panel) ?? {}
      if (!n) {
        n = UI.normalize(panel.placement, container)
        placement = UI.newPlacement(n)
        placement.left -= container.left
        placement.top -= container.top
        cache.set(panel, { n, placement })
      }
      if (
            n.left <= e.clientX
        && (n.left + n.width) >= e.clientX
        && n.top <= e.clientY
        && (n.top + n.height) >= e.clientY
      ) {
        $dropPanelPlacement = placement
        $dropPanel = panel
        moveToTop(panel, 1)
        return
      }
      $dropPanelPlacement = null
      $dropPanel = null
    }
  }
</script>
<svelte:body on:mousemove={onMouseMove} />