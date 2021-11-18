<template>
  <div name="movie" class="col-2 ">
    <div class="card">
      <!-- 카드 누를때 디테일창으로 넘어가는 부분 -->
      <router-link :to="`/movies/${movie.id}`" @click="selectedMovie(movie.id)" style="color: black; text-decoration: none;">
        <div>
          <img class="card-img-top" :src="imageURL" alt="movieImage">    
          <h5 class="card-title">{{ movie.title }}</h5>
          <p>{{ movie.genres }}</p>
        </div>   
      </router-link>
    </div>
  </div>

</template>

<script>

export default {
  name: 'MovieItem',
  props: {
    movie: Object,
  },

  computed: {
    imageURL: function () {
      const movieImage = this.movie.poster_path
      return `https://image.tmdb.org/t/p/original/${movieImage}`
    }
  },

  methods: {
    selectedMovie: function (movie_id) {
      console.log(movie_id)
      this.$router.push ({
        name: 'MovieDetail',
        params: {
          movie_id: movie_id
        }

      })
    }
  },
}
</script>

<style>

</style>