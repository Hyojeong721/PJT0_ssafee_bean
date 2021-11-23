<template>
  <div name="movie" class="col-3">
    <div class="card">
      <!-- 영화디테일 -->
      <router-link
        :to="`/movies/${movie.id}`"
        @click="selectedMovie(movie.id)"
        style="color: black; text-decoration: none"
      >
      
      <img class="img" :src="imageURL" alt="movieImage">
      
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
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
    selectedMovie: function (movie_id) {
      console.log(movie_id);
      this.$router.push({
        name: "MovieDetail",
        params: {
          movie_id: movie_id,
        },
      })
    },
  },
}
</script>

<style>
.card {
  margin-top: 30px;

  overflow: hidden;
  float: left;      
}
.img {
  width: 290px;
  height: 400px;
  background-color: rgb(0 0 0 / 20%); 
      
}
</style>