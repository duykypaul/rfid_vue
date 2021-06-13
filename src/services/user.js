import Vue from 'vue'
export const login = params => {
  console.log('Vue.$axios: ', this)
  return Vue.$axios.get().post('/auth', params)
}

export const getToken = async idToken => {
  return Vue.$axios.instance().post('/auth/get-token', { idToken })
}

export const getUserInfo = () => {
  return Vue.$axios.instance().get('/auth/me')
}
