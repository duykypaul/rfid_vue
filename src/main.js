import Vue from 'vue'
import axios from '@/plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'
// import Plugins from '@/plugins'

import CommonLayout from '@/layouts/CommonLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

Vue.config.productionTip = false

Vue.component('common-layout', CommonLayout)
Vue.component('default-layout', DefaultLayout)
// Vue.use(Plugins)
// Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
