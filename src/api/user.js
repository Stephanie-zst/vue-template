import http from './http'

export default {
  login(data) {
    return http({
      url: '',
      method: 'post',
      data
    })
  },

  getInfo(token) {
    return http({
      url: '',
      method: 'get',
      params: { token }
    })
  },

  logout() {
    return http({
      url: '',
      method: 'post'
    })
  },

}
