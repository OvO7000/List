import Vue from 'vue'
import Router from 'vue-router'
import Items from 'components/Items.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:type/:subType',
      name: 'Items',
      component: Items
    }
  ]
})
