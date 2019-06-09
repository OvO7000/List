<template>
  <div class="item" @click="showSubItems">
    <div class="container">
      <router-view :id="id" :index="index" :show="show"></router-view>
      <Images :id="id"></Images>
    </div>
  </div>
</template>

<script>
import Images from 'components/Images'

export default {
  name: 'Items',
  data () {
    return {
      show: false
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    type () {
      return this.$route.path.split('/')[1]
    }
  },
  methods: {
    showSubItems () {
      this.show = !this.show
    }
  },
  components: {
    Images
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .item
    overflow: hidden
    &:hover
      background-color: $bgColor
    .container
      position: relative
      width: 60%
      margin: 0 auto
      .images
        position: absolute
        right: 0
        top: 0
</style>
