import Vue from 'vue'
import axios from '@/plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'
// import Plugins from '@/plugins'

import GuessLayout from '@/layouts/GuessLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import NoLayout from '@/layouts/NoLayout'

Vue.config.productionTip = false

Vue.component('guess-layout', GuessLayout)
Vue.component('default-layout', DefaultLayout)
Vue.component('no-layout', NoLayout)
// Vue.use(Plugins)
// Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
