<template>
  <div class="item" @click="showSubItems">
    <div class="container" ref="container">
      <div class="rank" v-if="rank"><span>#{{index}}</span></div>
      <router-view :id="id"></router-view>
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
    },
    rank () {
      let rank
      switch (this.type) {
        case 'figure':
          rank = true
          break
        case 'work':
          rank = this.$store.getters.isRank(this.id)
          break
      }
      return rank
    }
  },
  methods: {
    showSubItems () {
      // this.show = !this.show
      let height = getComputedStyle(this.$refs.container).height
      if (height === '130px') {
        this.$refs.container.style.height = 'auto'
      } else {
        this.$refs.container.style.height = '130px'
      }
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
      display: flex
      justify-content: center
      height: 130px
      transition: all 2s
      .rank
        margin-top: 25px
        width: 100px
        span
          font-size: 20px
          line-height: 30px
      .images
        flex: 0 1 auto
</style>
