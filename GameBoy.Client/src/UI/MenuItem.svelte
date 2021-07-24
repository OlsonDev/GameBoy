<script>
  import Button from 'UI/Button.svelte'
  import Spacer from 'UI/Spacer.svelte'

  export let onClick = null
  export let onFocus = null
  export let onBlur = null
  export let onMouseEnter = null
  export let onMouseLeave = null

  export let icon = null
  export let title = null
  export let disabled = false
</script>

<Button
  class="menu-item px-1 py-0.5 w-full hover:bg-gray-600 disabled:text-gray-500 disabled:bg-none"
  {onClick}
  {onFocus}
  {onBlur}
  {onMouseEnter}
  {onMouseLeave}
  {icon}
  iconWidth={24}
  iconHeight={24}
  {title}
  {disabled}
>{#if icon == null}<Spacer width={24} height={24} />{/if}<slot/></Button>