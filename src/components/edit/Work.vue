<template>
  <div class="e-work">
    <div
      :class="['sub', { 'selected': edit.selected.indexOf(sub.id)>=0}]"
      v-for="(sub, index) in edit.item.sub"
      :key="index"
      @click.stop="select(index)"
    >
      <div class="subName" @click.stop="editSubName(sub, index)">
        <span>{{sub.name}}</span>
        <span v-if="sub.originName"> ( {{sub.originName}} )</span>
      </div>
      <!--info-->
      <div class="infos" v-if="sub.info || sub.figure">
        <Popover v-model="showPopper">
          <div @click.stop="linkFigure(index)">figure</div>
          <div @click.stop="addInfo(index)">info</div>
          <i class="icon fa fa-info-circle" slot="reference"></i>
        </Popover>
        <a class="figure"
           v-for="(figure, figureIndex) in sub.figure"
           :key="figure.id"
           :title="figure.title"
           @click.stop="deleteFigure(index, figureIndex)"
        >{{figure.name}}</a>
        <a class="info"
           v-for="(info, infoIndex) in sub.info"
           :key="info.name"
           :title="info.title"
           @click.stop="deleteInfo(index, infoIndex)"
        >{{info.name}}</a>
      </div>
      <div class="infos" v-else>
        <Popover v-model="showPopper">
          <div @click.stop="linkFigure(index)">figure</div>
          <div @click.stop="addInfo(index)">info</div>
          <i class="icon fa fa-question-circle" slot="reference"></i>
        </Popover>
        <span class="info">no info</span>
      </div>
      <!--adapt-->
      <div class="adaptContainer" v-if="!index">
        <div class="adapts" v-if="edit.item.adapt">
          <Popover v-model="showPopper">
            <div @click.stop="setOrigin()" v-text="edit.item.adapt.origin?'unset origin':'set origin'"></div>
            <div @click.stop="removeFromAdapt()">remove from adapt</div>
            <div @click.stop="setAdaptName()">set adapt name</div>
            <i class="icon fa fa-file" slot="reference"></i>
          </Popover>
          <span v-if="edit.item.adapt.works">
            <a class="adapt"
               v-for="(adapt, adaptIndex) in edit.item.adapt.works"
               :key="adaptIndex"
            >{{adapt.subType.name}}</a>
          </span>
          <span class="adapt" v-else>no adapt</span>
        </div>
        <div class="adapts" v-else>
          <Popover v-model="showPopper">
            <div @click.stop="addAdapt()">add adapt</div>
            <div @click.stop="linkAdapt()">add to adapt</div>
            <i class="icon fa fa-file-text" slot="reference"></i>
          </Popover>
          <span class="adapt">no adapt</span>
        </div>
      </div>
      <!--tag-->
      <div class="tags">
          <span>
            <i title="alert" class="tag fa fa-exclamation" :style="{'opacity': hasTag(sub, 0)}" @click.stop="tag(index, 0)"></i>
            <i title="not perfect complete" class="tag fa fa-tasks" :style="{'opacity': hasTag(sub, 1)}" @click.stop="tag(index, 1)"></i>
            <i title="rotten" class="tag fa fa-star-half-o" :style="{'opacity': hasTag(sub, 2)}" @click.stop="tag(index, 2)"></i>
            <i title="serials" class="tag fa fa-pencil" :style="{'opacity': hasTag(sub, 3)}" @click.stop="tag(index, 3)"></i>
            <i title="secret" class="tag fa fa-eye-slash" :style="{'opacity': sub.secret?1:0.5}" @click.stop="secret($event, index)"></i>
          </span>
        <span>
            <i
              title="image"
              :class="['tag','fa','fa-picture-o',{'selected':hasImg(index)}]"
              @click.stop="selectImg($event, sub)"></i>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import Popover from 'components/Popover'
