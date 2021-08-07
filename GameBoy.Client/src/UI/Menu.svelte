<script>
  export let isOpen = false
  export let top = 0
  export let left = 0

  let wasOpen = isOpen

  $: updateWasOpen(isOpen)

  function updateWasOpen(nowOpen) {
    if (wasOpen === nowOpen) return
    wasOpen = nowOpen
    if (nowOpen) focusFirstItem()
  }

  let menuElem = null
  let lastMouseDownTarget = null

  function focusFirstItem() {
    menuElem?.querySelector('button')?.focus?.()
  }

  function trackLastMouseDownTarget(e) {
    if (!menuElem?.contains(e.target)) {
      isOpen = false
      return
    }
    lastMouseDownTarget = e.target
  }

  function clickListener(e) {
    if (!lastMouseDownTarget || !document.body.contains(lastMouseDownTarget)) return
    if (!clickedElement(menuElem)) {
      if (isOpen) isOpen = false
      return
    }
  }

  function clickedElement(elem) {
    return elem === lastMouseDownTarget || elem?.contains(lastMouseDownTarget)
  }
</script>

<svelte:body on:mousedown|capture={trackLastMouseDownTarget} on:click|capture={clickListener} />

{#if isOpen}
  <div bind:this={menuElem} class="menu absolute border border-gray-900 bg-gray-800 text-white select-none" style="top: {top}px; left: {left}px">
    <slot />
  </div>
{/if}

<style lang="postcss">
  .menu {
    min-width: 200px;
  }
</style>