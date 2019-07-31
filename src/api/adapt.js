import instance from './instance'

const adapt = {
  // 新增
  add (data) {
    return instance.post('/api/adapt/add', data)
  },
  // 编辑
  edit (id, data) {
    return instance.patch(`/api/adapt/edit/${id}`, data)
  },
  // 删除
  del (id) {
    return instance.delete(`/api/adapt/del/${id}`)
  }
}

export default adapt
