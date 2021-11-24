<template>
  <div class="m-3">
    <div class="row justify-content-md-center">
      <h2>{{ genreName }} 장르 영화들</h2>
      <div class="row">
        <movie-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        >
        </movie-item>
      </div>
    </div>
  </div>

</template>

<script>
import MovieItem from '../movies/MovieItem.vue'
import axios from 'axios'
// import _ from 'lodash'

export default {
  name: 'GenreRecoDetail',
  data: function () {
    return {
      movies: null,
      genreName: this.$store.state.genreName,
    }
  },
  components:{
    MovieItem,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt")
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config;
    },
    getGenreMovies: function () {
      const genre = this.$route.params.genre_id
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/movies/recommendation/genre/${genre}/`,
        headers: this.setToken(),
      })
        .then(res => {
          this.movies = res.data
        })
        .catch(err => {
          console.log(err)
        })
      // const movies = this.$store.state.movies
      // const genreMovie = movies.filter ((movie) => {
      //   const genres = movie.genres
      //   if (genres.includes(genre)) {
      //     return movie
      //   }
      // })
      // if (genreMovie.length >= 10) {

      //   this.movies = _.sampleSize(genreMovie, 10)
      // }
      // else {
      //   this.movies = genreMovie
      // }
    },
  },
  created: function () {
    this.getGenreMovies()
  },
}
</script>

<style>

</style>