<input>
  <input type="checkbox" class="checkBox" @click="check"><></input>
</template>

<script>
export default {
  name: 'Checkbox',
  data () {
    return {
      checked: false
    }
  },
  methods: {
    check () {
      this.checked = !this.checked
    }
  }
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
