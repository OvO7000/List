<template>
   <div class="btns">
     <div class="save btn"  @click.stop="save">
       <input type="submit" value="save">
     </div>
     <div class="cancel btn"  @click.stop="deleteAll">
       <input type="submit" value="deleteAll">
     </div>
     <div class="delete btn"  @click.stop="del">
       <input type="submit" value="delete">
     </div>
     <div class="add btn"  @click.stop="addSub">
       <input type="submit" value="+">
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
    addSub () {
      const edit = Object.assign({}, this.edit)

      this.$dlg.modal({
        title: 'sub',
        params: {
          name: '',
          originName: ''
        },
        callback: (data) => {
          if (!data.name) return
          let sub = {}
          sub.name = data.name
          sub.secret = false
          sub.originName = data.originName

          edit.item.sub.push(sub)
          this.$store.dispatch('setEdit', edit)
        }
      })
    },
    del () {
      const edit = Object.assign({}, this.edit)
      this.$dlg.alert(
        '确认删除？',
        () => {
          for (let item of edit.selected) {
            edit.item.sub.splice(item, 1)
          }
          if (edit.item.sub.length) {
            edit.selected = []
            this.$store.dispatch('setEdit', edit)
          } else {
            this.$api.work.del(this.id).then(() => {
              this.$store.dispatch('deleteAll', this.id)
            })
          }
        },
        {
          messageType: 'confirm'
        }
      )
    },
    deleteAll () {
      this.$dlg.alert(
        '确认删除？',
        () => {
          this.$api.work.del(this.id).then(() => {
            this.$store.dispatch('deleteAll', this.id)
          })
        },
        {
          messageType: 'confirm'
        }
      )
    },
    save () {}
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
