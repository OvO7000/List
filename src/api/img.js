import instance from './instance'

const img = {
  // 新增
  add (data) {
    return instance.post(`/api/img/add`, data)
  },
  // 删除
  del (id) {
    return instance.delete(`/api/img//del/${id}`)
  }
}

export default img
