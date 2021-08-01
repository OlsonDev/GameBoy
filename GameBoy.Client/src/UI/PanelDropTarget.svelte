<script>
  import { isDraggingPanel, dockPanel } from 'Stores/DynamicPanels.js'
  import Icon from 'UI/Icon.svelte'
  import interact from 'interactjs'

  const iconProps = {
    width: 36,
    height: 36
  }

  let dockTopElem = null
  let dockLeftElem = null
  let dockRightElem = null
  let dockBottomElem = null

  $: if (dockTopElem) makeDroppable('top', dockTopElem)
  $: if (dockLeftElem) makeDroppable('left', dockLeftElem)
  $: if (dockRightElem) makeDroppable('right', dockRightElem)
  $: if (dockBottomElem) makeDroppable('bottom', dockBottomElem)

  function makeDroppable(edge, elem) {
    interact(elem).dropzone({
      ondrop: function(e) {
        dockPanel(e.draggable.panel, edge)
      }
    })
  }
</script>

<div class="panel-drop-targets absolute w-full h-full" class:hidden={!$isDraggingPanel}>
  <div bind:this={dockTopElem} class="panel-drop-target dock-top"><Icon name="mdi:dock-top" {...iconProps} /></div>
  <div bind:this={dockLeftElem} class="panel-drop-target dock-left"><Icon name="mdi:dock-left" {...iconProps} /></div>
  <div bind:this={dockRightElem} class="panel-drop-target dock-right"><Icon name="mdi:dock-right" {...iconProps} /></div>
  <div bind:this={dockBottomElem} class="panel-drop-target dock-bottom"><Icon name="mdi:dock-bottom" {...iconProps} /></div>
</div>

<style lang="scss">
  .panel-drop-target {
    width: 42px;
    height: 42px;
    border: 1px solid #fff;
    background: rgba(0, 0, 128, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: absolute;

    &:hover {
      background: rgba(0, 0, 224, 1);
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