<template>
   <div class="btns">
     <div class="save btn"  @click.stop="save">
       <input type="submit" value="save">
     </div>
     <div class="cancel btn"  @click.stop="cancel">
       <input type="submit" value="cancel">
     </div>
     <div class="delete btn"  @click.stop="del">
       <input type="submit" value="delete">
     </div>
   </div>
</template>

<script>
export default {
  name: 'Btns',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    edit () {
      return this.$store.getters.edit(this.id)
    }
  },
  methods: {
    delete () {
      this.$dlg.alert(
        '确认删除？',
        () => {
          this.$api.figure.del(this.id).then(() => {
            this.$store.dispatch('deleteAll', this.id)
          })
        },
        { messageType: 'confirm' }
      )
    },
    cancel () {
      this.$store.dispatch('delEdit', this.id)
    },
    save () {
      const edit = this.edit
      edit.item.work = edit.item.work.map(work => work.id)
      this.$api.figure.edit(edit.id, edit.item).then(async (res) => {
        edit.item.imgs = edit.imgs
        this.$api.figure.single(edit.id).then(res => {
          this.$store.dispatch('setItem', res)
          this.$store.dispatch('delEdit', edit.id)
        }).catch(err => {
          this.$dlg.toast(err.msg)
        })
      }).catch(err => {
        this.$dlg.toast(err.msg)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'

  .btns
    position: absolute
    right: 0
    top: 0
    bottom: 0
    .btn
      float: right
      width: 100px
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      input
        color: $fontColor
        font-size: 16px
        background-color: transparent
      &:hover
        background-color: transparent
        input
          background-color: transparent
</style>
