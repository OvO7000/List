import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      token: ''
    },
    route: {
      type: 'work',
      subType: 'comic'
    },
    type: ['figure', 'work'],
    subType: {
      work: [
        {
          id: 'comic',
          name: '漫画'
        },
        {
          id: 'animation',
          name: '动画'
        }
      ],
      figure: [
        {
          id: 'cartoonist',
          name: '漫画家'
        },
        {
          id: 'writer',
          name: '作家'
        }
      ]
    },
    list: {
      figure: {},
      work: {}
    }
  },
  mutations: {},
  actions: {},
  getters: {
  }
})
