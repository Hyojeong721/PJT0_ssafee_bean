import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    GET_MOVIES: function (state, data) {
      state.movies = data
    }
  },
  actions: {
    getMovies: function({commit}) {
      const Django_URL = 'http://127.0.0.1:8000'
      axios.get(`${Django_URL}/movies`)
        .then((res) => {
          console.log(res.data)
          commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
          console.log(err)
        }) 
    }
  },
  modules: {
  }
})
