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
}

export default adapt
