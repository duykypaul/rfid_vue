import { notification } from 'ant-design-vue'
import { login, getUserInfo } from '@/services'

export default {
  async login({ commit, dispatch }, paramsLogin) {
    try {
      const res = await login(paramsLogin)
      console.log('res: ', res)
      /*commit('SET_ACCESS_TOKEN', res?.result?.token)
      await dispatch('getUserInfo')*/
    } catch (e) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: JSON.stringify(e)
      })
      return Promise.reject(e)
    }
  },
  async getUserInfo({ commit, state }) {
    try {
      if (state.accessToken) {
        const res = await getUserInfo()
        const userInfo = res?.result
        commit('SET_USER_INFO', userInfo)
        return Promise.resolve(userInfo)
      } else {
        commit('SET_USER_INFO', null)
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
