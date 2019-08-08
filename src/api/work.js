import instance from './instance'

const work = {
  // 新增
  add (data) {
    return instance.post('/api/work/add', data)
  },
  // 编辑
  edit (id, data) {
    return instance.patch(`/api/work/edit/${id}`, data)
  },
  // 列表
  index (subType, count, rank) {
    const config = {
      params: {
        count: count,
        subType: subType,
        rank: rank
      }
    }
    return instance.get(`/api/work/index`, config)
  },
  // 单个
  // 传入id为work的id
  single (id) {
    return instance.get(`/api/work/single/${id}`)
  },
  // 删除
  del (id) {
    return instance.delete(`/api/work/del/${id}`)
  }
}

export default work
