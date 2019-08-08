import instance from './instance'

const adapt = {
  // 通过query获取列表
  query (query) {
    const config = {
      params: {
        query: query
      }
    }
    return instance.get(`/api/adapt/query`, config)
  },
  // 检查adapt是否重名
  exist (name) {
    const config = {
      params: {
        name: name
      }
    }
    return instance.get(`/api/adapt/exist`, config)
  }
}

export default adapt
