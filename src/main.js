// VUE
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// component
import TransitionSlide from 'components/Slide'

// CSS
import 'normalize.css'
import 'styles/base.styl'
import 'styles/reset.styl'
import 'styles/variables.styl'
import 'styles/mixins.styl'
import 'styles/animation.styl'

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCrow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCrow)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('transition-slide', TransitionSlide)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
