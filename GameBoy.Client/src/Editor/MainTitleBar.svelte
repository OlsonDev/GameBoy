<script>
  import MainMenuButton from 'Editor/MainMenuButton.svelte'
  import PlayPauseButton from 'Editor/PlayPauseButton.svelte';
  import PropertiesPanelToggleButton from 'Editor/PropertiesPanelToggleButton.svelte'
  import LayersPanelToggleButton from 'Editor/LayersPanelToggleButton.svelte'
  import ContentPanelToggleButton from 'Editor/ContentPanelToggleButton.svelte'
  import SceneGraphPanelToggleButton from 'Editor/SceneGraphPanelToggleButton.svelte'
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
