<template>
  <div>
    <h1 class="m-3">"{{this.$route.query.search_query}}" 검색 결과</h1>
    <div name="movie" class="m-3">
      <div class="row justify-content-md-center">
        <movie-item v-for="movie in movies" :key="movie.id" :movie="movie">
        </movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'
import axios from 'axios'

export default {
 name: 'MovieSearch',
 components: {
   MovieItem,
 },
 data: function () {
   return {
     movies: [],
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
  getQueryMovie: function () {
    const q = this.$route.query.search_query
    console.log(q)
    const Django_URL = 'http://127.0.0.1:8000'
    axios({
      method: 'get',
      url: `${Django_URL}/movies/`,
      params: {
        q: q
      }
    })
      .then(res => {
        this.movies = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
 },
 created: function () {
   this.getQueryMovie()
 },
}
</script>

<style>

</style>