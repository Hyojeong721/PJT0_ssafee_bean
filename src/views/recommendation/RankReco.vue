<template>
  <div id="rank-reco">
    <div class="title-nav row">
      <div id="rank-reco-title" class="col-4">
        <h2 class="row m-0 pt-4 p-4 pb-0">{{ this.$store.state.loginUser }}님</h2>
        <h4 class="row m-0 p-4 pt-3">평점 기준 추천</h4>
      </div>
    </div>

    <div name="rank-reco-main">
      <div id="rank-reco-movie" class="m-4 mb-2 container mx-auto" >
        <div id="rank-movie" class="movie-list row">
          <movie-item v-for="movie in myBestMovie" :key="movie.id" :movie="movie"></movie-item>
        </div>
      </div>
      <div id="rank-btn" class="row offset-5 col-1">
        <button @click="getMBTIMovies">다시 추천</button>
      </div>
    </div>

    <!-- <div id="rank-reco-main">
      <div class="mt-5 center-center">
        <div name="rank-reco-main-movie">
          <movie-item v-for="movie in myBestMovie" :key="movie.id" :movie="movie"></movie-item>
        </div>
        <div name="rank-reco-main-btn">
          <button @click="rankReco">추천 받기</button>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import MovieItem from '../movies/MovieItem.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'RankReco',
  components: {
    MovieItem,
  },
  data: function () {
    return {
      myBestMovie: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt")
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config;
    },
    bestMovie: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      const userID = this.$store.state.userInfo.id
      axios({
        method: 'get',
        url: `${Django_URL}/movies/recommendation/rank/${userID}/`,
        headers: this.setToken(),
      })
        .then(res => {
          const movies = res.data
          const bestMovies = movies.filter((movie) => {
            if (movie.user_rank == 5) {
              return movie
            }
          })
          const allMovies = this.$store.state.movies
          const bestMovie = _.sample(bestMovies)
          this.myBestMovie = allMovies.filter((movie) => {
            if (movie.id == bestMovie.movie) {
              return movie
            }
          })
          console.log(this.myBestMovie)
        })
        .catch(err => {
          console.log(err)
        })
    },
    rankReco: function () {
      const genreID = _.sample(this.myBestMovie[0].genres)
      this.$router.push({
        name: 'GenreRecoDetail',
        params: {
          genre_id: genreID
        }
      })
    },
  },
  created: function () {
    this.bestMovie()
  },
}
</script>

<style>
#rank-reco-main {
  align-content: center;
}

#rank-reco-movie #rank-movie {
  justify-content: center;
}
</style>