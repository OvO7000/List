<template>
  <div class="header">
    <div class="headContainer">
      <div class="icon">
        <font-awesome-icon :icon="status" class="status" />
      </div>
    </div>
    <div class="menu">
      <div class="menuContainer">
        <ul>
          <li v-for="item in list1" :key="item.id"><a href="#">{{item.name}}</a></li>
          <li><a href="#"></a></li>
          <li v-for="item in list2" :key="item.id"><a href="#">{{item.name}}</a></li>
          <li>
            <div class="search">
              <input type="text">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  },
  data: () => {
    return {
      list1: [
        {
          id: 'a1',
          name: '漫画'
        },
        {
          id: 'a2',
          name: '动画'
        }
      ],
      list2: [
        {
          id: 1,
          name: '漫画家'
        },
        {
          id: 2,
          name: '作家'
        }
      ]
    }
  },
  computed: {
    status: () => {
      return 'crow'
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~styles/variables.styl'

.header
  position: fixed
  top: 0
  left: 0
  right: 0
  background-color: $bgColor
  .headContainer
    position: relative
    margin: 0 auto
    width: 80%
    height:60px
    .icon
      position: absolute
      top: 15px
      right: 0
      width: 30px
      height: 30px
      text-align: center
      line-height: 30px
      vertical-align: middle
      cursor: pointer
      background: #fff
      .status
        font-size: 18px
        color: $mainColor
</style>
