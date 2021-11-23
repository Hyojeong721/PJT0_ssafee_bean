<template>
  <div class="m-3">
    <div class="row justify-content-md-center">
      <h2>찜</h2>
      <movie-item v-for="movie in likeMovies" :key="movie.id" :movie="movie">
      </movie-item>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'

export default {
  name: 'LikeMovieList',
  components: {
    MovieItem,
  },
  data: function () {
    return {
      movies: this.$store.state.likeMovies,
    }
  },
  methods: {
    getLikeMovies: function () {
      this.$store.dispatch('getMovies')
      const movies = this.$store.state.movies
      const likeMovies = movies.filter((movie) => {
        const userID = this.$store.state.userInfo.id
        if (movie.like_users.includes(userID)) {
          return movie
        }
      })
      this.movies = likeMovies
      this.$store.dispatch('likeMovies', likeMovies)
    },
  },
  created: function () {
    this.getLikeMovies()
  },
  computed: {
    likeMovies: function () {
      const movies = this.$store.state.likeMovies
      return movies
    },
  },
}
</script>

<style>

</style>