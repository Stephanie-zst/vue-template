import axios from 'axios'
import store from '@/store'
import { Modal, Message } from 'element-ui'

// create an axios instance
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  // withCredentials: true,
  timeout: 60000 // 请求超时时间
})

// request interceptor
http.interceptors.request.use(
  config => {
    const { url } = config
    const isIgnoreUrl = url.startsWith('http')
    if (!isIgnoreUrl) {
      console.log('process.env.VUE_APP_API_BASE_URL => :', process.env.VUE_APP_API_BASE_URL)
      config.baseURL = process.env.VUE_APP_API_BASE_URL
    }
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
    }
    // return config
  },
  error => {
    console.log('interceptors.request error: >> ', error)
    return Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    const { code, errMsg } = response.data
    if (code === 20000) {
      return response.data
    } else if (code === 40003) {
      Modal.warning({
        title: '重新登录',
        content: '登录态失效，请重新登录',
        closable: false,
        keyboard: false,
        maskClosable: false,
        okText: '确定',
        onOk: () => {
          store.dispatch('Logout').then(() => {
            window.location.reload()
          })
        }
      })
    } else {
      Message({
        type: 'error',
        message: `${code}: ${errMsg}\n${JSON.stringify(data)}`,
        duration: 5 * 1000
      })
      return Promise.reject(response)
    }
  },
  error => {
    /* 取消多余请求 */
    if (axios.isCancel(error)) {
      throw new axios.Cancel('cancel request')
    }
    const { code, message, response } = error
    if (message.indexOf('timeout') !== -1) {
      Message({
        type: 'error',
        message: 'timeout > 60s 请求超时',
        duration: 5 * 1000
      })
    }
    if (code || message || response) {
      Message({
        type: 'error',
        message: `${code}: ${message}\n${JSON.stringify(response)}`,
        duration: 5 * 1000
      })
    } else {
      Message({
        type: 'error',
        message: `${JSON.stringify(error)}`,
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default http
