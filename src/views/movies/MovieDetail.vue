<template>
  <div class="card row">
    <div class="card-body offset-md-3 col-6">
      <h2>{{ movie.title }}</h2>
      <vue-star-rate
        :rateRange="rankData.user_rank"
        :maxIcon="5"
        :iconHeight="22"
        :iconWidth="22"
        :hasCounter="true"
        iconShape="star"
        @ratingSet="myRating"
      ></vue-star-rate>
      <i
        v-if="liked"
        class="fas fa-heart"
        style="color: red"
        @click="updateLikes"
      ></i>
      <i
        v-else
        class="far fa-heart"
        style="color: black"
        @click="updateLikes"
      ></i>
      <span>{{ likeCount }}</span>명이 좋아합니다.
      <img :src="imageURL" alt="movie image" class="card-img-top" />
      <p class="card-text">{{ movie.story }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// vue 별점 기능 구현 라이브러리
import vueStarRate from 'vue-js-star-rating'

export default {
  name: 'MovieDetail',
  components: {
    vueStarRate,
  },
  data: function () {
    return {
      movie: null,
      liked: false,
      likeCount: 0,
      rankData: {
        user_rank: 0,
        user: this.$store.state.userInfo.id,
        movie: 0,
      },
    };
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("jwt")
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config;
    },
    updateLikes: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${Django_URL}/movies/${this.movie.id}/likes/`,
        headers: this.setToken(),
      })
        .then((res) => {
          const { liked, likeCount } = res.data
          this.liked = liked;
          this.likeCount = likeCount;
        })
        .catch((err) => {
          console.log(err)
        })
    },
    myRating: function (rating) {
      this.rankData.user_rank = rating
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${Django_URL}/movies/${this.movie.id}/rank/`,
        data: this.rankData,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },

  computed: {
    imageURL: function () {
      const movieImage = this.movie.poster_path
      return `https://image.tmdb.org/t/p/original/${movieImage}`
    },
  },

  created: function () {
    const now_movie = this.$route.params.now_movie
    const movie_id = this.$route.params.movie_id
    const movies = this.$store.state.movies
    if (movie_id) {
      const selectedmovie = movies.filter((movie) => {
        if (movie.id == movie_id) {
          return movie
        }
      })
      this.movie = selectedmovie[0]
      console.log(this.movie)
      this.rankData.movie = selectedmovie[0].id
      this.rankData.user = this.$store.state.userInfo.id
    } else {
      console.log(now_movie)
      this.movie = now_movie
    }
    const Django_URL = 'http://127.0.0.1:8000'
    const token = localStorage.getItem("jwt")
    // 좋아요 GET
    axios({
      method: "get",
      url: `${Django_URL}/movies/${this.movie.id}/likes/`,
      headers: {
        Authorization: `JWT ${token}`
      },
    })
      .then((res) => {
        const { liked, likeCount } = res.data
        this.liked = liked
        this.likeCount = likeCount
      })
      .catch((err) => {
        console.log(err)
      })
    // 평점 GET
    axios({
      method: 'get',
      url: `${Django_URL}/movies/${this.movie.id}/rank/`,
      headers: {
        Authorization: `JWT ${token}`
      },
    })
      .then(res => {
        this.rankData.user_rank = res.data.user_rank
        console.log(this.rankData.user_rank)
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<style>
</style>