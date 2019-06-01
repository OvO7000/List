import instance from './instance'

const type = {
  // 获取类型和子类型
  getType () {
    return instance.get(`/type`)
  }
}

export default type
