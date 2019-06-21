// VUE
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import api from './api/index'

// CSS
import 'normalize.css'
import 'styles/reset.styl'
import 'styles/base.styl'
import 'styles/variables.styl'
import 'styles/mixins.styl'
import 'font-awesome/css/font-awesome.css'
// plugins
import dialogs from 'plugins/dialogs'
// font-awesome
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCrow } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faCrow)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$api = api
Vue.use(dialogs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
