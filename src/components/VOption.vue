<template>
  <div class="v-option" @click.stop="select">
    <span v-text="label"></span>
  </div>
</template>

<script>
import Emitter from 'mixins/emitter'

export default {
  name: 'VOption',
  componentName: 'VOption',
  mixins: [Emitter],
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    }
  },
  methods: {
    select () {
      const params = {
        value: this.value,
        label: this.label
      }
      this.dispatch('VSelect', 'select', params)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-option
    height: 24px
    text-align: center
    span
      height: 24px
      line-height: 24px
      font-size: 16px
      color: #ccc
</style>
