<template>
  <div class="m-3">
    <div class="row justify-content-md-center">
      <h2>{{ genre }} 장르 영화들</h2>
      <movie-item
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      >
      </movie-item>
    </div>
  </div>

</template>

<script>
import MovieItem from '../movies/MovieItem.vue'

export default {
  name: 'GenreRecoDetail',
  data: function () {
    return {
      movies: null,
      genre: null,
    }
  },
  components:{
    MovieItem,
  },

  created: function () {
    const genre = this.$route.params.genre_id
    const movies = this.$store.state.movies
    const genreMovie = movies.filter ((movie) => {
      const genres = movie.genres
      if (genres.includes(genre)) {
        return movie
      }
    })
    this.movies = genreMovie
    this.genre = genre
    console.log(this.movies)
  },
}
</script>

<style>

</style>