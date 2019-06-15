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
        <div class="infos" v-if="sub.info">
          <font-awesome-icon icon="info-circle" class="icon" />
          <a
            class="info"
            v-for="info in sub.info"
            :key="info.name"
            :href="info.href"
            :title="info.title"
          >{{info.name}}</a>
          <!--tag-->
          <span class="tags" v-if="sub.tag">
            <span
              class="tag"
              v-for="(tag, index) in sub.tag"
              :title="tag"
              :key="index"
            >
              <font-awesome-icon :icon="status(tag)" class="icon" />
            </span>
          </span>
        </div>
        <div class="infos" v-else>
          <font-awesome-icon icon="question-circle" class="icon" />
          <span class="info">no info</span>
        </div>
        <!--adapt-->
        <div class="adaptContainer" v-if="!index">
          <div class="adapts" v-if="item.adapt">
            <font-awesome-icon icon="file" class="icon" />
            <a
              class="adapt"
              v-for="adapt in item.adapt"
              :key="adapt.type"
              :href="adapt.href"
            >{{adapt.type}}</a>
          </div>
          <div class="adapts" v-else>
            <font-awesome-icon icon="file-alt" class="icon" />
            <span class="adapt">no adapt</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'work',
  props: {
    id: {
      type: Number,
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
      let status = ''
      switch (tag) {
        case 'alert':
          status = 'exclamation-triangle'
          break
        case 'not perfect complete':
          status = 'splotch'
          break
        case 'rotten':
          status = 'star-half'
          break
        case 'serials':
          status = 'pen-square'
          break
      }
      return status
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
    padding: 25px 0
    width: 400px
    .sub
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
        .adapt
          margin-left: 15px
          line-height: 25px
        .tags
          display: inline-block
          padding-left: 15px
          .tag
            display: inline-block
            padding: 0 5px
</style>
