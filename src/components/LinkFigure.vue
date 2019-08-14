<template>
    <div class="linkFigure">
      <div class="options">
        <input
          type="text"
          class="text"
          @keyup.enter="getFigures"
          v-model.trim="text"><VSelect v-model="selected" class="select">
          <VOption
            v-for="(type, typeIndex) in figureType"
            :key="typeIndex"
            :value="type.id"
            :label="type.name"
          >{{type.name}}</VOption>
        </VSelect>
      </div>
      <div class="figures">
        <div
          v-for="(figure, figureIndex) in figures"
          :key="figureIndex"
          @click.stop="setFigure(figure)"
          :class="['figure',{'selected':isSelected(figure)}]"
        >
          <div class="content">
            <!--name-->
            <div class="name">
              <span>{{figure.name}}</span>
              <span v-if="figure.originName"> ( {{figure.originName}} )</span>
            </div>
            <!--work-->
            <div class="works" v-if="figure.work">
              <i class="icon fa fa-star"></i>
              <a
                class="work"
                v-for="(work, workIndex) in figure.work"
                :key="workIndex"
                :title="work.title"
              >{{work.name}}</a>
            </div>
            <div class="works" v-else>
              <i class="icon fa fa-star-o"></i>
              <span class="work">no work</span>
            </div>
            <!--link-->
            <div class="links" v-if="figure.link">
              <i class="icon fa fa-chain"></i>
              <a
                class="link"
                v-for="(link, index) in links"
                :key="index"
                :href="link.href"
              >{{link.name}}</a>
            </div>
            <div class="links" v-else>
              <i class="icon fa fa-chain-broken"></i>
              <span class="link">no link</span>
            </div>
          </div>
          <div class="image">
            <div class="inner" v-if="figure.img">
              <img :src="figure.img.resized" :alt="figure.name" :title="figure.name">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import store from '@/store.js'
import VSelect from 'components/VSelect'
import VOption from 'components/VOption'
export default {
  name: 'LinkFigure',
  store,
  props: {
    params: {
      type: Object,
      default () {
        return {
          text: ''
        }
      }
    }
  },
  data () {
    return {
      selected: '',
      text: this.params.text,
      figures: []
    }
  },
  computed: {
    figureType () {
      return this.$store.state.subType.figure
    }
  },
  methods: {
    getFigures () {
      if (this.text && this.text !== '') {
        this.$api.figure.query(this.text, this.selected).then((res) => {
          this.figures = res
        }).catch((err) => {
          this.$dlg.toast(err.msg)
        })
      }
    },
    setFigure (figure) {
      if (!this.params.figure) {
        this.$set(this.params, 'figure', [])
      }
      let figureIndex = this.params.figure.findIndex(item => item.id === figure.id)
      if (figureIndex >= 0) {
        this.params.figure.splice(figureIndex, 1)
      } else {
        let item = {
          id: figure.id,
          title: this.figureType.find(item => item.id === figure.subType).name,
          name: figure.name
        }
        this.params.figure.push(item)
      }
      if (this.params.figure.length === 0) {
        delete this.params.figure
      }
    },
    isSelected (figure) {
      if (this.params.figure) {
        let subIndex = this.params.figure.findIndex(item => item.id === figure.id)
        return subIndex >= 0
      }
      return false
    }
  },
  mounted () {
    this.getFigures()
  },
  components: {
    VSelect: VSelect,
    VOption: VOption
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .linkFigure
    .options
      display: flex
      align-items: flex-start
      .text
        width: 400px
        height: 24px
        font-size: 16px
        margin: 25px 20px 0 0
        color: #ccc
        text-align: center
        border: none
        border-bottom: 1px solid #ccc
      .select
        width: 220px
        margin-top: 25px
    .figures
      min-height: 260px
      padding-top: 5px
      .figure
        display: flex
        justify-content: center
        padding: 0 10px
        &.selected
          background-color: #717171
        .content
          width: 400px
          height: 105px
          padding-top: 25px
          .name
            span
              font-size: 16px
              line-height: 30px
          .works,
          .links
            margin-left: 20px
            font-size: 14px
            .work,
            .link
              margin-left: 15px
              line-height: 25px
            .icon
              width: 15px
        .image
          width: 220px
          height: $itemHeight
          .inner
            overflow: hidden
            height: $itemHeight - 10
            margin: 5px 0
            img
              width: 220px
</style>
