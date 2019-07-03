<template>
  <div class="item" @click="showSubItems">
    <div class="container" ref="container">
      <div class="rank" v-if="rank"><span>#{{index}}</span></div>
      <Figure :id="id" v-if="type==='figure'"></Figure>
      <Work :id="id" v-if="type==='work'"></Work>
      <Images :id="id"></Images>
    </div>
    <!--submit-->
    <div class="btns">
      <div class="edit btn"  @click="edit">
        <input type="submit" value="edit">
      </div>
    </div>
  </div>
</template>

<script>
import Figure from 'components/detail/Figure'
import Work from 'components/detail/Work'
import Images from 'components/detail/Images'
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
    },
    edit () {
      this.$store.dispatch('setEdits', this.id)
    }
  },
  components: {
    Images,
    Figure,
    Work
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .item
    position: relative
    overflow: hidden
    .container
      display: flex
      justify-content: center
      height: 130px
      transition: all 2s
      &:hover
        background-color: $bgColor
      .rank
        margin-top: 25px
        width: 100px
        span
          font-size: 20px
          line-height: 30px
    .btns
      position: absolute
      right: 0
      top: 0
      bottom: 0
      .btn
        float: right
        width: 100px
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        input
          color: $fontColor
          font-size: 16px
          background-color: transparent
        &:hover
          background-color: $mainColor
          input
            background-color: transparent
</style>
