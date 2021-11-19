<template>
  <div class="row">
      <h1>Home</h1>
      <now-movie-list
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      >
      </now-movie-list>

  </div>
</template>

<script>
import axios from 'axios'
import NowMovieList from './NowMovieList.vue'

const API_KEY = process.env.VUE_APP_API_KEY

export default {
    name :'Home',
    data: function () {
        return {
          movies: [],
        }
    },
    components: {
        NowMovieList,
    },

    created: function () {
      axios({
          method: 'get',
          url: 'https://api.themoviedb.org/3/movie/now_playing',
          params: {
              api_key : API_KEY,
              language: 'ko-KR',
          }
      })
        .then ((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
   


}
</script>

<style>

</style>