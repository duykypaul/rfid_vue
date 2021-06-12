<template>
  <div class="common-layout">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonLayout',
  components: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: $layout-body-background;
  background-image: url('~@/assets/images/common-layout.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;

  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
  }
}
</style>
