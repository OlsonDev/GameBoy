<script>
  import Panel from 'UI/Panel.svelte'
  import Badge from 'UI/Badge.svelte'
  import { isOpen, isGlowing, layers } from 'Stores/LayersPanel.js'
  import { pluralize } from 'Services/Strings.js'
</script>

{#if $isOpen}
  <Panel name="Layers" icon="mdi:layers" isGlowing={$isGlowing} class="layers-panel">
    <ul class="m-0 p-0 list-none">
      {#each $layers as layer, i (i)}
        <li class="px-1 py-1 flex items-center hover:bg-gray-50 hover:text-gray-900 cursor-pointer">
          <span class="flex-grow">{layer.name}</span>
          <Badge title="{pluralize(layers.objects, 'object')} in this layer" countable={layer.objects} />
        </li>
      {/each}
    </ul>
    </Panel>
{/if}