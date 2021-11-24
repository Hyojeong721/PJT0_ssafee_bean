<template>
  <div id="home">
    <h1 class="px-5 py-3">현재상영작</h1>
    <carousel-3d :controls-visible="true" :width="500" :height="700" :border="0" :controls-width="50" :controls-height="60">
      <slide v-for="(slide, i) in slides" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <router-link router-link :to="`/movies/${movies[i].id}`">
            <img :src="`https://image.tmdb.org/t/p/w500/${movies[i].poster_path}`" alt="" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >=0)}">
          </router-link>
        </template>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import axios from 'axios'
// import NowMovieList from './NowMovieList.vue'
import { Carousel3d, Slide } from 'vue-carousel-3d'

const API_KEY = '65bf23772658c6b898a2865e99430c95'

export default {
  name: 'Home',
  data: function () {
    return {
      movies: [],
      slides: 20
    }
  },
  components: {
    // NowMovieList,
    Carousel3d,
    Slide
  },
  methods: {
    selectedNowMovie: function (now_movie) {
      console.log(now_movie)
      this.$router.push({
        name: "MovieDetail",
        params: {
          movie_id: now_movie,
        },
      })
    },
  },
  created: function () {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`,
    })
      .then ((res) => {
        this.movies = res.data.results
        this.slides = this.movies.length
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
</style>