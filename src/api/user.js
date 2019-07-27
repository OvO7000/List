import instance from './instance'

const user = {
  // 登录
  login (data) {
    return instance.post('/api/user/login', data)
  }
}

export default user
