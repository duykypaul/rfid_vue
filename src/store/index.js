import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './user'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  }
})
