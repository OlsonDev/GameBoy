<script>
  import { isDraggingPanel, dropIntent, dropPanel, dropPanelPlacement, dockPanel } from 'Stores/DynamicPanels.js'
  import Icon from 'UI/Icon.svelte'
  import interact from 'interactjs'
  import UI from 'Services/UI.js'

  const iconProps = {
    width: 36,
    height: 36
  }

  let dockTopElem = null
  let dockLeftElem = null
  let dockRightElem = null
  let dockBottomElem = null

  let dockPanelTopElem = null
  let dockPanelLeftElem = null
  let dockPanelCenterElem = null
  let dockPanelRightElem = null
  let dockPanelBottomElem = null

  $: if (dockTopElem) makeDroppable('top', dockTopElem)
  $: if (dockLeftElem) makeDroppable('left', dockLeftElem)
  $: if (dockRightElem) makeDroppable('right', dockRightElem)
  $: if (dockBottomElem) makeDroppable('bottom', dockBottomElem)

  $: if (dockPanelTopElem) makeDroppable('top', dockPanelTopElem, true)
  $: if (dockPanelLeftElem) makeDroppable('left', dockPanelLeftElem, true)
  $: if (dockPanelCenterElem) makeDroppable('center', dockPanelCenterElem, true)
  $: if (dockPanelRightElem) makeDroppable('right', dockPanelRightElem, true)
  $: if (dockPanelBottomElem) makeDroppable('bottom', dockPanelBottomElem, true)

  function makeDroppable(target, elem, onDropPanel = false) {
    const intent = { target, onDropPanel }
    interact(elem).dropzone({
      ondragenter: function() {
        $dropIntent = intent;
      },
      ondragleave: function() {
        if ($dropIntent === intent) $dropIntent = null
      },
      ondrop: function(e) {
        dockPanel(e.draggable.panel, { target, toPanel: onDropPanel ? $dropPanel : null })
        $dropIntent = null
      }
    })
  }

  $: dropOnPanelStyle = $dropPanelPlacement == null ? null : UI.placementStyle(UI.newPlacement({
    top: $dropPanelPlacement.top + $dropPanelPlacement.height / 2,
    left: $dropPanelPlacement.left + $dropPanelPlacement.width / 2,
  }))
</script>

<div class="panel-drop-targets absolute w-full h-full" class:hidden={!$isDraggingPanel}>
  <div bind:this={dockTopElem} class="absolute panel-drop-target dock-top"><Icon name="mdi:dock-top" {...iconProps} /></div>
  <div bind:this={dockLeftElem} class="absolute panel-drop-target dock-left"><Icon name="mdi:dock-left" {...iconProps} /></div>
  <div bind:this={dockRightElem} class="absolute panel-drop-target dock-right"><Icon name="mdi:dock-right" {...iconProps} /></div>
  <div bind:this={dockBottomElem} class="absolute panel-drop-target dock-bottom"><Icon name="mdi:dock-bottom" {...iconProps} /></div>

  <div class="absolute flex flex-col items-center" class:hidden={!$dropPanelPlacement} style="transform: translate(-50%, -50%); {dropOnPanelStyle}">
    <div bind:this={dockPanelTopElem} class="panel-drop-target"><Icon name="mdi:dock-top" {...iconProps} /></div>
    <div class="flex">
      <div bind:this={dockPanelLeftElem} class="panel-drop-target"><Icon name="mdi:dock-left" {...iconProps} /></div>
      <div bind:this={dockPanelCenterElem} class="panel-drop-target"><Icon name="mdi:tab" {...iconProps} /></div>
      <div bind:this={dockPanelRightElem} class="panel-drop-target"><Icon name="mdi:dock-right" {...iconProps} /></div>
    </div>
    <div bind:this={dockPanelBottomElem} class="panel-drop-target"><Icon name="mdi:dock-bottom" {...iconProps} /></div>
  </div>
</div>

<style lang="scss">
  .panel-drop-target {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    border: 1px solid #F59E0B;
    background: #B45309;
    color: #F59E0B;

    &:hover {
      opacity: 1;
      border: 1px solid #22C55E;
      background: #166534;
      color: #22C55E;
    }

    &.dock-top {
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
    }

    &.dock-left {
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
    }

    &.dock-center {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.dock-right {
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }

    &.dock-bottom {
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
    }
  }
</style>