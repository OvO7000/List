<template>
  <div class="user" @click.stop="login">
    <i :class="['status', 'fa', icon]" ref="status"></i>
  </div>
</template>

<script>
export default {
  name: 'User',
  computed: {
    info () {
      return this.$store.state.user
    },
    icon () {
      if (this.info.level === 1) return 'fa-eye'
      else if (this.info.level === 2) return 'fa-exclamation-triangle'
      else return 'fa-bug'
    }
  },
  methods: {
    login () {
      this.$refs.status.style.fontSize = '22px'
      setTimeout(() => {
        this.$refs.status.style.fontSize = '18px'
      }, 100)
      if (this.info.level !== 0) {
        this.$store.dispatch('logOut')
      } else {
        this.$dlg.modal({
          title: 'login',
          params: {
            name: '',
            password: ''
          },
          callback: (data) => {
            if (!data.name || !data.password) return
            this.$store.dispatch('getUser', data)
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user
    position: absolute
    top: 15px
    right: 0
    width: 30px
    height: 30px
    text-align: center
    line-height: 30px
    cursor: pointer
    .status
      vertical-align: middle
      font-size: 18px
</style>
