<template>
  <div class="item" @click="showSubItems">
    <div class="container" ref="container">
      <!--<div class="rank" v-if="rank"><span>#{{index}}</span></div>-->
      <!--rank-->
      <Rank :id="id" :index="index"></Rank>
      <!--item-->
      <Work v-if="type==='work'" :id="id"></Work>
      <!--<Figure v-if="type==='figure'" :id="id"></Figure>-->
      <!--images-->
      <Images :id="id"></Images>
    </div>
    <div @click.stop="changeMode">click</div>
  </div>
</template>

<script>
import Images from 'components/edit/Images'
// import Figure from 'components/edit/Figure'
import Work from 'components/edit/Work'
import Rank from 'components/edit/Rank'

export default {
  name: 'Items',
  data () {
    return {
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
    view () {
      if (this.mode === 'detail') {
        return {
          item: this.type,
          images: 'images',
          rank: 'rank'
        }
      } else {
        return {
          item: 'e' + this.type,
          images: 'eimages',
          rank: 'erank'
        }
      }
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
      } else {
        this.$refs.container.style.height = '130px'
      }
    },
    changeMode () {
      this.mode = (this.mode === 'edit') ? 'index' : 'edit'
    }
  },
  components: {
    Images,
    Work,
    // Figure,
    Rank
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
</style>
