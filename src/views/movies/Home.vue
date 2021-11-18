<template>
  <div>
      <h1>Home</h1>
      <movie-list></movie-list>

  </div>
</template>

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
    }


}
</script>

<style>

</style>