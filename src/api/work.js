import instance from './instance'

const work = {
  // 新增
  add (data) {
    return instance.post('/api/work/add', data)
  },
  // 编辑
  edit (id, data) {
    return instance.post(`/api/work/:${id}/edit`, data)
  },
  // 列表
  index (subType, count) {
    const config = {
      params: {
        count: count,
        subType: subType
      }
    }
    return instance.get(`/api/work/index`, config)
  },
  // 删除
  del (data) {
    return instance.post(`/api/work/edit`, data)
  }
}

export default work
