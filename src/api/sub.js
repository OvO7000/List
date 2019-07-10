import instance from './instance'

const sub = {
  // 保存
  add (data) {
    return instance.post(`/api/sub/add`, data)
  },
  // 编辑
  edit (id, data) {
    return instance.patch(`/api/sub/edit/${id}`, data)
  },
  // 删除多个 sub
  del (ids) {
    return instance.post(`/api/sub/del`, ids)
  }
}

export default sub
