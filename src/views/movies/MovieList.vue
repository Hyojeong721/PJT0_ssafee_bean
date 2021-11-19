<template>
  <div>
    <div name="genres" class="row justify-content-start">
      <div>
        <h2 class="col-2">영화</h2>
      </div>
      <div class="offset-md-1 col-2">
        <select @change="onGenre" name="selectgenres">
          <option value="">모든 장르</option>
          <option value="Action">액션</option>
          <option value="Adventure">모험</option>
          <option value="Animation">애니메이션</option>
          <option value="Comedy">코미디</option>
          <option value="Crime">범죄</option>
          <option value="Documentary">다큐멘터리</option>
          <option value="Drama">드라마</option>
          <option value="Family">가족</option>
          <option value="Fantasy">판타지</option>
          <option value="History">역사</option>
          <option value="Horror">공포</option>
          <option value="Music">음악</option>
          <option value="Mystery">미스터리</option>
          <option value="Romance">로맨스</option>
          <option value="Science_Fiction">SF</option>
          <option value="TV_Movie">TV영화</option>
          <option value="Thriller">스릴러</option>
          <option value="War">전쟁</option>
          <option value="Western">서부</option>
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
import MovieItem from "./MovieItem.vue"

export default {
  name: "MovieList",
  components: {
    MovieItem,
  },
  data: function () {
    return {
      movies: null,
    }
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
  methods: {
    onGenre: function (res) {
      const genres = res.target.value
      console.log(genres)
    },
  },

  created: function () {
    this.$store.dispatch("getMovies")
      const genre = Number(res.target.value)
      const movies = this.$store.state.movies
      const genreMovie = movies.filter((movie) =>  {
        const genres = movie.genres
        if (genres.includes(genre)) {
          return movie
        }
      })
      this.movies = genreMovie
    }
  },
}
</script>

<style>
</style>