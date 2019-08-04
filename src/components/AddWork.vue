<template>
  <div class="addWork">
    <div class="addWorkBtn" v-if="!show" @click="addWork">
      <h3>+</h3>
    </div>
    <div class="work" v-else>
      <label class="rank">
        <span @click="rank">#</span>
      </label>
      <div class="content">
        <!--sub-->
        <div
          :class="['sub', { 'selected': selected.indexOf(index)>=0}]"
          v-for="(sub, index) in work.sub"
          :key="index"
          @click="select(index)"
        >
          <div class="subName" @click.stop="editSubName(sub)">
            <span v-text="sub.name"></span>
            <span v-if="sub.originName"> ( {{sub.originName}} )</span>
          </div>

          <!--info-->
          <div class="infos" v-if="sub.info || sub.figure">
            <Popover v-model="showPopper">
              <div @click.stop="linkFigure(sub)">figure</div>
              <div @click.stop="addInfo(sub)">info</div>
              <i class="icon fa fa-info-circle" slot="reference"></i>
            </Popover>
            <a
              class="figure"
              v-for="(figure, index) in sub.figure"
              :key="figure.id"
              :title="figure.title"
              @click.stop="deleteFigure(sub, index)"
            >{{figure.name}}</a>
            <a
              class="info"
              v-for="(info, index) in sub.info"
              :key="info.name"
              :title="info.title"
              @click.stop="deleteInfo(sub, index)"
            >{{info.name}}</a>
          </div>
          <div class="infos" v-else>
            <Popover v-model="showPopper">
              <div @click="linkFigure(sub)">figure</div>
              <div @click.stop="addInfo(sub)">info</div>
              <i class="icon fa fa-question-circle" slot="reference"></i>
            </Popover>
            <span class="info">no info</span>
          </div>
          <!--adapt-->
          <div class="adaptContainer" v-if="!index">
            <div class="adapts" v-if="work.adapt">
              <i class="icon fa fa-file"></i>
              <a
                class="adapt"
                v-for="adapt in work.adapt"
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
              <i title="alert" class="tag fa fa-exclamation" @click.stop="tag($event, sub, 0)"></i>
              <i title="not perfect complete" class="tag fa fa-tasks" @click.stop="tag($event, sub, 1)"></i>
              <i title="rotten" class="tag fa fa-star-half-o" @click.stop="tag($event, sub, 2)"></i>
              <i title="serials" class="tag fa fa-pencil" @click.stop="tag($event, sub, 3)"></i>
              <i title="secret" class="tag fa fa-eye-slash" @click.stop="secret($event, sub)"></i>
            </span>
            <span>
              <i title="image" :class="['tag','fa','fa-picture-o',{'selected':hasImg(index)}]" @click.stop="selectImg($event, index)"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="images">
        <div
          class="image"
          v-for="(img, index) in imgs"
          :key="index"
          @click="deleteImg(img.index, index)"
        >
          <div class="inner">
            <div class="mask">
              <i class="fa fa-times"></i>
              <div></div>
            </div>
            <img :src="img.base64">
          </div>
        </div>
      </div>
      <!--submit-->
      <div class="btns">
        <div class="save btn"  @click.stop="save">
          <input type="submit" value="save">
        </div>
        <div class="cancel btn"  @click.stop="cancel">
          <input type="submit" value="cancel">
        </div>
        <div class="delete btn"  @click.stop="del">
          <input type="submit" value="delete">
        </div>
        <div class="add btn"  @click.stop="addSub">
          <input type="submit" value="+">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popover from 'components/Popover'
