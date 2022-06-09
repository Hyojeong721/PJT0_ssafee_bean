<template>
  <div class="carousel-item active">
    <img class="d-block w-100" style="object-fit: cover" :src="imageURL" alt="movieImage">
  </div>
    <!-- <router-link :to="`/movies/${movie.id}`" style="color: black; text-decoration: none;"> -->
    <!-- </router-link> -->
</template>

<script>
export default {
  name: 'NowMovieList',
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