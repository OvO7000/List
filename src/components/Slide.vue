<template>
  <transition
    name="transition-slide"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'TransitionSlide',
  methods: {
    enter (element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      // 触发重绘，确保元素高度为 0
      getComputedStyle(element).height

      // 异步代码在前面的同步代码执行完毕后才会被执行
      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      // 防止DOM元素的高度发生改变
      element.style.height = 'auto'
    },
    leave (element) {
      const height = getComputedStyle(element).height

      element.style.height = height

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .transition-slide-enter-active,
  .transition-slide-leave-active
    transition: height 1s ease-in-out
    overflow: hidden
  .transition-slide-enter,
  .transition-slide-leave-to
    height: 0
  *
    will-change: height
    transform: translateZ(0)
    backface-visibility: hidden
    perspective: 1000px
</style>
