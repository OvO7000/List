<template>
  <div class="item" @click.stop="showSubItems">
    <div class="container" ref="container">
      <!--<div class="rank" v-if="rank"><span>#{{index}}</span></div>-->
      <!--rank-->
      <Rank :id="id" :index="index"></Rank>
      <!--item-->
      <Work v-if="type==='work'" :id="id"></Work>
      <Figure v-if="type==='figure'" :id="id"></Figure>
      <!--images-->
      <Images :id="id"></Images>
      <Btns :id="id" v-if="type==='work'"></Btns>
      <FigureBtns :id="id" v-if="type==='figure'"></FigureBtns>
    </div>
  </div>
</template>

<script>
import Images from 'components/edit/Images'
import Figure from 'components/edit/Figure'
import Work from 'components/edit/Work'
import Rank from 'components/edit/Rank'
import Btns from 'components/edit/Btns'
import FigureBtns from 'components/edit/FigureBtns'

export default {
  name: 'Items',
  data () {
    return {
    }
  },
  props: {
    id: {
      type: String,
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
    // rank () {
    //   let rank
    //   switch (this.type) {
    //     case 'figure':
    //       rank = true
    //       break
    //     case 'work':
    //       rank = this.$store.getters.isRank(this.id)
    //       break
    //   }
    //   return rank
    // },
    item () {
      return this.$store.getters.item(this.id)
    }
  },
  methods: {
    showSubItems () {
      // this.show = !this.show
      let height = getComputedStyle(this.$refs.container).height
      if (height === '130px') {
        this.$refs.container.style.height = 'auto'
        this.$refs.container.style.overFlow = 'auto'
      } else {
        this.$refs.container.style.height = '130px'
        this.$refs.container.style.overFlow = 'hidden'
      }
    },
    changeMode () {
      this.mode = (this.mode === 'edit') ? 'index' : 'edit'
    }
  },
  components: {
    Images,
    Work,
    Figure,
    Rank,
    Btns,
    FigureBtns
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
      display: flex
      justify-content: center
      height: 130px
      transition: all 2s
</style>
