<template>
  <div class="card row">
    <div class="card-body offset-md-3 col-6">
      <h2>{{ movie.title }}</h2>
      <i
      
        id="heart-btn"
        class="far fa-heart"
        style="color: red"
        @click="updateLikes"
      ></i>
      <i
        
        id="heart-btn"
        class="fas fa-heart"
        style="color: black"
        @click="updateLikes"
      ></i>
      <span id="like-count">{{ movie.like_users[0] }}</span>명이 좋아합니다.
      <img :src="imageURL" alt="movie image" class="card-img-top" />
      <p class="card-text">{{ movie.story }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MovieDetail',
    data: function () {
      return {
        movie: null,

      }
    },
    methods: {
      setToken: function () {
        const token = localStorage.getItem('jwt')
        const config = {
          Authorization: `JWT ${token}`
        }
        return config
    },
      updateLikes: function () {
        const Django_URL = 'http://127.0.0.1:8000'
        axios({
          method: 'post',
          url: `${Django_URL}/movies/${this.movie.id}/likes/`,
          headers: this.setToken()
        })
        // 이 코드 말고, vue ..! class-bind 사용하기
          .then(res => {
            const {liked, likeCount} = res.data
            console.log(liked, likeCount)
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
      }
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
      } else {
          console.log(now_movie)
          this.movie = now_movie
      }
      console.log(this.movie)
    },
}
</script>

<style>
  /* .liked {
    class: far 
  }
  .disliked {

  } */
</style>