<template>
  <div class="addFigure">
    <div class="addFigureBtn" v-if="!show" @click="addFigure">
      <h3>+</h3>
    </div>
    <div class="figure" v-else>
      <label class="rank">
        <span>#</span>
      </label>
      <!--figure-->
      <div class="content">
        <!--name-->
        <div class="name" @click.stop="editName()">
          <span>{{figure.name}}</span>
          <span v-if="figure.originName"> ( {{figure.originName}} )</span>
        </div>
        <!--work-->
        <div class="works" v-if="figure.work">
          <i class="icon fa fa-star" @click.stop="addWork"></i>
          <a
            class="work"
            v-for="(work, index) in figure.work"
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
        <div class="links" v-if="figure.link" @click.stop="addLink">
          <i class="icon fa fa-chain"></i>
          <a
            class="link"
            v-for="(link, index) in figure.link"
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
              <i title="secret" class="tag fa fa-eye-slash" :style="{'opacity': (figure.secret===true)?1:0.5}" @click.stop="secret"></i>
            </span>
        </div>
      </div>
      <div class="images">
        <div
          class="image"
          v-for="(img, index) in imgs"
          :key="index"
        >
          <div class="inner">
            <img :src="img.compressed">
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
      </div>
    </div>
  </div>
</template>

<script>
import Link from 'components/Link'

export default {
  name: 'AddFigure',
  data () {
    return {
      show: false,
      figure: {
        name: '',
        secret: false
      },
      imgs: [],
      selected: []
    }
  },
  methods: {
    addFigure () {
      this.$dlg.modal({
        title: 'figure',
        params: {
          name: '',
          originName: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          // 没有输入名字
          if (!data.name) return
          this.figure.name = data.name
          if (data.originName && data.originName !== '') {
            this.$set(this.figure, 'originName', data.originName)
          }
          this.show = true
        }
      })
    },
    editName () {
      this.$dlg.modal({
        title: 'figure',
        params: {
          name: this.figure.name,
          originName: this.figure.originName || ''
        },
        callback: (data) => {
          // this.$api.figure.exist(this.figure.name).then((res) => {})
          if (!data.name) return
          this.figure.name = data.name
          if (data.originName && data.originName !== '') {
            this.$set(this.figure, 'originName', data.originName)
          }
        }
      })
    },
    addWork () {
      this.$dlg.modal({
        title: 'work',
        callback: (data) => {
          if (!data.sub) return
          if (!this.figure.work) {
            this.$set(this.figure, 'work', [])
          }
          data.sub.map((item, index) => {
            let work = {
              id: item.id,
              subType: item.subType,
              name: item.name
            }
            let img = {
              compressed: item.img,
              work: item.id
            }
            this.figure.work.push(work)
            this.imgs.push(img)
          })
        }
      }, Link)
    },
    deleteWork (work, index) {
      this.figure.work.splice(index, 1)
      let imgIndex = this.imgs.findIndex(item => item.id === work.id)
      this.figure.imgs.splice(imgIndex, 1)
    },
    addLink () {
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
          if (!this.figure.link) {
            this.$set(this.figure, 'link', [])
          }
          this.figure.link.push(link)
        }
      })
    },
    deleteLink (index) {
      this.figure.link.splice(index, 1)
    },
    save () {
      const figure = this.figure
      figure.subType = this.$route.path.split('/')[2]
      figure.work && (figure.work = figure.work.map(work => work.id))
      this.$api.figure.add(this.figure).then((res) => {
        this.$store.dispatch('setItems', [res])
        this.cancel()
      }).catch((err) => {
        this.$dlg.alert(err.msg)
      })
    },
    cancel () {
      this.show = false
      this.figure = {
        secret: false,
        name: '',
        work: [],
        link: []
      }
    },
    secret () {
      if (this.figure.secret === true) {
        this.figure.secret = false
      } else {
        this.figure.secret = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .addFigure
    .addFigureBtn
      font-size: 30px
      line-height: 50px
      height: 50px
      text-align: center
      background-color: $menuBgColor
    .figure
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