import LinkFigure from 'components/LinkFigure'
import LinkAdapt from 'components/LinkAdapt'
export default {
  name: 'EWork',
  props: {
    id: {
      type: String,
      required: true
    }
    // index: {
    //   type: Number,
    //   required: true
    // }
  },
  data () {
    return {
      showPopper: false
    }
  },
  computed: {
    edit () {
      return this.$store.getters.edit(this.id)
    }
  },
  methods: {
    hasImg (index) {
      return !!this.edit.imgs.find((img) => {
        if (img.sub === this.edit.item.sub[index].id) {
          if (img.compressed || img.file) {
            return true
          }
        }
        return false
      })
    },
    hasTag (sub, index) {
      return (sub.tag && sub.tag.indexOf(index) >= 0) ? 1 : 0.5
    },
    select (index) {
      // 被选中 sub 在 selected 数组中的下标，用于从 selected 删除
      const id = this.edit.item.sub[index].id
      const i = this.edit.selected.indexOf(id)
      let edit = JSON.parse(JSON.stringify(this.edit))
      if (i === -1) {
        edit.selected.push(id)
      } else {
        edit.selected.splice(i, 1)
      }
      this.$store.dispatch('setEdit', edit)
    },
    editSubName (sub, index) {
      let edit = JSON.parse(JSON.stringify(this.edit))
      this.$dlg.modal({
        title: 'sub',
        params: {
          name: sub.name,
          originName: sub.originName || ''
        },
        callback: (data) => {
          if (!data.name) return
          edit.item.sub[index].name = data.name
          edit.item.sub[index].originName = data.originName
          if (edit.item.sub[index].originName === '') {
            delete edit.item.sub[index].originName
          }
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    addAdapt () {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
      this.$dlg.modal({
        title: 'adapt',
        params: {
          name: ''
        },
        callback: (data) => {
          if (!data || !data.name) return
          this.$api.adapt.exist(data.name).then(res => {
            if (!edit.item.adapt) {
              edit.item.adapt = {}
            }
            edit.item.adapt.name = data.name
            edit.item.adapt.origin = false
            this.$store.dispatch('setEdit', edit)
          }).catch(err => {
            this.$dlg.toast(err.msg)
          })
        }
      })
    },
    linkAdapt () {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
      this.$dlg.modal({
        title: 'adapt',
        callback: (data) => {
          if (!data || !data.adapt) return
          if (!edit.item.adapt) {
            edit.item.adapt = {}
          }
          let index = data.adapt.works.findIndex(work => work.id === edit.id)
          if (index >= 0) {
            data.adapt.works.splice(index, 1)
          }
          edit.item.adapt = data.adapt
          this.$store.dispatch('setEdit', edit)
        }
      }, LinkAdapt)
    },
    removeFromAdapt () {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
      delete edit.item.adapt
      this.$store.dispatch('setEdit', edit)
    },
    setAdaptName () {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
      this.$dlg.modal({
        title: 'adapt',
        params: {
          name: ''
        },
        callback: (data) => {
          if (!data || !data.name) return
          this.$api.adapt.exist(data.name).then(res => {
            edit.item.adapt.name = data.name
            this.$store.dispatch('setEdit', edit)
          }).catch(err => {
            this.$dlg.toast(err.msg)
          })
        }
      })
    },
    setOrigin () {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
      if (!edit.item.adapt) return
      if (!edit.item.adapt.origin) {
        edit.item.adapt.origin = true
      } else {
        edit.item.adapt.origin = !edit.item.adapt.origin
      }
      this.$store.dispatch('setEdit', edit)
    },
    linkFigure (index) {
      let edit = JSON.parse(JSON.stringify(this.edit))
      this.showPopper = false
      this.$dlg.modal({
        title: 'figure',
        callback: (data) => {
          if (!data.figure) return
          if (!edit.item.sub[index].figure) {
            this.$set(edit.item.sub[index], 'figure', [])
          }
          data.figure.map((item) => {
            let figure = {
              id: item.id,
              title: item.title,
              name: item.name
            }
            edit.item.sub[index].figure.push(figure)
          })
          this.$store.dispatch('setEdit', edit)
        }
      }, LinkFigure)
    },
    addInfo (index) {
      this.showPopper = false
      let edit = JSON.parse(JSON.stringify(this.edit))
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
      let edit = JSON.parse(JSON.stringify(this.edit))
      edit.item.sub[index].info.splice(infoIndex, 1)
      if (!edit.item.sub[index].info.length) {
        delete edit.item.sub[index].info
      }
      this.$store.dispatch('setEdit', edit)
    },
    deleteFigure (index, figureIndex) {
      let edit = JSON.parse(JSON.stringify(this.edit))
      edit.item.sub[index].figure.splice(figureIndex, 1)
      if (!edit.item.sub[index].figure.length) {
        delete edit.item.sub[index].figure
      }
      this.$store.dispatch('setEdit', edit)
    },
    tag (index, tag) {
      let edit = JSON.parse(JSON.stringify(this.edit))
      if (!edit.item.sub[index].tag) {
        edit.item.sub[index].tag = []
      }
      let i = edit.item.sub[index].tag.indexOf(tag)
      if (i !== -1) {
        // 删除 tag
        edit.item.sub[index].tag.splice(i, 1)
      } else {
        // 添加 tag
        edit.item.sub[index].tag.push(tag)
      }
      if (!edit.item.sub[index].tag.length) {
        delete edit.item.sub[index].tag
      }
      this.$store.dispatch('setEdit', edit)
    },
    secret (e, index) {
      let edit = JSON.parse(JSON.stringify(this.edit))
      if (edit.item.sub[index].secret === true) {
        edit.item.sub[index].secret = false
        e.target.style.opacity = '0.5'
      } else {
        edit.item.sub[index].secret = true
        e.target.style.opacity = '1'
      }
      this.$store.dispatch('setEdit', edit)
    },
    selectImg (e, sub) {
      let edit = this.edit
      this.$util.imgUploader().then((res) => {
        res.sub = sub.id
        const imgIndex = edit.imgs.findIndex((img) => img.sub === sub.id)
        const img = edit.imgs.find((img) => img.sub === sub.id)
        if (img) {
          // sub已有图片
          if (img.id) {
            res.id = img.id
          }
          edit.imgs.splice(imgIndex, 1, res)
        } else {
          // sub没有图片, 则新增图片
          edit.imgs.push(res)
          edit.imgs.sort((a, b) => {
            let aSort = edit.item.sub.find(item => a.sub === item.id).sort
            let bSort = edit.item.sub.find(item => b.sub === item.id).sort
            return aSort - bSort
          })
        }
        this.$store.dispatch('setEdit', edit)
      })
    }
  },
  components: {
    Popover
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
      padding-left: 20px
      margin-right: 20px
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
        .figure,
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
