<template>
  <div class="radio" @click="check" :style="radioStyle">
    <font-awesome-icon
      icon="check"
      class="icon"
      :style="iconStyle"
    />
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    option: {
      type: Object
    }
  },
  data () {
    return {
      radioStyle: {
        width: this.option.size || '14px',
        height: this.option.size || '14px',
        borderColor: this.option.color || '#ccc'
      }
    }
  },
  computed: {
    iconStyle () {
      return {
        fontSize: this.option.size || '14px',
        color: this.option.color || '#ccc',
        opacity: Number(this.value)
      }
    }
  },
  methods: {
    check () {
      this.checked = !this.value
      this.$emit('input', this.checked)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radio
    display: inline-block
    border: 1px solid #000
    border-radius: 3px
    line-height: 20px
    vertical-align: baseline
</style>
