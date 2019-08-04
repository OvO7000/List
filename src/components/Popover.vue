<template>
  <div class="popover">
    <div class="reference" @click.stop="toggle">
      <slot name="reference"></slot>
    </div>
    <div class="popper" v-show="visible" ref="popper">
      <div class="arrow" ref="arrow"></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  watch: {
    value: function (val) {
      if (val === false) {
        this.visible = val
      }
    },
    visible: function (val) {
      if (val === true) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    }
  },
  updated () {
    let referenceHeight = this.$slots.reference[0].elm.offsetHeight
    let referenceWidth = this.$slots.reference[0].elm.offsetWidth
    let popperWidth = this.$refs.popper.offsetWidth
    let offset = 10
    this.$refs.popper.style.top = referenceHeight + offset + 'px'
    this.$refs.popper.style.left = 0.5 * (referenceWidth - popperWidth) + 'px'
    this.$refs.arrow.style.left = (0.5 * popperWidth - 4) + 'px'
  }
}
</script>

<style lang="stylus" scoped>
.popover
  display: inline-block
  position: relative
  .popper
    position: absolute
    z-index: 2000
    .arrow
      position: absolute
      top: -4px
      width: 0
      height: 0
      border-width: 0 4px 4px
      border-style: solid
      border-color: transparent transparent #000
    .content
      padding: 10px
      background: #000
      border: 1px solid #000
</style>
