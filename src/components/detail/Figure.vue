<template>
  <div class="figure">
    <div class="sub">
        <!--name-->
        <div class="name">
          <span>{{item.name}}</span>
          <span v-if="item.originName"> ( {{item.originName}} )</span>
        </div>
        <!--work-->
        <div class="works" v-if="works">
          <i class="icon fa fa-star"></i>
          <a
            class="work"
            v-for="work in works"
            :key="work.id"
            :href="work.href"
            :title="work.title"
          >{{work.name}}</a>
        </div>
        <div class="works" v-else>
          <i class="icon fa fa-star-o"></i>
          <span class="work">no work</span>
        </div>
        <!--link-->
        <div class="links" v-if="links">
          <i class="icon fa fa-chain"></i>
          <a
            class="link"
            v-for="link in links"
            :key="link.id"
            :href="link.href"
          >{{link.name}}</a>
        </div>
        <div class="links" v-else>
          <i class="icon fa fa-chain-broken"></i>
          <span class="link">no link</span>
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
    padding: 25px 0
    width: 400px
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
