<template>
  <div id="selected-genre">
    <div class="row justify-content-md-center">
      <div v-if="genreName">
        <h2 class="m-4"><span style="font-size: 20px;"><router-link style="text-decoration: none; color: gray;" to='/movies'>영화 > </router-link></span>{{ genreName }} 영화</h2>
      </div>
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
      genreName: '',
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
      const selectedGenre = this.$store.state.genresList.filter ((gen) => {
        if (genre == gen.id) {
          return gen
        }
      })
      this.genreName = selectedGenre[0].name
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/movies/genre/${genre}/`,
      })
        .then(res => {
          console.log(res)
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