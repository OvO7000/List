<template>
    <div class="link">
      <div>
        <input
          type="text"
          class="text"
          @keyup.enter="getSubs"
          v-model.trim="text"><select v-model="selected">
          <option
            v-for="(type, typeIndex) in workType"
            :key="typeIndex"
            value="type.id">{{type.name}}</option>
        </select>
      </div>
      <div class="subs">
        <div
          class="sub"
          v-for="(sub, subIndex) in subs"
          :key="subIndex"
          @click.stop="setSub(sub)"
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
export default {
  name: 'Link',
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
      selected: this.workType[0].id,
      text: this.params.text,
      subs: []
    }
  },
  computed: {
    workType () {
      return this.$store.state.subType.work
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
      if (this.params && this.params.text && this.params.text !== '') {
        this.$api.sub.index(this.params.text, this.selected).then((res) => {
          this.subs = res
        }).catch((err) => {
          this.$dlg.toast(err)
        })
      }
    },
    setSub (sub) {
      this.params.sub = {
        id: sub.id,
        subType: sub.subType,
        name: sub.name,
        img: sub.img
      }
    }
  },
  mounted () {
    this.getSubs()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .link
    .text
      width: 80%
      font-size: 16px
      margin-top: 25px
      color: #ccc
      text-align: center
      border-bottom: 1px solid #ccc
    select
      width: 20%
      font-size: 16px
      margin-top: 25px
      color: #ccc
      text-align: center
      border-bottom: 1px solid #ccc
    .subs
      .sub
        .content
          width: 400px
          height: 105px
          padding-top: 25px
          padding-left: 20px
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
          flex: 0 0 auto
          width: 220px
          height: $itemHeight
          .inner
            overflow: hidden
            height: $itemHeight - 10
            margin: 5px 0
            img
              width: 220px
</style>
