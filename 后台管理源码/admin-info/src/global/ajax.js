import axios from 'axios'
import store from '../store/index'
/* const dev = process.env.NODE_ENV !== 'production'
const uri = window.location.protocol + window.location.host

// 环境的切换
axios.defaults.baseURL = dev ? '/api' : uri */

// 请求超时时间
axios.defaults.timeout = 50000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.token
    token && (config.headers.token = token)
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 0) {
        if (typeof window.vm.$unToast === 'function') window.vm.$unToast()
        window.vm.$toast(response.data.msg, { type: 'warn' })
      } else if (response.data.code === 2) {
        if (typeof window.vm.$unToast === 'function') window.vm.$unToast()
        window.localStorage.clear()
        setTimeout(() => { window.vm.$toast('令牌已失效，请重新登陆', { type: 'warn', time: 2000 }) }, 500)
        window.vm.$router.push('/login')
      }
      return Promise.resolve(response.data)
    } else {
      window.vm.$toast('服务异常', { type: 'warn' })
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      if (typeof window.vm.$unToast === 'function') window.vm.$unToast()
      window.vm.$toast(error.response.data, { type: 'warn' })
      return Promise.reject(error.response)
    }
  }
)

axios.install = function (Vue, options) {
  Vue.prototype.$axios = axios
  Vue.$axios = axios
}
export default axios
