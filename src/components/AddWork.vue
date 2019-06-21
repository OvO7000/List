<template>
  <div class="addWork">
    <div class="addWorkBtn" v-if="!show" @click="workName">
      <h3>+</h3>
    </div>
    <div class="work" v-else>
      <label class="rank">
        <span @click="rank">#</span>
      </label>
      <div class="content">
        <p v-text="work.name" class="name"></p>
        <!--sub-->
        <div
          class="sub"
          v-for="(sub, index) in work.sub"
          :key="index"
        >
          <div class="subName">
            <span v-text="sub.name"></span>
            <span v-if="sub.originName"> ( {{sub.originName}} )</span>
          </div>

          <!--info-->
          <div class="infos" v-if="sub.info">
            <i class="icon fa fa-info-circle"></i>
            <a
              class="info"
              v-for="info in sub.info"
              :key="info.name"
              :href="info.href"
              :title="info.title"
            >{{info.name}}</a>
          </div>
          <div class="infos" v-else>
            <i class="icon fa fa-question-circle"></i>
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
              <i title="alert" class="tag fa fa-exclamation" @click.stop="tag($event, index, 0)"></i>
              <i title="not perfect complete" class="tag fa fa-tasks" @click.stop="tag($event, index, 1)"></i>
              <i title="rotten" class="tag fa fa-star-half-o" @click.stop="tag($event, index, 2)"></i>
              <i title="serials" class="tag fa fa-pencil" @click.stop="tag($event, index, 3)"></i>
              <i title="secret" class="tag fa fa-eye-slash" @click.stop="tag($event, index, 4)"></i>
            </span>
          </div>
        </div>
        <div class="addSubBtn" @click="subName">
          <h3>+</h3>
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
  </div>
</template>

<script>
export default {
  name: 'AddWork',
  data () {
    return {
      show: false,
      work: {
        rank: false,
        name: '',
        // adapt: [],
        sub: []
      },
      sub: {
        name: '',
        originName: '',
        // info: [],
        // tag: [],
        secret: false,
        img: ''
      }
    }
  },
  methods: {
    workName () {
      this.$dlg.modal({
        title: 'work',
        params: {
          name: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          this.work.name = data.name
          this.show = true
        }
      })
    },
    subName () {
      this.$dlg.modal({
        title: 'sub',
        params: {
          name: '',
          originName: ''
        },
        callback: (data) => {
          // this.$api.work.exist(data.name).then((res) => {})
          let sub = Object.assign({}, this.sub)
          sub.name = data.name
          sub.originName = data.originName
          this.work.sub.push(sub)
        }
      })
    },
    status (tag) {
      let status = ''
      switch (tag) {
        case 'alert':
          status = 'exclamation-triangle'
          break
        case 'not perfect complete':
          status = 'splotch'
          break
        case 'rotten':
          status = 'star-half'
          break
        case 'serials':
          status = 'pen-square'
          break
      }
      return status
    },
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
    tag (e, index, tag) {
      if (!this.work.sub[index].tag) {
        this.$set(this.work.sub[index], 'tag', [])
      }
      let i = this.work.sub[index].tag.indexOf(tag)
      if (i !== -1) {
        // 删除 tag
        this.work.sub[index].tag.splice(i, 1)
        e.target.style.opacity = '0.5'
      } else {
        // 添加 tag
        this.work.sub[index].tag.push(tag)
        e.target.style.opacity = '1'
      }
      if (!this.work.sub[index].tag.length) {
        this.$delete(this.work.sub[index], 'tag')
      }
    },
    secret (e, index) {
      console.log(index)
      if (this.work.sub[index].secret === true) {
        this.work.sub[index].secret = false
        this.$refs.icon5.style.opacity = '0.5'
      } else {
        this.work.sub[index].secret = true
        this.$refs.icon5.style.opacity = '1'
      }
      console.log(this.work.sub[index].secret)
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
        width: 100px
        span
          padding: 0 5px 0 0
          font-size: 20px
          opacity: 0.5
      .content
        padding: 25px 0
        width: 400px
        .addSubBtn
          font-size: 16px
          line-height: 30px
          text-align: center
          &:hover
            background-color: $mainColor
        .name
          font-size: 16px
          line-height: 30px
        .sub
          height: 105px
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
            margin-left: 20px
            font-size: 14px
            .tag
              opacity: 0.5
              display: inline-block
              padding-right: 15px
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
