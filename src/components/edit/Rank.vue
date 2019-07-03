<template>
  <label class="rank">
    <span v-if="type==='figure'">#{{index}}</span>
    <span
      v-if="type==='work'"
      @click.stop="isRank"
      :style="{ opacity: edit.item.rank?1:0.5 }"
    >#{{edit.item.rank?index:''}}</span>
  </label>
</template>

<script>
export default {
  name: 'Rank',
  props: {
    id: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    type () {
      return this.$route.path.split('/')[1]
    },
    edit () {
      return this.$store.getters.edit(this.id)
    }
  },
  methods: {
    isRank () {
      let edit = Object.assign({}, this.edit)
      edit.item.rank = !edit.item.rank
      this.$store.dispatch('setEdit', edit)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .rank
    margin-top: 25px
    width: 80px
    span
      padding: 0 5px 0 0
      font-size: 20px
      opacity: 0.5
</style>
