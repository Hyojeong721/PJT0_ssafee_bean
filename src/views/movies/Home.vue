<template>
  <div id="home">
    <div>
        <h2 class="p-4 pt-3">현재 상영작</h2>
    </div>
    <carousel-3d v-if="movies" :controls-visible="true" :width="400" :height="550" :border="0" :controls-width="50" :controls-height="60">
      <slide v-for="(slide, i) in slides" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <router-link :to="`/movies/${movies[i].id}`">
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

const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'Home',
  data: function () {
    return {
      movies: this.$store.state.nowMovies,
      slides: 20
    }
  },
  components: {
    // NowMovieList,
    Carousel3d,
    Slide
  },
  methods: {
    getGenres: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
      meethod: 'get',
      url: `${Django_URL}/movies/genre/`
      })
        .then(res => {
          // console.log(res.data)
          this.$store.dispatch('genresList', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`,
    })
      .then((res) => {
        const movies = res.data.results
        this.slides = movies.length
        this.$store.dispatch('nowMovies', movies)
      })
      .catch((err) => {
        console.log(err)
      })
    this.getGenres()
  },
}
</script>

<style>
#home {
  background-color: black;
}
</style>