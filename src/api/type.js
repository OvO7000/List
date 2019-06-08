import instance from './instance'

const type = {
  // 获取类型和子类型
  getType () {
    return instance.get(`/api/type/index`)
  }
}

export default type
