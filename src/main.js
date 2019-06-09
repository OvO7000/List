// VUE
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// CSS
import 'normalize.css'
import 'styles/reset.styl'
import 'styles/base.styl'
import 'styles/variables.styl'
import 'styles/mixins.styl'
import 'styles/animation.styl'
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCrow, faLink, faUnlink, faStar, faInfoCircle, faQuestionCircle, faFile, faFileAlt, faExclamationTriangle, faSplotch, faStarHalf, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCrow, faLink, faUnlink, faStar, faStarRegular, faInfoCircle, faQuestionCircle, faFile, faFileAlt, faExclamationTriangle, faSplotch, faStarHalf, faPenSquare)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
