<template>
  <div name="nowMovie" class="col-2">
    <div class="card">
      <!-- 카드 누를때 디테일창으로 넘어가는 부분 -->
      <router-link
        :to="`/movies/${movie.id}`"
        @click="selectedNowMovie(now_movie)"
        style="color: black; text-decoration: none"
      >
        <div>
          {{ movie.id }}
          <img class="card-img-top" :src="imageURL" alt="movieImage" />
          <h5 class="card-title">{{ movie.title }}</h5>
          <p>{{ movie.genres }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NowMovieList",
  props: {
    movie: Object,
  },
  computed: {
    imageURL: function () {
      const movieImage = this.movie.poster_path;
      return `https://image.tmdb.org/t/p/original/${movieImage}`
    },
  },
  methods: {
    selectedNowMovie: function (now_movie) {
      this.$router.push({
        name: "MovieDetail",
        params: {
          now_movie: now_movie,
        },
      })
    },
  },
}
</script>

<style>
</style>