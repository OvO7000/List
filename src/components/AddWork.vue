<template>
  <div class="addWork">
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
    <div class="imgs">
      <div>+</div>
    </div>
    <!--submit-->
    <div class="btn">
      <div class="save"  @click="addWork">
        <input type="submit" value="save">
      </div>
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
    display: flex
    justify-content:center
    position: relative
    background-color: $menuBgColor
    .rank
      margin-top: 25px
      width: 100px
      input
        width: 20px
        height: 20px
        border: 1px solid #ccc
        background-color: $menuBgColor
        -webkit-appearance: none
      span
        font-size: 20px
        line-height: 30px
    .content
      padding: 25px 0
      width: 400px
    .imgs
      width: 660px
    .btn
      position: absolute
      right: 0
      top: 0
      bottom: 0
      .save
        width: 100px
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        input
          color: $fontColor
          font-size: 16px
          background-color: $menuBgColor
        &:hover
          background-color: $mainColor
          input
            background-color: $mainColor
</style>
