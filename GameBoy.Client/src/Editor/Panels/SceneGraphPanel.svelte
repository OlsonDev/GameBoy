<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import { isOpen, isGlowing, scene } from 'Stores/SceneGraphPanel.js'
  import { pluralize } from 'Services/Strings.js'

</script>

{#if $isOpen}
  <Panel name="Scene graph" icon="mdi:graph" isGlowing={$isGlowing} class="scene-graph-panel">
    <div slot="header" class="flex-center">
      <Badge pink countable={$scene} title="{pluralize($scene, 'object')} in scene" />
    </div>

    {#each $scene as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}
