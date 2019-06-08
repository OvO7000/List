<template>
    <div class="images">images {{id}}</div>
</template>

<script>
export default {
  name: 'Images',
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
