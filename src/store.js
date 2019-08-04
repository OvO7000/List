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
    // 新增修改
    // 将一个figure或work插入到edit数组中
    setEdits (state, id) {
      let edit
      let item = state.items[state.route.type][state.route.subType].find(item => item.id === id)

      item = JSON.parse(JSON.stringify(item))
      // item = Object.assign({}, item)
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
    // 更新edit
    setEdit (state, edit) {
      let index = state.edits.findIndex(item => item.id === edit.id)
      state.edits.splice(index, 1, edit)
    },
    // 插入 figure 或 work
    setItems (state, items) {
      items.forEach((item, index) => {
        let route
        if (state.subType['work'].find(subType => subType.id === item.subType)) {
          route = {
            type: 'work',
            subType: state.subType['work'].find(subType => subType.id === item.subType).name_en
          }
        } else {
          route = {
            type: 'figure',
            subType: state.subType['figure'].find(subType => subType.id === item.subType).name_en
          }
        }
        if (!state.items[route.type][route.subType]) {
          Vue.set(state.items[route.type], route.subType, [])
        }
        let _index = state.items[route.type][route.subType].findIndex(_item => _item.id === item.id)
        if (_index < 0) {
          if (route.type === 'work' && item.rank === true) {
            state.items[route.type][route.subType].unshift(item)
          } else {
            // figure 或 rank === false 的 work
            state.items[route.type][route.subType].push(item)
          }
        }
      })
    },
    delItem (state, id) {
      const type = state.items[state.route.type][state.route.subType]
      const index = type.findIndex(item => item.id === id)
      type.splice(index, 1)
    },
    // 设置 edit 后的 figure 或 work
    setItem (state, payload) {
      const type = state.items[state.route.type][state.route.subType]
      const index = type.findIndex(item => item.id === payload.id)
      type.splice(index, 1, payload)
    },
    // 删除edit
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
    getItems (context, rank) {
      const route = context.state.route

      const id = context.state.subType[route.type].find(item => item.name_en === route.subType).id
      const items = context.state.items[route.type][route.subType]
      let count = context.state.items[route.type][route.subType] ? context.state.items[route.type][route.subType].length : 0

      // rank === true
      if (route.type === 'work' && rank === 0) {
        let rankItems = items.filter((item) => item.rank === true)
        count = rankItems.length
      } else if (route.type === 'work' && rank === 1) {
        let rankItems = items.filter((item) => item.rank === false)
        count = rankItems.length
      }
      api[route.type].index(id, count, rank).then((res) => {
        context.commit('setItems', res)
      })
    },
    getItem (context, payload) {
      return api[payload.type].single(payload.id).then((res) => {
        context.commit('setItems', [res])
        return Promise.resolve(res)
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
