<template>
  <div class="figure">
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
        :title="work.title"
        @click="getWork(work.id)"
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
</template>

<script>
export default {
  name: 'Figure',
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
    links () {
      if (this.item && this.item.link) {
        return this.item.link
      }
      return false
    },
    works () {
      if (this.item && this.item.work) {
        return this.item.work
      }
      return false
    }
  },
  methods: {
    getWork (id) {
      let payload = {
        type: 'work',
        id: id
      }
      this.$store.dispatch('getItem', payload).then((res) => {
        let subType = this.$store.state.subType['work'].find((subType) => subType.id === res.subType)
        this.$router.push(`/work/${subType.name_en}`)
      }).catch((err) => {
        this.$dlg.toast(err)
      })
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
