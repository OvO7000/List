<template>
  <div>
    <div dialog="v-dialog" tabindex="-1" :class="classes" :style="[{'z-index':dialogZIndex}]"
         @click.self="outsideClick">

      <div :class="['v-dialog-dialog v-dialog-modal', {'v-dialog-default-animated': animate}]">
        <transition name="v-dialog--smooth" :appear="true">
          <div :class="['v-dialog-content']" v-show="show">
            <button
              type="button"
              class="v-dialog-btn__close"
              v-if="dialogCloseButton"
              @click="closeDialog(true)">
              <span v-text="i18n.btnCancel"></span>
            </button>
            <div class="v-dialog-center">
              <div class="v-dialog-header" ref="header" v-if="titleBar !== false">
                <h3 v-text="titleBar"></h3>
              </div>
              <div class="v-dialog-body">
                <component :is="component" :params.sync="params" @close="modalClose"></component>
              </div>
            </div>
            <button type="button" class="v-dialog-btn__confirm"
                    v-if="dialogConfirmButton" @click="confirm">
              <span v-text="i18n.btnConfirm"></span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <transition name="v-dialog--fade" :appear="true">
      <div class="v-dialog-overlay" :style="{'z-index':backdropZIndex}" v-if="backdrop && show"></div>
    </transition>
  </div>
</template>

<script>
import mixins from '../mixins'
import Inputs from './Inputs'

export default {
  name: 'DialogModal',
  mixins: [mixins],
  props: {
    component: {
      type: Object,
      default () {
        return Inputs
      }
    },
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * Full screen dialog
     * @type boolean
     */
    fullWidth: {
      type: Boolean,
      default: false
    },
    dialogConfirmButton: {
      type: Boolean,
      default: true
    },
    dialogCloseButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // maximize: false,
      animate: false
    }
  },
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog-modal': true,
        'v-dialog-my': true,
        // 'v-dialog--maximize': this.maximize,
        'v-dialog--buzz-out': this.shake
      }
    }
  },
  methods: {
    modalClose (data) {
      this.closeDialog(false, data)
    },
    confirm () {
      this.closeDialog(false, this.params)
    }
  }
  // mounted(){
  //   this.$nextTick(()=>{
  //     if(this.titleBar){
  //       const headerHeight = this.$refs.header.offsetHeight;//this.$refs.header.getBoundingClientRect().height;
  //       this.bodyHeight = this.height - headerHeight;
  //     }else this.bodyHeight = this.height;
  //     this.adjust()
  //   });
  // }
}
</script>
