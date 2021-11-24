<template>
  <div name="movie" class="col-8 col-sm-5 col-md-4 col-lg-2" style="width: 250px; height:400px;">

    <div id="poster">
      <!-- 영화디테일 -->
      <router-link :to="`/movies/${movie.id}`" style="color: black; text-decoration: none">
        <div class="poster">
          <div class="image" :style="{ backgroundImage: 'url(' + imageURL + ')' }">
            <!-- <a :href="`/movies/${movie.id}`"></a> -->
          </div>
          <!-- <img class="img-fluid" :src="imageURL" alt="movieImage" > -->
        </div>
      </router-link>
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
  /* background: burlywood; */
  border: 1px solid black;
  margin-bottom: 20px;
}
#poster .image {
  width: 100%;
  height: 330px;
  /* max-height: 100%; */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid black;
}
#poster .movie-title {
  margin-top: 5px;
}
</style>