<script>
  import Panel from 'UI/Panel.svelte'

  export let panel
</script>

<Panel {panel} class="empty-panel pointer-events-none" noHeader noBody />
