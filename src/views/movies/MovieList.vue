<template>
  <div>
      <h1>movie_list</h1>
      <movie-item></movie-item>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'
export default {
    name:'MovieList',
    components: {
        MovieItem
    }
    
}
</script>

<style>

</style>