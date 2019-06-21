<template>
    <div class="inputs">
      <div
        v-for="(value, key) in params"
        :key="key">
        <input
          type="text"
          v-model="params[key]"
        >
      </div>
    </div>
</template>

<script>
export default {
  name: 'Inputs',
  props: {
    params: {
      type: Object,
      default () {
        return {
          name: ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.inputs
  width: 300px
  input
    width: 100%
    font-size: 16px
    margin-top: 25px
    color: #ccc
    text-align: center
    border-bottom: 1px solid #ccc
</style>
