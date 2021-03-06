import instance from './instance'

const figure = {
  // 新增
  add (data) {
    return instance.post('/api/figure/add', data)
  },
  // 编辑
  edit (id, data) {
    return instance.patch(`/api/figure/edit/${id}`, data)
  },
  // 列表
  index (subType, count) {
    const config = {
      params: {
        count: count,
        subType: subType
      }
    }
    return instance.get(`/api/figure/index`, config)
  },
  // 单个figure
  single (id) {
    return instance.get(`/api/figure/single/${id}`)
  },
  // 通过query获取列表
  query (query, subType) {
    const config = {
      params: {
        query: query,
        subType: subType
      }
    }
    return instance.get(`/api/figure/query`, config)
  },
  // 删除
  del (id) {
    return instance.delete(`/api/figure/del/${id}`)
  }
}

export default figure
