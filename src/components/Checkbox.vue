<template>
  <div class="checkbox">
    <div v-if="checked">
      <input type="checkbox" class="checked">
    </div>
    <div v-else>
      <input type="checkbox" class="notChecked">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox'
}
</script>

<style lang="stylus" scoped>
  .checkbox
    input
      width: 16px;
      height: 16px;
      border: 1px solid #ccc;
      background-color: #797979;
      -webkit-appearance: none;
</style>
