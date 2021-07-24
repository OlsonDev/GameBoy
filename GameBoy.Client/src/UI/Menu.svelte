<script>
  export let isOpen = false

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
    lastMouseDownTarget = e.target
  }

  function clickListener() {
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
  <div bind:this={menuElem} class="menu absolute border border-gray-900 bg-gray-800 text-white select-none">
    <slot />
  </div>
{/if}

<style lang="postcss">
  .menu {
    min-width: 200px;
  }
</style>