import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Work from 'components/Work.vue'
import Figure from 'components/Figure.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/work/:subType',
      name: 'work',
      component: Work
    },
    {
      path: '/figure/:subType',
      name: 'figure',
      component: Figure
    }
  ]
})

router.beforeEach((to, from, next) => {
  // subType 还未获取
  if (!Object.keys(store.state.subType).length) {
    store.dispatch('getType', to.path)
  }
  // 检查路由
  const type = to.path.split('/')[1]
  const subType = to.path.split('/')[2]
  const route = {
    type,
    subType
  }
  if (store.state.subType[type] && store.state.subType[type].find(item => item.name_en === subType)) {
    store.dispatch('setRoute', route)
    next()
  }
})

export default router
