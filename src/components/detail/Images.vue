<template>
    <div class="images">
      <div
        class="image"
        v-for="img in imgs"
        :key="img.id"
        @click.stop="showPoster(img)"
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
      type: String,
      required: true
    }
  },
  computed: {
    imgs () {
      return this.$store.getters.imgs(this.id)
    }
  },
  methods: {
    showPoster (img) {
      this.$store.dispatch('setPoster', img.compressed)
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
      width: 220px
      height: $itemHeight
      .inner
        overflow: hidden
        height: $itemHeight - 10
        margin: 5px 0
        img
          width: 220px
</style>
