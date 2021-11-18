<template>
  <div>
      <h1>Home</h1>
      <movie-list></movie-list>

  </div>
</template>

const API_URL = 'http://127.0.0.1:8000'


<script>
import MovieList from './MovieList.vue'

export default {
    name :'Home',
    data: function () {
        return {

        }
    },
    components:{
        MovieList,
    },
    created: function () {
        this.$store.dispatch('getMovies')
    }


}
</script>

<style>

</style>