<template>
    <div class="work">
        work {{id}}
    </div>
</template>

<script>
export default {
  name: 'work',
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
