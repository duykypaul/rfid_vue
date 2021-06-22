import { notification } from 'ant-design-vue'
import { getUserInfo, login } from '@/services'

export default {
  async login({ commit, dispatch }, paramsLogin) {
    try {
      const res = await login(paramsLogin)
      console.log('res: ', res)
      if (res.status === 200) {
        commit('SET_ACCESS_TOKEN', res?.token)
        dispatch('getUserInfo')
      } else {
        notification.error({
          message: res.message
        })
        return Promise.reject(null)
      }
    } catch (e) {
      notification.error({
        message: 'An error occurred',
        description: JSON.stringify(e)
      })
      return Promise.reject(e)
    }
  },
  async getUserInfo({ commit, state }) {
    try {
      if (state.accessToken) {
        const userInfo = await getUserInfo()
        commit('SET_USER_INFO', userInfo)
        return Promise.resolve(userInfo)
      } else {
        commit('SET_USER_INFO', null)
        return Promise.resolve(null)
      }
    } catch (err) {
      return Promise.resolve(null)
    }
  },
  logout({ commit }) {
    commit('SET_ACCESS_TOKEN', null)
  },
  setAccessToken: ({ commit }, token) => {
    commit('SET_ACCESS_TOKEN', token)
  }
}
