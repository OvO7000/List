<template>
  <div class="header">
    <div class="headContainer"  @click="toogleMenu">
      <div class="icon" @click.stop="prompt">
        <font-awesome-icon :icon="status" class="status" />
      </div>
    </div>
    <transition-slide>
      <div class="menu" v-show="showMenu">
        <div class="menuContainer">
          <ul>
            <router-link
              tag="li"
              :to="'/' + route.type + '/' + item.id"
              v-for="item in subType[route.type]"
              :key="item.id"
              class="menuItem"
            ><span>{{item.name}}</span></router-link>
            <li  class="space"></li>
            <router-link
              tag="li"
              :to="'/' + excludeType + '/' + item.id"
              v-for="item in subType[excludeType]"
              :key="item.id"
              class="menuItem"
            ><span>{{item.name}}</span></router-link>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  data: () => {
    return {
      showMenu: false,
      showInput: false
    }
  },
  computed: {
    ...mapState({
      route: 'route',
      type: 'type',
      subType: 'subType'
    }),
    status () {
      return 'crow'
    },
    excludeType () {
      let excludeType = ''
      this.type.forEach(item => {
        if (item !== this.route.type) {
          excludeType = item
        }
      })
      return excludeType
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
    },
    ...mapActions({
    })
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
      .router-link-active
        background: $mainColor
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
