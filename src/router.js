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
/**
 * 获取 subType
 */
router.beforeEach((to, from, next) => {
  // subType 还未获取
  if (!Object.keys(store.state.subType).length) {
    store.dispatch('getType').then(() => {
      next()
    })
  } else {
    next()
  }
})

/**
 * 检查路由
 */
router.beforeEach((to, from, next) => {
  let type = to.path.split('/')[1]
  let subType = to.path.split('/')[2]
  let route
  // 路由合法
  if (store.state.subType[type] && store.state.subType[type].find(item => item.name_en === subType)) {
    route = {
      type,
      subType
    }
  } else {
    // 路由不合法，使用默认路由
    type = 'work'
    subType = store.state.subType['work'][0].name_en
    route = {
      type,
      subType
    }
    router.push(`/work/${subType}`)
  }
  store.dispatch('setRoute', route).then(() => {
    // 检查 item 是否已存在
    if (!store.state.items[type][subType] || store.state.items[type][subType] === 0) {
      store.dispatch('getItems', 2)
    }
    next()
  })
})

export default router
