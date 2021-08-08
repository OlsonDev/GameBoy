<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import { isOpen, isGlowing, scene } from 'Stores/SceneGraphPanel.js'
  import { pluralize } from 'Services/Strings.js'

  export let panel
  export let panelProps = {}
</script>

{#if $isOpen}
  <Panel {panel} name="Scene graph" icon="mdi:graph" isGlowing={$isGlowing} class="scene-graph-panel" {...panelProps}>
    <div slot="header">
      <Badge countable={$scene} title="{pluralize($scene, 'object')} in scene" />
    </div>

    {#each $scene as object, i (i)}
      {object.name}
    {/each}
  </Panel>
{/if}
