<template>
  <div class="home">
    <Header></Header>
    <Poster v-if="poster.show"></Poster>
    <AddWork v-if="type==='work' && level===2"></AddWork>
    <AddFigure v-if="type==='figure' && level===2"></AddFigure>
    <router-view
      v-for="(info, index) in infos"
      :key="info.id"
      :id="info.id"
      :index="index+1"
      :name="info.edit?'eItem':'item'"
    ></router-view>
  </div>
</template>

<script>
import Header from 'components/Header'
import AddWork from 'components/AddWork'
import AddFigure from 'components/AddFigure'
import Poster from 'components/Poster'

export default {
  name: 'home',
  data () {
    return {
      showAddBtn: true,
      work: {
      }
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
    }
  },
  components: {
    Header,
    AddWork,
    AddFigure,
    Poster
  }
}
</script>

<style lang="stylus" scoped>
  .home
    padding-top: 60px
    .btn
      font-size: 30px
      line-height: 50px
      height: 50px
      text-align: center
      background-color: $menuBgColor
</style>
