import instance from './instance'

const work = {
  // 新增
  add (data) {
    return instance.post('/api/work/add', data)
  },
  // 编辑
  edit (id, data) {
    return instance.patch(`/api/work/:${id}/edit`, data)
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
  del (id) {
    return instance.delete(`/api/work/del/${id}`)
  }
}

export default work
