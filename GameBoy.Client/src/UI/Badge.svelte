<script>
  import { size } from 'lodash';

  export let color = 'bg-pink-800'
  export let countable
  export let title
</script>

<div {title} class="badge text-white text-xs font-normal inline rounded {color}">{size(countable)}</div>

<style lang="scss">
  .badge {
    padding: 1px 5px 3px 5px;
  }
</style>
