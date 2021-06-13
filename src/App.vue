<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default'
export default {
  name: 'App',
  computed: {
    layout: function() {
      let params = {
        username: 'admin',
        password: '890*()iop'
      }
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style lang="scss"></style>
