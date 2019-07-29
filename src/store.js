import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import api from 'api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      level: 0,
      token: ''
    },
    route: {
      id: '',
      type: '',
      subType: ''
    },
    subType: {},
    items: {
      figure: {},
      work: {}
    },
    edits: [],
    poster: {
      image: '',
      show: false
    }
  },
  getters: {
    item: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id)
      }
    },
    edit: (state) => (id) => {
      return state.edits.find(item => item.id === id)
    },
    imgs: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id).imgs
      }
    },
    isRank: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id).rank
      }
    },
    info: (state) => {
      let info
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        info = state.items[state.route.type][state.route.subType].map(item => {
          return {
            id: item.id,
            edit: !!state.edits.find(edit => edit.id === item.id)
          }
        })
      } else {
        info = []
      }
      return info
    }
  },
  mutations: {
    setSubType (state, payload) {
      state.subType = payload
    },
    setRoute (state, payload) {
      state.route.type = payload.type
      state.route.subType = payload.subType
    },
    setEdits (state, id) {
      let edit
      let item = state.items[state.route.type][state.route.subType].find(item => item.id === id)
      if (state.route.type === 'work') {
        edit = {
          id: item.id,
          item: item,
          selected: [],
          imgs: item.imgs
        }
        delete edit.item.imgs
      } else if (state.route.type === 'figure') {
        edit = {
          id: item.id,
          item: item,
          imgs: item.imgs
        }
        delete edit.item.imgs
      }
      state.edits.push(edit)
    },
    setRank (state, id) {
      let item = state.edits.find(item => item.id === id).item
      item.rank = !item.rank
    },
    setUser (state, info) {
      state.user = info
    },
    setEdit (state, edit) {
      let index = state.edits.findIndex(item => item.id === edit.id)
      state.edits.splice(index, 1, edit)
    },
    setItems (state, items) {
      const route = state.route
      if (!state.items[route.type][route.subType]) {
        Vue.set(state.items[route.type], route.subType, [])
      }
      Vue.set(state.items[route.type], route.subType, items.concat(state.items[route.type][route.subType]))
    },
    delItem (state, id) {
      const type = state.items[state.route.type][state.route.subType]
      const index = type.findIndex(item => item.id === id)
      type.splice(index, 1)
    },
    setItem (state, payload) {
      const type = state.items[state.route.type][state.route.subType]
      const index = type.findIndex(item => item.id === payload.id)
      type.splice(index, 1, payload)
    },
    delEdit (state, id) {
      const index = state.edits.findIndex(item => item.id === id)
      state.edits.splice(index, 1)
    },
    logOut (state) {
      state.user.level = 0
      state.user.token = ''
    },
    setPoster (state, payload) {
      payload.image && (state.poster.image = payload.image)

      state.poster.show = payload.show
    }
  },
  actions: {
    getType (context) {
      return api.type.index().then((res) => {
        context.commit('setSubType', res)
      })
    },
    getItems (context) {
      const route = context.state.route

      const id = context.state.subType[route.type].find(item => item.name_en === route.subType).id
      const count = context.state.items[route.type][route.subType] ? context.state.items[route.type][route.subType].length : 0
      api[route.type].index(id, count).then((res) => {
        context.commit('setItems', res)
      })
    },
    setRoute (context, payload) {
      context.commit('setRoute', payload)
    },
    getUser (context, payload) {
      api.user.login(payload).then((res) => {
        context.commit('setUser', res)
        context.dispatch('getType')
      })
    },
    logOut (context) {
      context.commit('logOut')
    },
    setEdits (context, id) {
      context.commit('setEdits', id)
    },
    setEdit (context, edit) {
      context.commit('setEdit', edit)
    },
    setItem (context, item) {
      context.commit('setItem', item)
    },
    delEdit (context, id) {
      context.commit('delEdit', id)
    },
    deleteAll (context, id) {
      context.commit('delItem', id)
      context.commit('delEdit', id)
    },
    hidePoster (context) {
      context.commit('setPoster', {
        show: false
      })
    },
    setPoster (context, image) {
      context.commit('setPoster', {
        image: image,
        show: true
      })
    }
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
