<template>
  <div class="movies col" style="align-content: center;">
    <div name="movie" >
      <div id="poster" class="col-lg-2">
        <router-link :to="`/movies/${movie.id}`">
          <div class="poster"  style="width: 296px;">
            <div class="image" :style="{ backgroundImage: 'url(' + imageURL + ')' }"></div>
          </div>
        </router-link>
      </div>
      <div class="movie-title">
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
  border: 1px solid black;
  margin-bottom: 20px;
}
#poster .image {
  width: 100%;
  height: 350px;
  /* max-height: 100%; */
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
}
#poster .movie-title {
  margin-top: 5px;
}
.movies {

}
</style>