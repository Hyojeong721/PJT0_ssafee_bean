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
    userRank: '',
    likeMovies: [],
    genreName: '',
    genresList: [],
    usersAvatar: [],
    nowMovies: [],
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
    USER_RANK: function (state, userRank) {
      state.userRank = userRank
    },
    LIKE_MOVIES: function (state, likeMovies) {
      state.likeMovies = likeMovies
    },
    GENRE_NAME: function (state, genreName) {
      state.genreName = genreName
    },
    GENRES_LIST: function (state, genresList) {
      state.genresList = genresList
    },
    USERS_AVATAR: function (state, usersAvatar) {
      state.usersAvatar = usersAvatar
    },
    NOW_MOVIES: function (state, nowMovies) {
      state.nowMovies = nowMovies
    }
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
    likeMovies: function ({ commit }, likeMovies) {
      commit('LIKE_MOVIES', likeMovies)
    },
    genreName: function ({ commit }, genreName) {
      commit('GENRE_NAME', genreName)
    },
    genresList: function ({ commit }, genresList) {
      commit('GENRES_LIST', genresList)
    },
    usersAvatar: function ({ commit }, usersAvatar) {
      commit('USERS_AVATAR', usersAvatar)
    },
    nowMovies: function ({ commit }, nowMovies) {
      commit('NOW_MOVIES', nowMovies)
    },
  },
  modules: {
  }
})
