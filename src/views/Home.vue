<template>
  <div class="home">
    <span>test</span>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <input type="text" placeholder="test">
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
