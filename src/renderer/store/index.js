import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'
import { createPersistedState } from 'vuex-electron'
import initPlugin from './plugins/initPlugin'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // unicorn: '',
    count: 0,
    connections: [],
    // curConnection: {},
    curConnectionName: ''
  },
  getters: {
    curConnection: state => {
      return state.connections.filter(connection => connection.name === state.curConnectionName)[0] || {}
    }
  },
  actions: {
    increment (store) {
      store.commit('increment')
    },
    decrement (store) {
      store.commit('decrement')
    },
    // syncConnections (store, payload) {
    //   console.log(payload)
    //   console.log('payload==============')
    //   store.commit('syncConnections', payload)
    // }
    setCurConnectionName ({ commit }, payload) {
      commit('setCurConnectionName', payload)
    },
    addNewConnection ({ commit }, payload) {
      const connection = {}
      for (const key in payload) {
        connection[key] = payload[key]
      }
      console.log(connection, '============')
      commit('addNewConnection', connection)
    },
    updateConnection ({ commit }, payload) {
      commit('updateConnection', payload)
    },
    deleteConnection ({ commit }, payload) {
      commit('deleteConnection', payload)
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    setCurConnectionName (state, payload) {
      state.curConnectionName = payload
    },
    addNewConnection (state, payload) {
      payload._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      state.connections.push(payload)
    },
    updateConnection (state, payload) {
      const indx = state.connections.findIndex(conn => conn._id === payload._id)
      Vue.set(state.connections, indx, payload)
      // state.connections = Object.assign({}, this.formData, value)state.connections, indx, payload)
    },
    deleteConnection (state, payload) {
      const indx = state.connections.findIndex(conn => conn._id === payload)
      // console.log(indx)
      // let indx = state.connections.indexOf(payload)
      state.connections.splice(indx, 1)
    }
    // syncConnections (state, payload) {
    //   state.connections = payload
    // }
  },
  modules,
  plugins: [createLogger(), createPersistedState(), initPlugin],
  strict: process.env.NODE_ENV !== 'production',
  devtools: true
})
