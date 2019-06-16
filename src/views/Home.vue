<template>
  <div class="home">
    <Header></Header>
    <AddWork></AddWork>
    <Item
      v-for="(id, index) in ids"
      :key="id"
      :id="id"
      :index="index+1"
    ></Item>
    <Checkbox></Checkbox>
  </div>
</template>

<script>
import Header from 'components/Header'
import Item from 'components/Item'
// import Test from 'components/Test'
import AddWork from 'components/AddWork'
import Checkbox from 'components/Checkbox'

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
    Item,
    // Test,
    AddWork,
    Checkbox
  }
}
</script>

<style lang="stylus" scoped>
  .home
    padding-top: 60px
</style>
