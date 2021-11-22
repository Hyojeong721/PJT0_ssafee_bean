import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createdPersistedState(),
  ],
  state: {
    movies: null,
    loginUser: '',
    selectedReview: [],
    userInfo: {},
    userRank: 0,
  },

  mutations: {
    GET_MOVIES: function (state, data) {
      state.movies = data.data 
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
    USER_RANK: function(state, userRank) {
      state.userRank = userRank
    },
  },

  actions: {
    getMovies: function ({ commit }) {
      const Django_URL = 'http://127.0.0.1:8000'

      axios.get(`${Django_URL}/movies`)
        .then((res) => {
          commit('GET_MOVIES', res)
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
    userRank: function ({ commit }, userRank) {
      commit('USER_RANK', userRank)
    },
  },
  modules: {
  }
})