import LinkFigure from 'components/LinkFigure'
export default {
  name: 'AddWork',
  data () {
    return {
      show: false,
      showPopper: false,
      work: {
        rank: false,
        // adapt: [],
        sub: []
      },
      imgs: [],
      selected: []
    }
  },
  methods: {
    addWork () {
      this.$dlg.modal({
        title: 'work',
        params: {
          name: '',
          originName: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          // 没有输入名字
          if (!data.name) return
          let sub = {}
          sub.secret = false
          sub.name = data.name
          sub.originName = data.originName
          if (data.originName === '') {
            delete sub.originName
          }
          this.work.sub.push(sub)
          this.show = true
        }
      })
    },
    addSub () {
      this.$dlg.modal({
        title: 'sub',
        params: {
          name: '',
          originName: ''
        },
        callback: (data) => {
          if (!data.name) return
          let sub = {}
          sub.secret = false
          sub.name = data.name
          sub.originName = data.originName
          if (data.originName === '') {
            delete sub.originName
          }
          this.work.sub.push(sub)
        }
      })
    },
    editSubName (sub) {
      this.$dlg.modal({
        title: 'sub',
        params: {
          name: sub.name,
          originName: sub.originName || ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          if (!data.name) return
          sub.name = data.name
          sub.originName = data.originName
          if (data.originName === '') {
            delete sub.originName
          }
        }
      })
    },
    addInfo (sub) {
      this.showPopper = false
      this.$dlg.modal({
        title: 'info',
        params: {
          name: '',
          title: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          if (!sub.info) {
            this.$set(sub, 'info', [])
          }
          const info = {}
          info.name = data.name
          if (data.title) {
            info.title = data.title
          }
          sub.info.push(info)
        }
      })
    },
    linkFigure (sub) {
      this.showPopper = false
      this.$dlg.modal({
        title: 'figure',
        callback: (data) => {
          if (!data.figure) return
          if (!sub.figure) {
            this.$set(sub, 'figure', [])
          }
          data.figure.map((item) => {
            let figure = {
              id: item.id,
              title: item.title,
              name: item.name
            }
            sub.figure.push(figure)
          })
        }
      }, LinkFigure)
    },
    deleteInfo (sub, index) {
      sub.info.splice(index, 1)
      if (sub.info.length === 0) {
        this.$delete(sub, 'info')
      }
    },
    deleteFigure (sub, index) {
      sub.figure.splice(index, 1)
      if (sub.figure.length === 0) {
        this.$delete(sub, 'figure')
      }
    },
    selectImg (e, subIndex) {
      this.$util.imgUploader().then((res) => {
        res.index = subIndex
        const img = this.imgs.find((img) => img.index === subIndex)
        if (img) {
          // sub已有图片
          const index = this.imgs.indexOf(img)
          this.imgs.splice(index, 1, res)
        } else {
          // sub没有图片
          this.imgs.push(res)
          this.imgs.sort((a, b) => a.index - b.index)
        }
      })
    },
    deleteImg (subIndex, index) {
      if (this.imgs[index].index === subIndex) {
        this.imgs.splice(index, 1)
      }
    },
    hasImg (subIndex) {
      return !!this.imgs.find((img) => img.index === subIndex)
    },
    save () {
      const work = this.work
      work.type = this.$route.path.split('/')[1]
      work.subType = this.$route.path.split('/')[2]
      this.$api.work.add(this.work).then((res) => {
        const formData = new FormData()
        this.imgs.forEach(item => {
          formData.append('imgs', item.file)
          formData.append('ids[]', res[item.index])
        })
        this.$api.img.adds(formData).then((res) => {
          this.cancel()
        }).catch((err) => {
          this.$dlg.alert(err.msg)
        })
      }).catch((err) => {
        this.$dlg.alert(err.msg)
      })
    },
    cancel () {
      this.show = false
      this.work = {
        rank: false,
        name: '',
        sub: []
      }
    },
    select (index) {
      // 被选中 sub 在 selected 数组中的下标，用于从 selected 删除
      const i = this.selected.indexOf(index)
      if (i === -1) {
        this.selected.push(index)
      } else {
        this.selected.splice(i, 1)
      }
    },
    del () {
      this.selected.forEach((item) => {
        this.$delete(this.work.sub, item)
      })
      this.selected = []
    },
    rank (e) {
      if (this.work.rank === true) {
        this.work.rank = false
        e.target.style.opacity = '0.5'
      } else {
        this.work.rank = true
        e.target.style.opacity = '1'
      }
    },
    tag (e, sub, tag) {
      if (!sub.tag) {
        this.$set(sub, 'tag', [])
      }
      let i = sub.tag.indexOf(tag)
      if (i !== -1) {
        // 删除 tag
        sub.tag.splice(i, 1)
        e.target.style.opacity = '0.5'
      } else {
        // 添加 tag
        sub.tag.push(tag)
        e.target.style.opacity = '1'
      }
      if (!sub.tag.length) {
        this.$delete(sub, 'tag')
      }
    },
    secret (e, sub) {
      if (sub.secret === true) {
        sub.secret = false
        e.target.style.opacity = '0.5'
      } else {
        sub.secret = true
        e.target.style.opacity = '1'
      }
    }
  },
  components: {
    Popover
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .addWork
    .addWorkBtn
      font-size: 30px
      line-height: 50px
      height: 50px
      text-align: center
      background-color: $menuBgColor
    .work
      display: flex
      justify-content:center
      position: relative
      background-color: $menuBgColor
      .rank
        margin-top: 25px
        width: 80px
        span
          padding: 0 5px 0 0
          font-size: 20px
          opacity: 0.5
      .content
        padding: 25px 0
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
      .images
        width: 660px
        display: flex
        flex-wrap: wrap
        align-content: flex-start
        .image
          flex: 0 0 auto
          width: 220px
          height: $itemHeight
          .inner
            position: relative
            overflow: hidden
            height: $itemHeight - 10
            margin: 5px 0
            &:hover
              .mask
                div
                  opacity: 0.5
                i
                  display: inline
            .mask
              position: absolute
              top: 0
              bottom: 0
              left: 0
              right: 0
              text-align: center
              div
                height: 100%
                background-color: #000
                transition: opacity .5s
                opacity: 0
              i
                position: absolute
                display: none
                line-height: $itemHeight - 10
                font-size: 20px
                color: #ccc
                z-index: 10
            img
              width: 220px
      .btns
        position: absolute
        right: 0
        top: 0
        bottom: 0
        .btn
          float: right
          width: 100px
          height: 100%
          display: flex
          justify-content: center
          align-items: center
          input
            color: $fontColor
            font-size: 16px
            background-color: transparent
          &:hover
            background-color: transparent
            input
              background-color: transparent
</style>
