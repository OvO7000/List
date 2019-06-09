<template>
    <div class="images">
      <div
        class="image"
        v-for="img in imgs"
        :key="img.id"
      >
        <div class="inner">
          <img :src="img.compressed" :alt="img.title" :title="img.title">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Images',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    imgs () {
      return this.$store.getters.imgs(this.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .images
    width: 660px
    .image
      width: 220px
      height: $itemHeight
      float: left
      .inner
        overflow: hidden
        height: $itemHeight - 10
        margin: 5px 0
      img
        width: 250px
</style>
