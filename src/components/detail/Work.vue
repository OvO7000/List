<template>
  <div class="work">
    <!--sub-->
    <div
        class="sub"
        v-for="(sub, index) in subs"
        :key="sub.id"
      >
        <!--name-->
        <div class="name">
          <span>{{sub.name}}</span>
          <span v-if="sub.originName"> ( {{sub.originName}} )</span>
        </div>
        <!--info-->
        <div class="infos" v-if="sub.info || sub.figure">
          <i class="icon fa fa-info-circle"></i>
          <a
            class="figure"
            v-for="figure in sub.figure"
            :key="figure.id"
            :title="figure.title"
            @click.stop="getFigure(figure.id)"
          >{{figure.name}}</a>
          <a
            class="info"
            v-for="info in sub.info"
            :key="info.name"
            :title="info.title"
          >{{info.name}}</a>
        </div>
        <div class="infos" v-else>
          <i class="icon fa fa-question-circle"></i>
          <span class="info">no info</span>
        </div>
        <!--adapt-->
        <div class="adaptContainer" v-if="!index">
          <div class="adapts" v-if="item.adapt">
            <i class="icon fa fa-file"></i>
            <span v-if="item.adapt.works">
              <a class="adapt"
                 v-for="(adapt, adaptIndex) in item.adapt.works"
                 @click.stop="getWork(adapt.id)"
                 :key="adaptIndex"
              >{{adapt.subType.name}}</a>
            </span>
            <span class="adapt" v-else>no adapt</span>
          </div>
          <div class="adapts" v-else>
            <i class="icon fa fa-file-text"></i>
            <span class="adapt">no adapt</span>
          </div>
        </div>
        <!--tags-->
        <div class="tags">
          <span v-if="sub.tag">
            <span
              class="tag"
              v-for="(tag, index) in sub.tag"
              :title="status(tag).title"
              :key="index"
            >
              <i :class="['icon','fa',status(tag).icon]"></i>
            </span>
          </span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'work',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    item () {
      return this.$store.getters.item(this.id)
    },
    subs () {
      if (this.item && this.item.sub) {
        return this.item.sub
      }
      return false
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
    getFigure (id) {
      let payload = {
        type: 'figure',
        id: id
      }
      this.$store.dispatch('getItem', payload).then((res) => {
        let subType = this.$store.state.subType['figure'].find((subType) => subType.id === res.subType)
        this.$router.push(`/figure/${subType.name_en}`)
      }).catch((err) => {
        this.$dlg.toast(err.msg)
      })
    },
    getWork (id) {
      let payload = {
        type: 'work',
        id: id
      }
      this.$store.dispatch('getItem', payload).then((res) => {
        let subType = this.$store.state.subType['work'].find((subType) => subType.id === res.subType)
        this.$router.push(`/work/${subType.name_en}`)
      }).catch((err) => {
        this.$dlg.toast(err.msg)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  *
    will-change: max-height
    transform: translateZ(0)
    backface-visibility: hidden
    perspective: 1000px
  .slide-enter-active,
  .slide-leave-active
    transition: max-height 1s linear
    max-height: 80px
  .slide-enter,
  .slide-leave-to
    max-height: 0

  .work
    padding-top: 25px
    width: 400px
    .sub
      padding-left: 20px
      height: 105px
      .name
        span
          font-size: 16px
          line-height: 30px
      .infos,
      .adapts
        margin-left: 20px
        font-size: 14px
        .info,
        .figure,
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
</style>
