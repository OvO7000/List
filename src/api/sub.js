import instance from './instance'

const sub = {
  // 保存
  save (data) {
    return instance.post(`/api/sub/add`, data)
  },
  // 编辑
  edit (data) {
    return instance.post(`/api/sub/edit`, data)
  },
}

export default sub
