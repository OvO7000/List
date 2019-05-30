<template>
  <div class="header">
    <div class="headContainer"  @click="toogleMenu">
      <div class="icon" @click.stop="prompt">
        <font-awesome-icon :icon="status" class="status" ref="status" />
      </div>
    </div>
    <transition-slide>
      <div class="menu" v-show="showMenu">
        <div class="menuContainer">
          <ul>
            <li v-for="item in list1" :key="item.id" class="menuItem"><a href="#">{{item.name}}</a></li>
            <li  class="space"></li>
            <li v-for="item in list2" :key="item.id" class="menuItem"><a href="#">{{item.name}}</a></li>
            <li class="search">
              <input type="text">
            </li>
          </ul>
        </div>
      </div>
    </transition-slide>
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
      showMenu: false,
      showInput: false,
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
  },
  methods: {
    toogleMenu: function () {
      this.showMenu = !this.showMenu
    },
    prompt: function () {
      this.$refs.status.style.fontSize = '22px'
      setTimeout(() => {
        this.$refs.status.style.fontSize = '18px'
      }, 100)
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
      cursor: pointer
      .status
        vertical-align: middle
        font-size: 18px
  .menu
    /*overflow: hidden*/
    background: $menuBgColor
    .menuContainer
      width: 100%
      .menuItem
        padding-left: 10%
        height: 40px
        line-height: 40px
        &:hover
          background: $bgColor
        a
          font-size: 14px
    .space
      width: 100%
      height: 40px
    .search
      padding-left: 10%
      height: 40px
      line-height: 40px
      input
        height: 20px
        font-size: 14px
        color: $fontColor
        border-bottom: 1px solid $fontColor
        background: $menuBgColor
</style>
