import axios from '@/plugins/axios'
export const login = params => {
  return axios.post('/auth', params)
}

export const getToken = async idToken => {
  return axios.post('/auth/get-token', { idToken })
}

export const getUserInfo = () => {
  return axios.get('/auth/me')
}
