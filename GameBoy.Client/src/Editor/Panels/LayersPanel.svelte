<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import { isOpen, isGlowing, layers } from 'Stores/LayersPanel.js'
  import { size } from 'lodash'
  import { pluralize } from 'Services/Strings.js'
</script>

{#if $isOpen}
  <Panel name="Layers" icon="mdi:layers" isGlowing={$isGlowing} class="layers-panel">
    <ul class="simple-list">
      {#each $layers as layer, i (i)}
        <li>
          {layer.name}
          <Badge pink title="{pluralize(layers.objects, 'object')} in this layer" countable={layer.objects} />
        </li>
      {/each}
    </ul>
    </Panel>
{/if}

<style lang="scss">
</style>
