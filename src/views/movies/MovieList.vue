<template>
  <div>
      <h1>movie_list</h1>
      <movie-item
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"></movie-item>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'

export default {
    name:'MovieList',
    components: {
        MovieItem
    },
    computed: {
        movies: function () {
            return this.$store.state.movies
        }
    },
    
    created: function () {
        this.$store.dispatch('getMovies')
  },
    
}
</script>

<style>

</style>