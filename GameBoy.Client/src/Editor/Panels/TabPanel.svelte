<script>
  import { clamp } from 'lodash'

  export let placement
  export let panels = []

  let activePanel = null
  let activePanelIndex = -1

  $: panels, setActivePanelIfNecessary()

  function setActivePanelIfNecessary() {
    const foundIndex = panels.indexOf(activePanel)
    if (foundIndex >= 0) {
      if (activePanelIndex !== foundIndex) activePanelIndex = foundIndex
      return
    }
    if (panels.length) {
      activePanelIndex = clamp(activePanelIndex - 1, 0, panels.length - 1)
      activePanel = panels[activePanelIndex]
      return
    }
    activePanelIndex = -1
    activePanel = null
  }
</script>

<div class="panel p-1 bg-gray-800 text-white border border-gray-900">
  <div class="tabs">
    {#each panels as panel}
      <svelte:component this={panel.panelComponent} {...panel.props} noBody/>
    {/each}
  </div>
  <div class="content">
    {#if activePanel}
      <svelte:component this={activePanel} {...activePanel.props} noHeader/>
    {/if}
  </div>
</div>
