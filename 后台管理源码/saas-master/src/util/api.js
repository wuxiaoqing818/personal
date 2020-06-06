/**
 * axios请求文件封装
 */

import axios from 'axios'
import qs from 'qs'
import util from '../util/base'

axios.defaults.baseURL = ''
axios.defaults.timeout = 15000
axios.defaults.headers.crossDomain = true
axios.defaults.withCredentials = true
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

const api = axios.create()

// 添加请求拦截
api.interceptors.request.use(function (config) {
  config.paramsSerializer = function (params) {
    let param = params
    // param.timestamp = (new Date()).getTime()
    param = qs.stringify(param, {arrayFormat: 'repeat'})
    return param
  }
  const user = util.getSession('user')
  if (user) {
    config.headers.token = user.token
  }
  // config.headers.version = '1.0.1'
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error.message)
})
export default api
