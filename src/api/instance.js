import axios from 'axios'
// import router from '@/router'
import store from '@/store'

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 60
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    const token = store.state.user.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error)
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  // 请求成功
  res => Promise.resolve(res.data),
  // 请求失败
  error => {
    const { response } = error
    if (response && response.status === 403) {
      store.dispatch('logOut')
    }
    return Promise.reject(response.data)
  }
)

export default instance
