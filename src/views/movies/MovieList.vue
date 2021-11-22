<template>
  <div>
    <div name="genres" class="row justify-content-start">
      <div>
        <h2 class="col-2">영화</h2>
      </div>
      <div class="offset-md-1 col-2">
        <select @change="onGenre" name="selectgenres">
          <option value="">모든 장르</option>
          <option value="28">액션</option>
          <option value="12">모험</option>
          <option value="16">애니메이션</option>
          <option value="35">코미디</option>
          <option value="80">범죄</option>
          <option value="99">다큐멘터리</option>
          <option value="18">드라마</option>
          <option value="10751">가족</option>
          <option value="14">판타지</option>
          <option value="36">역사</option>
          <option value="27">공포</option>
          <option value="10402">음악</option>
          <option value="9648">미스터리</option>
          <option value="10749">로맨스</option>
          <option value="878">SF</option>
          <option value="10770">TV영화</option>
          <option value="53r">스릴러</option>
          <option value="10752">전쟁</option>
          <option value="37">서부</option>
        </select>
      </div>
    </div>

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

export default {
  name: 'MovieList',
  components: {
    MovieItem,
  },
  data: function () {
    return {
      movies: null,
    }
  },
  methods: {
    onGenre: function (res) {
      const genre = Number(res.target.value)
      const movies = this.$store.state.movies
      const genreMovie = movies.filter((movie) =>  {
        const genres = movie.genres
        if (genres.includes(genre)) {
          return movie
        }
      })
      this.movies = genreMovie
      if (!genre) {
        this.movies = movies
      }
    }
  },
  created: function () {
    this.$store.dispatch('getMovies')
    this.movies = this.$store.state.movies
  },
}
</script>

<style>
</style>