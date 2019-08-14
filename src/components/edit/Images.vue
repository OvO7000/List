<template>
  <div class="images">
    <div
      class="image"
      v-for="(img, index) in edit.imgs"
      :key="index"
    >
      <div class="inner" v-if="img.base64 || img.resized">
        <div
          class="mask"
          @click="deleteImg(img, index)"
          v-if="type === 'work'"
        >
          <i class="fa fa-times"></i>
          <div></div>
        </div>
        <img :src="img.base64 || img.resized">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EImages',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    edit () {
      return this.$store.getters.edit(this.id)
    },
    type () {
      return this.$route.path.split('/')[1]
    }
  },
  methods: {
    deleteImg (img, index) {
      const edit = Object.assign({}, this.edit)
      if (edit.imgs[index].id) {
        // 删除已保存的图片
        delete edit.imgs[index].compressed
      } else {
        // 删除未保存的图片
        edit.imgs.splice(index, 1)
      }
      this.$store.dispatch('setEdit', edit)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .images
    width: 660px
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    .image
      flex: 0 0 auto
      height: $itemHeight
      .inner
        position: relative
        overflow: hidden
        width: 220px
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
</style>
