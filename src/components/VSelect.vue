<template>
    <div class="v-select">
      <div class="input" @click="show">
        <input
          type="text"
          class="text"
          :value="label"
          :style="{'height':height+'px'}"
          :placeholder="placeholder">
        <div class="arrow" :style="{'height':height+'px'}">
          <div :style="{'top':(height-8)*0.5+'px'}"></div>
        </div>
      </div>
      <TransitionSlide>
        <div class="options" v-show="visible" :style="{'top':(height+2)+'px'}">
          <slot></slot>
        </div>
      </TransitionSlide>
    </div>
</template>

<script>
import TransitionSlide from 'components/Slide'

export default {
  name: 'VSelect',
  componentName: 'VSelect',
  props: {
    value: {
      type: String
    },
    height: {
      type: Number,
      default: 24
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      visible: false,
      label: ''
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  },
  created () {
    this.$on('select', (params) => {
      this.label = params.label
      this.$emit('input', params.value)
      this.visible = false
    })
  },
  components: {
    TransitionSlide
  }
}
</script>

<style lang="stylus" scoped>
.v-select
  display: inline-block
  position: relative
  width: 100%
  .input
    position: relative
    .text
      width: 100%
      font-size: 16px
      color: #ccc
      text-align: center
      border-bottom: 1px solid #ccc
    .arrow
      position: absolute
      top: 0
      right: 0
      width: 20px
      div
        position: absolute
        left: 6px
        width: 0
        height: 0
        border-width: 4px 4px 0
        border-style: solid
        border-color: #ccc transparent transparent
  .options
    position: absolute
    width: 100%
    background-color: #717171
</style>
