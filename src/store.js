import Vue from 'vue'
import Vuex from 'vuex'
import router from 'router'
import api from 'api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      token: 'asdadwawdad'
    },
    route: {
      type: '',
      subType: ''
    },
    subType: {},
    items: {
      figure: {
        writer: [
          {
            id: 11,
            name: '麦克 米格诺拉',
            originName: 'Michael Mignola',
            info: {
              work: [
                {
                  id: 'aaa',
                  name: 'aaa',
                  href: 'asa',
                  title: 'aaa'
                }
              ],
              link: [
                {
                  name: 'Pixiv',
                  href: 'www'
                }
              ]
            },
            img: [
              {
                id: '1212',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
              },
              {
                id: '1231',
                title: 'Dead Leaves',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
              },
              {
                id: '24323',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
              }
            ]
          },
          {
            id: 12,
            name: 'a',
            info: {
            },
            img: [
              {
                id: '1321',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
              },
              {
                id: '234',
                title: 'Dead Leaves',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
              },
              {
                id: '2413',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
              }
            ]
          }
        ]
      },
      work: {
        comic: [
          {
            id: 22,
            rank: true,
            name: 'a',
            sub: [
              {
                id: 'asdas',
                name: '入侵负责',
                originName: 'adad afafas',
                info: [
                  {
                    name: '入侵负责',
                    href: 'adaf',
                    title: 'aaa'
                  },
                  {
                    name: '入侵负2',
                    title: 'aaa'
                  }
                ],
                tag: [1, 2]
              },
              {
                id: 'dasfsd',
                name: 'a1',
                info: [
                  {
                    name: 'asfdaa',
                    title: 'aaa'
                  },
                  {
                    name: 'aasgsa',
                    title: 'aaa'
                  }
                ],
                tag: [0, 1, 2, 3]
              },
              {
                id: 'dasasfsd',
                name: 'a1',
                info: [
                  {
                    name: 'asfdaa',
                    title: 'aaa'
                  },
                  {
                    name: 'aasgsa',
                    title: 'aaa'
                  }
                ],
                tag: [0]
              },
              {
                id: 'azasdas',
                name: '入侵负责',
                originName: 'adad afafas',
                info: [
                  {
                    name: '入侵负责',
                    href: 'adaf',
                    title: 'aaa'
                  },
                  {
                    name: '入侵负2',
                    title: 'aaa'
                  }
                ],
                tag: [1]
              },
              {
                id: 'daszcxfsd',
                name: 'a1',
                info: [
                  {
                    name: 'asfdaa',
                    title: 'aaa'
                  },
                  {
                    name: 'aasgsa',
                    title: 'aaa'
                  }
                ],
                tag: [2]
              },
              {
                id: 'dasaszxcxcfsd',
                name: 'a1',
                info: [
                  {
                    name: 'asfdaa',
                    title: 'aaa'
                  },
                  {
                    name: 'aasgsa',
                    title: 'aaa'
                  }
                ],
                tag: [3]
              }
            ],
            adapt: [
              {
                type: '动画',
                href: ''
              }
            ],
            img: [
              {
                id: '1212',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/BLAME!.jpg'
              },
              {
                id: '1231',
                title: 'Dead Leaves',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Dead Leaves.jpg'
              },
              {
                id: '24323',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
              },
              {
                id: '24ssc323',
                title: 'BLAME!',
                origin: 'a',
                compressed: 'http://img.list.ovo7.cn/compressed/Invader Zim1.jpg'
              }
            ]
          }
        ],
        film: []
      }
    }
  },
  getters: {
    item: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id)
      }
    },
    imgs: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id).img
      }
    },
    isRank: (state) => (id) => {
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        return state.items[state.route.type][state.route.subType].find(item => item.id === id).rank
      }
    },
    ids: (state) => {
      let ids = []
      if (state.route.type && state.route.subType && state.items[state.route.type][state.route.subType]) {
        ids = state.items[state.route.type][state.route.subType].map(item => item.id)
      }
      return ids
    }
  },
  mutations: {
    setSubType (state, payload) {
      state.subType = payload
    },
    setRoute (state, payload) {
      state.route.type = payload.type
      state.route.subType = payload.subType
    }
  },
  actions: {
    getType (context, payload) {
      api.type.getType().then((res) => {
        context.commit('setSubType', res.data)

        const defaultType = Object.keys(res.data)[0]
        const defaultSubType = res.data[defaultType][0].name_en

        const route = {
          type: defaultType,
          subType: defaultSubType
        }
        context.commit('setRoute', route)

        router.push('/' + defaultType + '/' + defaultSubType)
      })
    },
    setRoute (context, payload) {
      context.commit('setRoute', payload)
    }
  }
})
