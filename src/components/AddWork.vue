<template>
  <div class="addWork">
    <div class="container">
      <label class="rank">
        <input type="checkbox" v-model="work.rank" name="rank"><span>Rank?</span>
      </label>
      <div class="content">
        <input type="text" placeholder="name" v-model="work.name">
        <!--sub-->
        <div
          class="sub"
          v-for="item in work.sub"
          :key="item.name"
        >
          <input type="text" placeholder="name" v-model="item.name">
          <input type="text" placeholder="origin name" v-model="item.originName">
          <label>
            <input type="checkbox" v-model="item.secret" name="secret">Secret
          </label>
        </div>
      </div>
    </div>
    <!--submit-->
    <div class="btn">
      <input type="submit" value="save" @click="addWork">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddWork',
  data () {
    return {
      work: {
        rank: true,
        name: '',
        sub: [
          {
            name: '',
            originName: '',
            info: [],
            tag: [],
            secret: false,
            img: ''
          }
        ]
      }
    }
  },
  methods: {
    addWork () {
      const work = this.work
      work.type = this.$route.path.split('/')[1]
      work.subType = this.$route.path.split('/')[2]
      this.$api.work.addWork(this.work).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .addWork
    position: relative
    background-color: $menuBgColor
  .container
    position: relative
    margin: 0 auto
    width: 60%
    .rank
      position: absolute
      left: 0
      top: 25px
      input
        border: none
        background-color: #fff
      span
        font-size: 20px
        line-height: 30px
    .content
      padding: 25px 100px
  .btn
    position: absolute
    right: 0
    top: 25px
    bottom: 25px
    width: 20%
    color: $fontColor
    input
      display: block
      width: 100%
      height: 100%
      color: $fontColor
      font-size: 16px
      background-color: $menuBgColor
      &:hover
        background-color: $mainColor
</style>
