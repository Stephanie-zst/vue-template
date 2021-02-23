/*
 * 用户信息模块
 * */
// import Vue from 'vue'
// import { ACCESS_TOKEN } from './types'

const user = {
  state: {
    token: '',
    roles: [],
    userInfo: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },

  actions: {
    // 登录
    Login({ commit }, { code }) {
      return new Promise((resolve, reject) => {
        // TODO
        // Vue.ls.set(ACCESS_TOKEN, key)
        // commit('SET_TOKEN', key)
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // TODO
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        // TODO
      })
    },
  },
}

export default user
