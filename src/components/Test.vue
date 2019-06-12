<template>
    <div id="test">
      <input type="submit" value="submit" @click="showDiv">
      <transition-group name="slide" tag="div">
          <div class="c c1" key="1"></div>
          <div class="c c2" v-show="show" key="2"></div>
      </transition-group>
    </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDiv () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="stylus" scoped>
  *
    will-change: max-height
    transform: translateZ(0)
    backface-visibility: hidden
    perspective: 1000px
  .slide-enter-active,
  .slide-leave-active
    transition: max-height 1s linear
    max-height: 50px
  .slide-enter,
  .slide-leave-to
    max-height: 0
  #test
    .c
      width: 200px
      height: 200px
      background-color: #fff
</style>
