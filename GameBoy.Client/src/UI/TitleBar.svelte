<div class="title-bar">
  <slot />
</div>

<style lang="scss">
  .title-bar {
    display: flex;
    gap: 5px;

    > * {
      border-left: 1px solid #666;

      &:first-child {
        border-left: 0;
      }
    }
  }
</style>
