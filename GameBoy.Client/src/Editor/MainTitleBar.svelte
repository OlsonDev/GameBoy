<script>
  import MainMenuButton from 'Editor/MainMenuButton.svelte'
  import PlayPauseButton from 'Editor/PlayPauseButton.svelte';
  import PropertyPanelToggleButton from 'Editor/PropertyPanelToggleButton.svelte'
  import TitleBar from 'UI/TitleBar.svelte'

  export let isPlaying
  export let isPropertyPanelVisible
</script>

<TitleBar>
  <MainMenuButton />
  <PlayPauseButton bind:isPlaying/>
  <PropertyPanelToggleButton bind:isVisible={isPropertyPanelVisible} />
</TitleBar>
