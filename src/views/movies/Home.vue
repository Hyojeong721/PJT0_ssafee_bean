<template>
  <div id="home">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel"> 
      <div class="carousel-inner"> 
        <now-movie-list
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        >
        </now-movie-list>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NowMovieList from './NowMovieList.vue'

const API_KEY = '65bf23772658c6b898a2865e99430c95'

export default {
    name :'Home',
    data: function () {
        return {
          movies: [],
        }
    },
    components: {
        NowMovieList,
    },

    created: function () {
      axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`,
          // params: {
          //     api_key: API_KEY,
          //     language: 'ko-KR',
          // }
      })
        .then ((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
   


}
</script>

<style>
#home {
  background-color: black;
}
/* .carousel {
  width: 640px;
  height: 720px;
}


.carousel-inner{
  width:auto;
  height:790px; 
}
.carousel-item{
  width: auto;
  height:100%;
}
.d-block {
  display:block;
  width: 100%;
  height: 100%;
} */
</style>