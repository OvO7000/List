<template>
    <div class="link">
      <div class="options">
        <input
          type="text"
          class="text"
          @keyup.enter="getSubs"
          v-model.trim="text"><VSelect v-model="selected" class="select">
          <VOption
            v-for="(type, typeIndex) in workType"
            :key="typeIndex"
            :value="type.id"
            :label="type.name"
          >{{type.name}}</VOption>
        </VSelect>
      </div>
      <div class="subs">
        <div
          v-for="(sub, subIndex) in subs"
          :key="subIndex"
          @click.stop="setSub(sub)"
          :class="['sub',{'selected':isSelected(sub)}]"
        >
          <div class="content">
            <!--name-->
            <div class="name">
              <span>{{sub.name}}</span>
              <span v-if="sub.originName"> ( {{sub.originName}} )</span>
            </div>
            <!--info-->
            <div class="infos" v-if="sub.info">
              <i class="icon fa fa-info-circle"></i>
              <a
                class="info"
                v-for="(info, infoIndex) in sub.info"
                :key="infoIndex"
                :title="info.title"
              >{{info.name}}</a>
            </div>
            <div class="infos" v-else>
              <i class="icon fa fa-question-circle"></i>
              <span class="info">no info</span>
            </div>
            <!--tags-->
            <div class="tags">
              <span v-if="sub.tag">
                <span
                  class="tag"
                  v-for="(tag, tagIndex) in sub.tag"
                  :title="status(tag).title"
                  :key="tagIndex"
                >
                  <i :class="['icon','fa',status(tag).icon]"></i>
                </span>
              </span>
            </div>
          </div>
          <div class="image">
            <div class="inner">
              <img :src="sub.img" :alt="sub.name" :title="sub.name">
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
  name: 'Link',
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
      subs: []
    }
  },
  computed: {
    workType () {
      return store.state.subType.work
    }
  },
  methods: {
    status (tag) {
      let icon = ''
      let title = ''
      switch (tag) {
        case 0:
          icon = 'fa-exclamation'
          title = 'alert'
          break
        case 1:
          icon = 'fa-tasks'
          title = 'not perfect complete'
          break
        case 2:
          icon = 'fa-star-half-o'
          title = 'rotten'
          break
        case 3:
          icon = 'fa-pencil'
          title = 'serials'
          break
      }
      return {
        icon,
        title
      }
    },
    getSubs () {
      if (this.text && this.text !== '') {
        this.$api.sub.index(this.text, this.selected).then((res) => {
          this.subs = res
        }).catch((err) => {
          this.$dlg.toast(err.msg)
        })
      }
    },
    setSub (sub) {
      if (!this.params.sub) {
        this.$set(this.params, 'sub', [])
      }
      let subIndex = this.params.sub.findIndex(item => item.id === sub.id)
      if (subIndex >= 0) {
        this.params.sub.splice(subIndex, 1)
      } else {
        let item = {
          id: sub.id,
          subType: sub.subType,
          name: sub.name,
          img: sub.img
        }
        this.params.sub.push(item)
      }
      if (this.params.sub.length === 0) {
        delete this.params.sub
      }
    },
    isSelected (sub) {
      if (this.params.sub) {
        let subIndex = this.params.sub.findIndex(item => item.id === sub.id)
        return subIndex >= 0
      }
      return false
    }
  },
  mounted () {
    this.getSubs()
  },
  components: {
    VSelect: VSelect,
    VOption: VOption
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .link
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
    .subs
      min-height: 260px
      padding-top: 5px
      .sub
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
          .infos,
          .adapts
            margin-left: 20px
            font-size: 14px
            .info,
            .adapt
              margin-left: 15px
              line-height: 25px
            .icon
              width: 15px
          .tags
            margin-left: 20px
            font-size: 14px
            .tag
              display: inline-block
              padding-right: 15px
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
