export default {
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token
    if (token) {
      sessionStorage.setItem('ACCESS_TOKEN', token)
    } else {
      sessionStorage.removeItem('ACCESS_TOKEN')
    }
  }
}
