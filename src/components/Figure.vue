<template>
  <div class="figure">
    <div class="rank"><span>#{{index}}</span></div>
    <div class="content">
      <div class="sub">
        <!--name-->
        <div class="name">
          <span>{{item.name}}</span>
          <span v-if="item.originName"> ( {{item.originName}} )</span>
        </div>
        <!--work-->
        <div class="works" v-if="works">
          <font-awesome-icon icon="star" class="icon" />
          <a
            class="work"
            v-for="work in works"
            :key="work.id"
            :href="work.href"
            :title="work.title"
          >{{work.name}}</a>
        </div>
        <div class="works" v-else>
          <font-awesome-icon :icon="['far', 'star']" class="icon" />
          <span class="work">no work</span>
        </div>
        <!--link-->
        <div class="links" v-if="links">
          <font-awesome-icon icon="link" class="icon" />
          <a
            class="link"
            v-for="link in links"
            :key="link.id"
            :href="link.href"
          >{{link.name}}</a>
        </div>
        <div class="links" v-else>
          <font-awesome-icon icon="unlink" class="icon" />
          <span class="link">no link</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Figure',
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
    item () {
      return this.$store.getters.item(this.id)
    },
    links () {
      if (this.item && this.item.info.link) {
        return this.item.info.link
      }
      return false
    },
    works () {
      if (this.item && this.item.info.work) {
        return this.item.info.work
      }
      return false
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~styles/variables.styl'

  .figure
    position: relative
    .rank
      position: absolute
      left: 0
      top: 25px
      span
        font-size: 20px
        line-height: 30px
    .content
      .sub
        padding: 25px 5%
        height: $itemHeight - 50
        .name
          span
            font-size: 16px
            line-height: 30px
        .works,
        .links
          margin-left: 20px
          font-size: 14px
          .link,
          .work
            margin-left: 15px
            line-height: 25px
</style>
