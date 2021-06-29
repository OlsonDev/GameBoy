<script>
  import MainMenuButton from 'Editor/Buttons/MainMenuButton.svelte'
  import PlayPauseButton from 'Editor/Buttons/PlayPauseButton.svelte';
  import PropertiesPanelToggleButton from 'Editor/Buttons/PropertiesPanelToggleButton.svelte'
  import LayersPanelToggleButton from 'Editor/Buttons/LayersPanelToggleButton.svelte'
  import ContentPanelToggleButton from 'Editor/Buttons/ContentPanelToggleButton.svelte'
  import SceneGraphPanelToggleButton from 'Editor/Buttons/SceneGraphPanelToggleButton.svelte'
  import TitleBar from 'UI/TitleBar.svelte'
</script>

<TitleBar>
  <MainMenuButton />
  <PlayPauseButton />
  <PropertiesPanelToggleButton />
  <LayersPanelToggleButton />
  <ContentPanelToggleButton />
  <SceneGraphPanelToggleButton />
</TitleBar>
