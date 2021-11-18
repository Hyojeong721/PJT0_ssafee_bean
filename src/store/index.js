import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    movies: [],
    loginUser: '',
    selectedReview: [],
    userInfo: {},
  },
  mutations: {
    GET_MOVIES: function (state, data) {
      state.movies = data
    },
    LOGIN_USER: function (state, credentials) {
      state.loginUser = credentials.username
    },
    SELECTED_REVIEW: function (state, reviews) {
      state.selectedReview = reviews
    },
    USER_INFO: function (state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    getMovies: function ({ commit }) {
      const Django_URL = 'http://127.0.0.1:8000'
      axios.get(`${Django_URL}/movies`)
        .then((res) => {
          commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
          console.log(err)
        }) 
    },
    loginUser: function ({ commit }, credentials) {
      commit('LOGIN_USER', credentials)
    },
    selectedReview: function ({ commit }, reviews) {
      commit('SELECTED_REVIEW', reviews)
    },
    userInfo: function ({ commit }, userInfo) {
      commit('USER_INFO', userInfo)
    },
  },
  modules: {
  }
})
