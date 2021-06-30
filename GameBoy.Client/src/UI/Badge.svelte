<script>
  import { size } from 'lodash';

  export let pink = false
  export let purple = false
  export let blue = false
  export let red = false
  export let black = false
  export let countable
  export let title
</script>

<div {title} class="badge" class:pink class:purple class:blue class:red class:black>{size(countable)}</div>

<style lang="scss">
  .badge {
    border-radius: 5px;
    color: #fff;
    display: inline;
    padding: 1px 5px 3px 5px;
    cursor: default;
    font-weight: normal;
    font-size: 12px;

    &.pink {
      background: #880e4f;
    }

    &.purple {
      background: #4a148c;
    }

    &.blue {
      background: #01579b;
    }

    &.red {
      background: #b71c1c;
    }

    &.black {
      background: #212121;
    }
  }
</style>
