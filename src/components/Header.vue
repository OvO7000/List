<template>
  <div class="header">
    <div class="container">
      <font-awesome-icon :icon="status" class="iconStatus"></font-awesome-icon>
    </div>
    <div class="menu">
      <div class="container">
        <ul>
          <li v-for=""><a href="#">漫画</a></li>
          <li><a href="#">动画</a></li>
          <li><a href="#"></a></li>
          <li><a href="#">漫画家</a></li>
          <li><a href="#">作家</a></li>
          <li>
            <div class="search">
              <input type="text">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    status: () => {
      return 'crow'
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
