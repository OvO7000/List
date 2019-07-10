import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Item from 'components/detail/Item.vue'
import eItem from 'components/edit/Item.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/work/:subType',
      name: 'work',
      components: {
        item: Item,
        eItem: eItem
      }
    },
    {
      path: '/figure/:subType',
      name: 'figure',
      components: {
        item: Item,
        eItem: eItem
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // subType 还未获取
  if (!Object.keys(store.state.subType).length) {
    store.dispatch('getType', to.path)
    return next()
  }
  // 检查路由
  const type = to.path.split('/')[1]
  const subType = to.path.split('/')[2]
  const route = {
    type,
    subType
  }
  if (store.state.subType[type] && store.state.subType[type].find(item => item.name_en === subType)) {
    store.dispatch('setRoute', route).then(() => {
      if (!store.state.items[type][subType] || store.state.items[type][subType] === 0) {
        store.dispatch('getItem', route)
      }
      next()
    })
  }
})

export default router
