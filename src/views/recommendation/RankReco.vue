<template>
  <div class="card row">
    <div class="card-body offset-md-3 col-6">
      <h3>{{ this.$store.state.loginUser }} 영화 평점 기준 추천</h3>
      <h4>선호하는 영화</h4>
      <movie-item v-for="movie in myBestMovie" :key="movie.id" :movie="movie"></movie-item>
      <button @click="rankReco">추천 받기</button>
    </div>
  </div>
</template>

<script>
import MovieItem from '../movies/MovieItem.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'RankReco',
  components: {
    MovieItem,
  },
  data: function () {
    return {
      myBestMovie: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt")
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config;
    },
    bestMovie: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      const userID = this.$store.state.userInfo.id
      axios({
        method: 'get',
        url: `${Django_URL}/movies/recommendation/rank/${userID}/`,
        headers: this.setToken(),
      })
        .then(res => {
          const movies = res.data
          const bestMovies = movies.filter((movie) => {
            if (movie.user_rank == 5) {
              return movie
            }
          })
          const allMovies = this.$store.state.movies
          const bestMovie = _.sample(bestMovies)
          this.myBestMovie = allMovies.filter((movie) => {
            if (movie.id == bestMovie.movie) {
              return movie
            }
          })
          console.log(this.myBestMovie)
        })
        .catch(err => {
          console.log(err)
        })
    },
    rankReco: function () {
      const genreID = _.sample(this.myBestMovie[0].genres)
      this.$router.push({
        name: 'GenreRecoDetail',
        params: {
          genre_id: genreID
        }
      })
    },
  },
  created: function () {
    this.bestMovie()
  },
}
</script>

<style>

</style>