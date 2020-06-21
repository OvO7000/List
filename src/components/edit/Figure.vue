<template>
  <div class="e-figure">
    <!--name-->
    <div class="name" @click.stop="editName()">
      <span>{{edit.item.name}}</span>
      <span v-if="edit.item.originName"> ( {{edit.item.originName}} )</span>
    </div>
    <!--work-->
    <div class="works" v-if="edit.item.work">
      <i class="icon fa fa-star" @click.stop="addWork"></i>
      <a
        class="work"
        v-for="(work, index) in edit.item.work"
        :key="work.id"
        :title="work.title"
        @click.stop="deleteWork(work, index)"
      >{{work.name}}</a>
    </div>
    <div class="works" v-else>
      <i class="icon fa fa-star-o"  @click.stop="addWork"></i>
      <span class="work">no work</span>
    </div>
    <!--link-->
    <div class="links" v-if="edit.item.link" @click.stop="addLink">
      <i class="icon fa fa-chain"></i>
      <a
        class="link"
        v-for="(link, index) in edit.item.link"
        :key="index"
        :href="link.href"
        @click.stop="deleteLink(index)"
      >{{link.name}}</a>
    </div>
    <div class="links" v-else  @click.stop="addLink">
      <i class="icon fa fa-chain-broken"></i>
      <span class="link">no link</span>
    </div>
    <!--tag-->
    <div class="tags">
            <span>
              <i title="secret" class="tag fa fa-eye-slash" :style="{'opacity': (edit.item.secret===true)?1:0.5}" @click.stop="secret"></i>
            </span>
    </div>
  </div>
</template>

<script>
import Link from 'components/Link'

export default {
  name: 'EWork',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    edit () {
      return this.$store.getters.edit(this.id)
    }
  },
  methods: {
    editName () {
      const edit = this.edit
      this.$dlg.modal({
        title: 'figure',
        params: {
          name: edit.item.name,
          originName: edit.item.originName || ''
        },
        callback: (data) => {
          if (!data.name) return
          edit.item.name = data.name
          edit.item.originName = data.originName
          if (edit.item.originName === '') {
            delete edit.item.originName
          }
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    addWork () {
      const edit = this.edit
      this.$dlg.modal({
        title: 'work',
        callback: (data) => {
          if (!data.sub) return
          if (!edit.item.work) {
            this.$set(edit.item, 'work', [])
          }
          data.sub.map((item, index) => {
            let work = {
              id: item.id,
              subType: item.subType,
              name: item.name
            }
            let img = {
              resized: item.img,
              work: item.id
            }
            edit.item.work.push(work)
            edit.imgs.push(img)
          })
          this.$store.dispatch('setEdit', edit)
        }
      }, Link)
    },
    deleteWork (work, index) {
      const edit = this.edit
      edit.item.work.splice(index, 1)
      let imgIndex = edit.imgs.findIndex(item => item.id === work.id)
      edit.imgs.splice(imgIndex, 1)
      this.$store.dispatch('setEdit', edit)
    },
    addLink () {
      const edit = this.edit
      this.$dlg.modal({
        title: 'link',
        params: {
          name: '',
          href: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          // 没有输入名字
          if (!data.name || !data.href) return
          let link = {
            name: data.name,
            href: data.href
          }
          if (!edit.item.link) {
            edit.item.link = []
          }
          edit.item.link.push(link)
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    deleteLink (index) {
      const edit = this.edit
      edit.item.link.splice(index, 1)
      this.$store.dispatch('setEdit', edit)
    },
    secret () {
      const edit = this.edit
      edit.item.secret = !edit.item.secret
      this.$store.dispatch('setEdit', edit)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .e-figure
    padding: 25px 0 0
    width: 400px
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
    .tags
      display: flex
      justify-content: space-between
      margin-left: 20px
      font-size: 14px
      .tag
        opacity: 0.5
        display: inline-block
        padding-right: 15px
        line-height: 25px
        &.selected
          opacity: 1
</style>
