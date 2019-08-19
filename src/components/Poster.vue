<template>
    <div class="poster" :style="{opacity: opacity}">
      <div class="inner" @click="hidePoster">
        <img :src="poster.image" ref="image">
      </div>
    </div>
</template>

<script>
export default {
  name: 'Poster',
  data () {
    return {
      opacity: 0
    }
  },
  computed: {
    poster () {
      return this.$store.state.poster
    }
  },
  methods: {
    hidePoster () {
      this.$store.dispatch('hidePoster')
    }
  },
  mounted () {
    let screenHeight = window.innerHeight
    let image = this.$refs.image
    image.onload = () => {
      let imgHeight = image.offsetHeight
      if (imgHeight > screenHeight - 120) {
        image.style.height = (screenHeight - 120) + 'px'
      }
      this.opacity = 1
    }
  }
  // watch: {
  //   'poster': {
  //     handler: function (val, oldVal) {
  //       if (val.show === true) {
  //         // let screenHeight = window.innerHeight
  //         let image = this.$refs.image
  //         console.log(image)
  //         image.onload = () => {
  //           console.log(image)
  //           // let imgHeight = image.offsetHeight
  //           // if (imgHeight > screenHeight - 120) {
  //           //   image.style.height = (screenHeight - 120) + 'px'
  //           // }
  //         }
  //       }
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  .poster
    position: fixed
    top: 80px
    bottom: 20px
    right: 20px
    z-index: 200
    display: flex
    align-items: center
    .inner
      padding: 10px
      background: #000
</style>
