<script>
  import { isDraggingPanel, dropIntent, dropPanelPlacement, buildDockPlacement } from 'Stores/DynamicPanels.js'
  import UI from 'Services/UI.js'

  $: dropHintPlacement = buildDropHintPlacement($isDraggingPanel, $dropIntent, $dropPanelPlacement)

  function buildDropHintPlacement(isDraggingPanel, intent, panelPlacement) {
    if (isDraggingPanel == null || intent == null) return null

    if (intent.onDropPanel) {
      if (panelPlacement == null) return null
      switch (intent.target) {
        case 'left': return UI.newPlacement({ ...panelPlacement, width: panelPlacement.width / 2 });
        case 'right': return UI.newPlacement({ ...panelPlacement, left: panelPlacement.left + panelPlacement.width / 2, width: panelPlacement.width / 2 });
        case 'center': return panelPlacement;
        case 'top': return UI.newPlacement({ ...panelPlacement, height: panelPlacement.height / 2 });
        case 'bottom': return UI.newPlacement({ ...panelPlacement, top: panelPlacement.top + panelPlacement.height / 2, height: panelPlacement.height / 2 });
      }
    }

    return buildDockPlacement(intent.target);
  }
</script>

<div class="absolute" style="background: #166534; opacity: 0.3; {UI.placementStyle(dropHintPlacement) ?? ''}" class:hidden={!dropHintPlacement}>
</div>