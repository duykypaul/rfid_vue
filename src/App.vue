<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = 'no'
export default {
  name: 'App',
  computed: {
    layout: function() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style lang="scss"></style>
