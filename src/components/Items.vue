<template>
    <div id="items">
      test
      {{route.type}}
      {{route.subType}}
    </div>
</template>

<script>
export default {
  name: 'Items',
  computed: {
    route () {
      return {
        type: this.$route.params.type,
        subType: this.$route.params.subType
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #items
    margin-top: 60px
</style>
