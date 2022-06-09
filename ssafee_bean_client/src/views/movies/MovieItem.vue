<template>
  <div class="movies col" style="align-content: center;">
    <div name="movie" class="continer row movie-poster-card">
      <div id="poster" class="col-3" style="width: 100%; height: 400px; line-height: 100px; text-align: center">
        <router-link :to="`/movies/${movie.id}`">
          <img :src="imageURL" style="height: 100%; max-height: 390px; vertical-align: middle" alt="포스터">
        </router-link>
      </div>
      <div class="movie-title col" style="text-align: center;">
        <p>{{ movie.title }}</p>
      </div>
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
#poster {
  /* border: 1px solid black; */
  margin-bottom: 15px;
}
#poster .movie-title {
  margin-top: 5px;
}
.movie-poster-card {
  justify-content: center;
  flex-direction: column;
}
</style>