'use strict'
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { notification } from 'ant-design-vue'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const TYPE_TOKEN = 'Bearer'
let config = {
  baseURL: process.env.VUE_APP_API_BASE_URL || '',
  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = store.state.user.accessToken
    config.headers['Authorization'] = `${TYPE_TOKEN} ${token}`
    return config
  },
  error => {
    // Do something with request error
    notification.error({
      message: 'Có lỗi xảy ra'
    })
    return Promise.reject(error.response.data)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response.data
  },
  error => {
    // Do something with response error
    return Promise.reject(error.response.data)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        console.log(options)
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

const VueAxiosPlugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        $getInstance() {
          return _axios
        }
      }
    })
  }
}

// Vue.use(Plugin)

export default VueAxiosPlugin
