import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      token: 'asdadwawdad'
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
  getters: {
    defaultType (state) {
      return state.type[0]
    },
    defaultSubType (state, getters) {
      return state.subType[getters.defaultType][0].id
    }
  },
  mutations: {
    setType (state, { type }) {
      state.type = type
    },
    setSubType (state, { figure, work }) {
      state.subType = { figure, work }
    }
  },
  actions: {
    getType (context) {
      api.type.getType().then((res) => {})
    }
  }
})
