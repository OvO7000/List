<template>
  <div class="loading">
    <i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="stylus" scoped>
  .loading
    display: flex
    height: 50px
    width: 100%
    justify-content: center
    align-items: center
</style>
