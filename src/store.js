import Vue from 'vue'
import Vuex from 'vuex'
// import router from 'router'
import api from 'api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      token: 'asdadwawdad'
    },
    route: {
      id: '',
      type: '',
      subType: ''
    },
    subType: {},
    items: {
      figure: {
        // writer: [
        //   {
        //     id: 11,
        //     name: '麦克 米格诺拉',
        //     originName: 'Michael Mignola',
        //     info: {
        //       work: [
        //         {
        //           id: 'aaa',
        //           name: 'aaa',
        //           href: 'asa',
        //           title: 'aaa'
        //         }
        //       ],
        //       link: [
        //         {
        //           name: 'Pixiv',
        //           href: 'www'
        //         }
        //       ]
        //     },
        //     img: [
        //       {
        //         id: '1212',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
        //       },
        //       {
        //         id: '1231',
        //         title: 'Dead Leaves',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
        //       },
        //       {
        //         id: '24323',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
        //       }
        //     ]
        //   },
        //   {
        //     id: 12,
        //     name: 'a',
        //     info: {
        //     },
        //     imgs: [
        //       {
        //         id: '1321',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
        //       },
        //       {
        //         id: '234',
        //         title: 'Dead Leaves',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
        //       },
        //       {
        //         id: '2413',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
        //       }
        //     ]
        //   }
        // ]
      },
      work: {
        // comic: []
        // comic: [
        //   {
        //     id: 22,
        //     rank: true,
        //     name: 'a',
        //     sub: [
        //       {
        //         id: 'asdas',
        //         name: '入侵负责',
        //         originName: 'adad afafas',
        //         info: [
        //           {
        //             name: '负责',
        //             href: 'adaf',
        //             title: 'aaa'
        //           },
        //           {
        //             name: '入侵负2',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [1, 2]
        //       },
        //       {
        //         id: 'dasfsd',
        //         name: 'a1',
        //         info: [
        //           {
        //             name: 'asfdaa',
        //             title: 'aaa'
        //           },
        //           {
        //             name: 'aasgsa',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [0, 1, 2, 3]
        //       },
        //       {
        //         id: 'dasasfsd',
        //         name: 'a1',
        //         info: [
        //           {
        //             name: 'asfdaa',
        //             title: 'aaa'
        //           },
        //           {
        //             name: 'aasgsa',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [0]
        //       },
        //       {
        //         id: 'azasdas',
        //         name: '入侵负责',
        //         originName: 'adad afafas',
        //         info: [
        //           {
        //             name: '入侵负责',
        //             href: 'adaf',
        //             title: 'aaa'
        //           },
        //           {
        //             name: '入侵负2',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [1]
        //       },
        //       {
        //         id: 'daszcxfsd',
        //         name: 'a1',
        //         info: [
        //           {
        //             name: 'asfdaa',
        //             title: 'aaa'
        //           },
        //           {
        //             name: 'aasgsa',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [2]
        //       },
        //       {
        //         id: 'dasaszxcxcfsd',
        //         name: 'a1',
        //         info: [
        //           {
        //             name: 'asfdaa',
        //             title: 'aaa'
        //           },
        //           {
        //             name: 'aasgsa',
        //             title: 'aaa'
        //           }
        //         ],
        //         tag: [3]
        //       }
        //     ],
        //     adapt: [
        //       {
        //         type: '动画',
        //         href: ''
        //       }
        //     ],
        //     img: [
        //       {
        //         id: '1212',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
        //       },
        //       {
        //         id: '1231',
        //         title: 'Dead Leaves',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
        //       },
        //       {
        //         id: '24323',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
        //       },
        //       {
        //         id: '24ssc323',
        //         title: 'BLAME!',
        //         origin: 'a',
        //         compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
        //       }
        //     ]
        //   }
        // ],
        // film: []
      }
    },
    edits: []
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
      let item = Object.assign({}, state.items[state.route.type][state.route.subType].find(item => item.id === id))
      if (state.route.type === 'work') {
        edit = {
          id: item.id,
          item: item,
          selected: [],
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
    }
  },
  actions: {
    getType (context) {
      return api.type.index().then((res) => {
        context.commit('setSubType', res)
      })
    },
    getItem (context) {
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
    }
  }
})
