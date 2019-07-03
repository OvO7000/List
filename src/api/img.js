import instance from './instance'

const img = {
  // 新增
  add (data) {
    return instance.post(`/api/img/add`, data)
  }
}

export default img
