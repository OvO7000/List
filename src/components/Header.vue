<template>
  <div class="header">
    <div class="headContainer"  @click="toogleMenu">
      <!--<div class="icon" @click.stop="prompt">-->
        <!--<i class="status fa fa-bug" ref="status"></i>-->
      <!--</div>-->
      <User></User>
    </div>
    <transition-slide>
      <div class="menu" v-show="showMenu">
        <div class="menuContainer">
          <ul>
            <router-link
              tag="li"
              :to="'/' + type + '/' + item.name_en"
              v-for="item in subType[type]"
              :key="item.id"
              class="menuItem"
              @click.native="toogleMenu"
            ><span>{{item.name}}</span></router-link>
            <li  class="space"></li>
            <router-link
              tag="li"
              :to="'/' + excludeType + '/' + item.name_en"
              v-for="item in subType[excludeType]"
              :key="item.id"
              class="menuItem"
              @click.native="toogleMenu"
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
import TransitionSlide from 'components/Slide'
import User from 'components/User'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data: () => {
    return {
      showMenu: false,
      showInput: false
    }
  },
  computed: {
    ...mapState({
      subType: 'subType'
    }),
    status () {
      return 'crow'
    },
    type () {
      return this.$route.path.split('/')[1]
    },
    excludeType () {
      let excludeType = ''
      if (Object.keys(this.subType).length) {
        Object.keys(this.subType).forEach(item => {
          if (item !== this.type) {
            excludeType = item
          }
        })
      }
      return excludeType
    }
  },
  methods: {
    toogleMenu: function () {
      this.showMenu = !this.showMenu
    }
    // prompt: function () {
    //   this.$refs.status.style.fontSize = '22px'
    //   setTimeout(() => {
    //     this.$refs.status.style.fontSize = '18px'
    //   }, 100)
    // }
  },
  components: {
    TransitionSlide,
    User
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
  z-index: 1000
  .headContainer
    position: relative
    margin: 0 auto
    width: 80%
    height:60px
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
