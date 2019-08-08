import instance from './instance'

const sub = {
  // 列表
  index (query, subType) {
    const config = {
      params: {
        query: query,
        subType: subType
      }
    }
    return instance.get(`/api/sub/index`, config)
  },
  // 单个work
  // 传入id为sub的id
  single (id) {
    return instance.get(`/api/sub/single/${id}`)
  },
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
