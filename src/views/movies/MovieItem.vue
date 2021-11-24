<template>
  <div name="movie" class="col-6 col-md-2 col-sm-4" >
    <!-- 영화디테일 -->
    <router-link
      :to="`/movies/${movie.id}`"
      @click="selectedMovie(movie.id)"
      style="color: black; text-decoration: none"
    >
    </router-link>
  

    <div id="poster">
      <div class="container p-0">
        <img class="image img-fluid" :src="imageURL" alt="movieImage">
      </div>
      <p style="border: 1px solid white">{{movie.title}}</p>
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
.container #poster {
  /* background: burlywood; */
  border: 2px solid red;
  margin-bottom: 20px;
}
#poster .image{
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>