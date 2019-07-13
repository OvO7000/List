import instance from './instance'

const img = {
  // 新增
  adds (formData) {
    return instance.post(`/api/img/adds`, formData)
  },
  // 删除
  del (id) {
    return instance.delete(`/api/img/del/${id}`)
  },
  // 编辑
  edit (id, formData) {
    return instance.patch(`/api/img/edit/${id}`, formData)
  },
  // 新增
  add (formData) {
    return instance.post(`/api/img/add`, formData)
  }
}

export default img
