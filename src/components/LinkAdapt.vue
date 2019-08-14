<template>
  <div class="linkAdapt">
    <div class="options">
      <input
        type="text"
        class="text"
        @keyup.enter="getAdapts"
        v-model.trim="text">
    </div>
    <div class="adapts">
      <div
        v-for="(adapt, adaptIndex) in adapts"
        :key="adaptIndex"
        @click.stop="setAdapt(adapt)"
        :class="['adapt',{'selected':isSelected(adapt)}]"
      >
        <div class="content">
          <!--name-->
          <div class="name">
            <span>{{adapt.name}}</span>
          </div>
          <!--adapt-->
          <div class="works" v-if="adapt.works">
            <i class="icon fa fa-file"></i>
            <a
              class="work"
              v-for="(work, workIndex) in adapt.works"
              :key="workIndex"
              :title="work.subType.name"
            >{{work.subType.name}}</a>
          </div>
          <div class="works" v-else>
            <i class="icon fa fa-file-text"></i>
            <span class="work">no work</span>
          </div>
        </div>
        <div class="image">
          <div class="inner" v-if="adapt.img">
            <img :src="adapt.img.resized" :alt="adapt.name" :title="adapt.name">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'LinkAdapt',
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
      text: this.params.text,
      adapts: []
    }
  },
  methods: {
    getAdapts () {
      if (this.text && this.text !== '') {
        this.$api.adapt.query(this.text).then((res) => {
          this.adapts = res
        }).catch((err) => {
          this.$dlg.toast(err.msg)
        })
      }
    },
    setAdapt (adapt) {
      if (!this.params.adapt) {
        this.$set(this.params, 'adapt', {})
      }
      let item = {
        id: adapt.id,
        works: adapt.works,
        name: adapt.name,
        origin: adapt.origin
      }
      this.params.adapt = item
    },
    isSelected (adapt) {
      if (this.params.adapt && this.params.adapt.id === adapt.id) {
        return true
      }
      return false
    }
  },
  mounted () {
    this.getAdapts()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .linkAdapt
    width: 620px
    .options
      display: flex
      align-items: flex-start
      .text
        width: 100%
        height: 24px
        font-size: 16px
        margin: 25px 0 0
        color: #ccc
        text-align: center
        border: none
        border-bottom: 1px solid #ccc
    .adapts
      min-height: 260px
      padding-top: 5px
      .adapt
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
          .works
            margin-left: 20px
            font-size: 14px
            .work
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
