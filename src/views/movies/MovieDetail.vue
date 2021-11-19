<template>
  <div class="card row ">
      <div class="card-body offset-md-3 col-6">
        <h2>{{ movie.title }}</h2>
        <img :src="imageURL" alt="movie image" class="card-img-top">
        <p class="card-text">{{ movie.story }}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'MovieDetail',
    data: function () {
        return {
            movie: null,
        }
    },

    computed: {
        imageURL: function () {
        const movieImage = this.movie.poster_path
        return `https://image.tmdb.org/t/p/original/${movieImage}`
        }
    },
    
    created: function () {
        // const now_movie = this.$route.params.now_movie
        const movie_id = this.$route.params.movie_id
        const movies = this.$store.state.movies
        if (movie_id) {
            const selectedmovie = movies.filter((movie) => {
                if (movie.id == movie_id) {
                    return movie
                }
            })
            this.movie = selectedmovie[0]
        }
    }
  
}
</script>

<style>

</style>