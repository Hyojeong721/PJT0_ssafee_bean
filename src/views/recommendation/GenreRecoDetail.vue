<template>
  <div class="m-3">
    <div class="row justify-content-md-center">
      <h2>{{ genreName }} 장르 영화들</h2>
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
import _ from 'lodash'

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
    getGenreMovies: function () {
      const genre = this.$route.params.genre_id
      const movies = this.$store.state.movies
      const genreMovie = movies.filter ((movie) => {
        const genres = movie.genres
        if (genres.includes(genre)) {
          return movie
        }
      })
      if (genreMovie.length >= 10) {

        this.movies = _.sampleSize(genreMovie, 10)
      }
      else {
        this.movies = genreMovie
      }
    },
  },
  created: function () {
    this.getGenreMovies()
  },
}
</script>

<style>

</style>