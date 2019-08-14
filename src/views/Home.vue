<template>
  <div class="home" @wheel="handleScroll">
    <Header></Header>
    <Poster v-if="poster.show"></Poster>
    <Loading v-if="loadingTop"></Loading>
    <AddWork v-if="type==='work' && level===2"></AddWork>
    <AddFigure v-if="type==='figure' && level===2"></AddFigure>
    <router-view
      v-for="(info, index) in infos"
      :key="info.id"
      :id="info.id"
      :index="index+1"
      :name="info.edit?'eItem':'item'"
    ></router-view>
    <Loading v-if="loadingBottom"></Loading>
  </div>
</template>

<script>
import Header from 'components/Header'
import AddWork from 'components/AddWork'
import AddFigure from 'components/AddFigure'
import Poster from 'components/Poster'
import Loading from 'components/Loading'

export default {
  name: 'home',
  data () {
    return {
      showAddBtn: true,
      loadingTop: false,
      loadingBottom: false,
      work: {
      },
      loading: false
    }
  },
  computed: {
    type () {
      return this.$route.path.split('/')[1]
    },
    infos () {
      return this.$store.getters.info
    },
    level () {
      return this.$store.state.user.level
    },
    poster () {
      return this.$store.state.poster
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

          let sub = Object.assign({}, this.sub)
          sub.name = data.name
          if (data.originName) {
            sub.originName = data.originName
          }

          this.work.sub.push(sub)
          this.show = true
        }
      })
    },
    handleScroll (e) {
      let that = this
      let innerHeight = document.documentElement.offsetHeight
      // 滚动条距离顶部的距离
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      // 滚动条高度
      let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
      // 向下滚动
      if (!this.loading && e.deltaY > 0 && (scrollTop + scrollHeight >= innerHeight)) {
        console.log('b')
        this.loading = true
        this.loadingBottom = true
        this.$store.dispatch('getItems', 1).then(() => {
          this.loadingBottom = false
          setTimeout(function () { that.loading = false }, 2000)
        }).catch(err => {
          this.loadingBottom = false
          setTimeout(function () { that.loading = false }, 2000)
          this.$dlg.toast(err.msg)
        })
      } else if (!this.loading && e.deltaY < 0 && scrollTop === 0) {
        console.log('top')
        this.loading = true
        this.loadingTop = true
        this.$store.dispatch('getItems', 0).then(() => {
          console.log('result')
          this.loadingTop = false
          setTimeout(function () { that.loading = false }, 2000)
        }).catch(err => {
          setTimeout(function () { that.loading = false }, 2000)
          this.loadingTop = false
          this.$dlg.toast(err.msg)
        })
      }
    }
  },
  components: {
    Header,
    AddWork,
    AddFigure,
    Poster,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  .home
    height: 100%
    box-sizing: border-box
    padding-top: 60px
    .btn
      font-size: 30px
      line-height: 50px
      height: 50px
      text-align: center
      background-color: $menuBgColor
</style>
