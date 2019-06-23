import instance from './instance'

const work = {
  // 获取类型和子类型
  save (data) {
    return instance.post(`/api/work/add`, data)
  }
}

export default work
