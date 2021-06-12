import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'

import CommonLayout from '@/layouts/CommonLayout'

Vue.config.productionTip = false

Vue.component('common-layout', CommonLayout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
