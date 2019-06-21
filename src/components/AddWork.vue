<template>
  <div class="addWork">
    <label class="rank" @click="test">
      <span @click="rank">#</span>
    </label>
    <div class="content">
        ><input type="text" placeholder="name" v-model="work.name" class="name">
        <!--sub-->
        <div
          class="sub"
          v-for="item in work.sub"
          :key="item.name"
        >
          <div class="subNameContainer">
            ><input type="text" placeholder="name" v-model="item.name" class="subName">
            ><input type="text" placeholder="(O)" v-model="item.originName" class="originName">
          </div>

          <label>
            <input type="checkbox" v-model="item.secret" name="secret" @click="alert">Secret
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
        rank: false,
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
      },
      sub: {
        name: '',
        originName: '',
        info: [],
        tag: [],
        secret: false,
        img: ''
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
    test () {
      // const that = this
      this.$dlg.alert('tetesttesttesttesttesttesttestst', {
        title: 'test',
        params: {
          name: 'null',
          originName: 'test'
        }
      })
    },
    alert () {
      this.$dlg.modal({
        title: 'test',
        params: {
          name: 'null',
          originName: 'test'
        }
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
    input[type='text']::before
      content: ">"
      display: block
      color: #000
    .rank
      margin-top: 25px
      width: 100px
      span
        padding: 0 5px 0 0
        font-size: 20px
        opacity: 0.5
    .content
      padding: 25px 0
      width: 400px
      input
      .name
        font-size: 16px
        line-height: 30px
      .sub
        padding-top: 25px
        .subNameContainer
          display: flex
          font-size: 16px
          line-height: 30px
          .subName
            flex: 1 1 auto
          .originName
            flex: 1 0 25px
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
