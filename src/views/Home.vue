<template>
  <div class="home">
    <Header></Header>
    <Item
      v-for="(id, index) in ids"
      :key="id"
      :id="id"
      :index="index+1"
    ></Item>
  </div>
</template>

<script>
import Header from 'components/Header'
import Item from 'components/Item'

export default {
  name: 'home',
  computed: {
    type () {
      return this.$route.path.split('/')[1]
    },
    subType () {
      return this.$route.path.split('/')[2]
    },
    ids () {
      return this.$store.getters.ids
    }
  },
  components: {
    Header,
    Item
  }
}
</script>

<style lang="stylus" scoped>
  .home
    padding-top: 60px
</style>
