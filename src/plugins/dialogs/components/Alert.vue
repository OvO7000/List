<template>
  <div>
    <div dialog="v-dialog" tabindex="-1" :class="['v-dialog']"
         :style="[{'z-index':dialogZIndex}]" @click.self="outsideClick">

      <div class="v-dialog-dialog v-dialog-alert">
        <transition name="v-dialog--candy" :appear="true">
          <div :class="['v-dialog-content', alertShadow]" v-show="show">

            <div class="v-dialog-center">
              <div class="v-dialog-header" ref="header" v-if="titleBar !== false">
                <h3 v-text="titleBar"></h3>
              </div>
              <div class="v-dialog-body">
                <div class="v-dialog-alert__content" v-html="message"></div>
              </div>
            </div>
            <button type="button" ref="btnOk"
                    class="v-dialog-btn__confirm"
                    v-text="i18n.btnConfirm"
                    @click="closeDialog(false)">
            </button>
            <button type="button"
                    class="v-dialog-btn__cancel"
                    @click="closeDialog(true)"
                    v-text="i18n.btnCancel"
                    v-if="messageType === 'confirm' || messageType === 'inputConfirm'">
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
import { messageTypes } from '../constants'
import mixins from '../mixins'

export default {
  name: 'DialogAlert',
  mixins: [mixins],
  props: {
    /**
     * Dialog message type (work on alert, toast mode)
     * @type string
     * @enum 'info' - default
     * @enum 'warning'
     * @enum 'error'
     * @enum 'success'
     * @enum 'confirm'
     */
    messageType: {
      type: String,
      default: messageTypes.info
    },
    iconClassName: String,
    /**
     * Specified a key to make dialog singleton
     * @type string
     */
    singletonKey: String
  },
  computed: {
    alertShadow () {
      switch (this.messageType) {
        case messageTypes.warning:
          return 'v-dialog__shadow--warning'
        case messageTypes.error:
          return 'v-dialog__shadow--error'
        case messageTypes.success:
          return 'v-dialog__shadow--success'
        default:
          return ''
      }
    }
  }
}
</script>
