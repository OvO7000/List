<template>
  <div class="e-work">
    <div
      :class="['sub', { 'selected': edit.selected.indexOf(index)>=0}]"
      v-for="(sub, index) in edit.item.sub"
      :key="index"
      @click.stop="select(index)"
    >
      <div class="subName" @click.stop="editSubName(sub, index)">
        <span>{{sub.name}}</span>
        <span v-if="sub.originName"> ( {{sub.originName}} )</span>
      </div>
      <!--info-->
      <div class="infos" v-if="sub.info">
        <i class="icon fa fa-info-circle" @click.stop="addInfo(index)"></i>
        <a
          class="info"
          v-for="(info, InfoIndex) in sub.info"
          :key="info.name"
          :title="info.title"
          @click.stop="deleteInfo(index, InfoIndex)"
        >{{info.name}}</a>
      </div>
      <div class="infos" v-else>
        <i class="icon fa fa-question-circle" @click.stop="addInfo(index)"></i>
        <span class="info">no info</span>
      </div>
      <!--adapt-->
      <div class="adaptContainer" v-if="!index">
        <div class="adapts" v-if="edit.item.adapt">
          <i class="icon fa fa-file"></i>
          <a
            class="adapt"
            v-for="adapt in edit.item.adapt"
            :key="adapt.type"
            :href="adapt.href"
          >{{adapt.type}}</a>
        </div>
        <div class="adapts" v-else>
          <i class="icon fa fa-file-text"></i>
          <span class="adapt">no adapt</span>
        </div>
      </div>
      <!--tag-->
      <div class="tags">
          <span>
            <i title="alert" class="tag fa fa-exclamation" @click.stop="tag($event, index, 0)"></i>
            <i title="not perfect complete" class="tag fa fa-tasks" @click.stop="tag($event, index, 1)"></i>
            <i title="rotten" class="tag fa fa-star-half-o" @click.stop="tag($event, index, 2)"></i>
            <i title="serials" class="tag fa fa-pencil" @click.stop="tag($event, index, 3)"></i>
            <i title="secret" class="tag fa fa-eye-slash" @click.stop="secret($event, index)"></i>
          </span>
        <span>
            <i
              title="image"
              :class="['tag','fa','fa-picture-o',{'selected':hasImg(index)}]"
              @click.stop="selectImg($event, index)"></i>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EWork',
  props: {
    id: {
      type: Number,
      required: true
    }
    // index: {
    //   type: Number,
    //   required: true
    // }
  },
  computed: {
    edit () {
      return this.$store.getters.edit(this.id)
    }
  },
  methods: {
    hasImg (index) {
      return !!this.edit.imgs.find((img) => img.index === index)
    },
    select (index) {
      // 被选中 sub 在 selected 数组中的下标，用于从 selected 删除
      const i = this.edit.selected.indexOf(index)
      const edit = Object.assign({}, this.edit)
      if (i === -1) {
        edit.selected.push(index)
      } else {
        edit.selected.splice(i, 1)
      }
      this.$store.dispatch('setEdit', edit)
    },
    editSubName (sub, index) {
      const edit = Object.assign({}, this.edit)
      this.$dlg.modal({
        title: 'sub',
        params: {
          name: sub.name,
          originName: sub.originName || ''
        },
        callback: (data) => {
          if (!data.name) return
          edit.item.sub[index].name = data.name
          if (data.originName) {
            edit.item.sub[index].originName = data.originName
          }
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    addInfo (index) {
      const edit = Object.assign({}, this.edit)
      this.$dlg.modal({
        title: 'info',
        params: {
          name: '',
          title: ''
        },
        callback: (data) => {
          if (!edit.item.sub[index].info) {
            edit.item.sub[index].info = []
          }
          const info = {}
          info.name = data.name
          if (data.title) {
            info.title = data.title
          }
          edit.item.sub[index].info.push(info)
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    deleteInfo (index, infoIndex) {
      const edit = Object.assign({}, this.edit)
      edit.item.sub[index].info.splice(infoIndex, 1)
      if (!edit.item.sub[index].info.length) {
        delete edit.item.sub[index].info
      }
      this.$store.dispatch('setEdit', edit)
    },
    tag (e, index, tag) {
      const edit = Object.assign({}, this.edit)
      if (!edit.item.sub[index].tag) {
        edit.item.sub[index].tag = []
      }
      let i = edit.item.sub[index].tag.indexOf(tag)
      if (i !== -1) {
        // 删除 tag
        edit.item.sub[index].tag.splice(i, 1)
        e.target.style.opacity = '0.5'
      } else {
        // 添加 tag
        edit.item.sub[index].tag.push(tag)
        e.target.style.opacity = '1'
      }
      if (!edit.item.sub[index].tag.length) {
        delete edit.item.sub[index].tag
      }
      this.$store.dispatch('setEdit', edit)
    },
    secret (e, index) {
      const edit = Object.assign({}, this.edit)
      if (edit.item.sub[index].secret === true) {
        edit.item.sub[index].secret = false
        e.target.style.opacity = '0.5'
      } else {
        edit.item.sub[index].secret = true
        e.target.style.opacity = '1'
      }
      this.$store.dispatch('setEdit', edit)
    },
    selectImg (e, subIndex) {
      const edit = Object.assign({}, this.edit)

      this.$util.imgUploader().then((res) => {
        res.index = subIndex
        const img = edit.imgs.find((img) => img.index === subIndex)
        if (img) {
          // sub已有图片
          const index = edit.imgs.indexOf(img)
          edit.imgs.splice(index, 1, res)
        } else {
          // sub没有图片
          edit.imgs.push(res)
          edit.imgs.sort((a, b) => a.index - b.index)
        }
        this.$store.dispatch('setEdit', edit)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .e-work
    padding-top: 25px
    width: 400px
    .name
      font-size: 16px
      line-height: 30px
    .sub
      padding: 0 20px
      height: 105px
      &.selected
        background-color: $mainColor
      .subName
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
        display: flex
        justify-content: space-between
        margin-left: 20px
        font-size: 14px
        .tag
          opacity: 0.5
          display: inline-block
          padding-right: 15px
          &.selected
            opacity: 1
</style>
