<template>
   <div class="btns">
     <div class="save btn"  @click.stop="save">
       <input type="submit" value="save">
     </div>
     <div class="cancel btn"  @click.stop="cancel">
       <input type="submit" value="cancel">
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
          sub.originName = data.originName
          sub.secret = false
          if (sub.originName === '') {
            delete sub.originName
          }
          this.$api.sub.add({ ...sub, work: edit.id }).then((res) => {
            sub.id = res
            edit.item.sub.push(sub)
            this.$store.dispatch('setEdit', edit)
          })
        }
      })
    },
    del () {
      const edit = Object.assign({}, this.edit)
      this.$dlg.alert(
        '确认删除？',
        () => {
          if (edit.item.sub.length === edit.selected.length) {
            this.$api.work.del(this.id).then(() => {
              this.$store.dispatch('deleteAll', this.id)
            })
          } else {
            this.$api.sub.del(edit.selected).then((res) => {
              for (let item of edit.selected) {
                const index = edit.item.sub.findIndex(sub => sub.id === item)
                const imgIndex = edit.imgs.findIndex(img => img.sub === item)
                edit.item.sub.splice(index, 1)
                edit.imgs.splice(imgIndex, 1)
              }
              edit.selected = []
              this.$store.dispatch('setEdit', edit)
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
        { messageType: 'confirm' }
      )
    },
    cancel () {
      this.$store.dispatch('delEdit', this.id)
    },
    save () {
      let item = JSON.parse(JSON.stringify(this.edit.item))
      item.sub = item.sub.map(sub => {
        sub.figure && sub.figure.length && (sub.figure = sub.figure.map(figure => figure.id))
        return sub
      })
      if (item.adapt.works) {
        delete item.adapt.works
      }
      this.$api.work.edit(this.id, item).then(async (res) => {
        let imgsHandle = this.edit.imgs.map(async (img) => {
          // 新增图片，没有id，有file
          if (img.file && !img.id) {
            let formData = new FormData()
            formData.append('img', img.file)
            formData.append('sub', img.sub)
            let result = await this.$api.img.add(formData)
            return result
          }
          // 修改图片，有id，有file
          if (img.file && img.id) {
            let formData = new FormData()
            formData.append('img', img.file)
            formData.append('id', img.id)
            formData.append('sub', img.sub)
            let result = await this.$api.img.edit(img.id, formData)
            return result
          }
          // 删除图片， 有id，没有file、compressed
          if (img.id && !img.file && !img.compressed) {
            await this.$api.img.del(img.id)
          }
          if (img.id && img.compressed) {
            return img
          }
        })

        let result = await Promise.all(imgsHandle)

        this.edit.item.imgs = result.filter(item => item instanceof Object)
        this.$store.dispatch('setItem', this.edit.item)
        this.$store.dispatch('delEdit', this.edit.id)
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
