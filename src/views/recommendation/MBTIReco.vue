<template>
  <div class="card row">
    <div class="card-body offset-md-3 col-6">
      <h3>{{ this.$store.state.loginUser }}님 MBTI 기준 추천</h3>
      <h4>{{ this.$store.state.userInfo.mbti }}</h4>
      <button @click="getMBTIMovies">추천 받기</button>
      <div class="row jstify-content-md-center">
        <movie-item v-for="movie in movies" :key="movie.id" :movie="movie"></movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '../movies/MovieItem.vue'
import axios from 'axios'
import _ from 'lodash'
import swal from 'sweetalert'

export default {
  name: 'MbtiReco',
  components: {
    MovieItem,
  },
  data: function () {
    return {
      movies: [],
      mbtiID: {
        'ISTJ': 1,
        'ISTP': 2,
        'ISFJ': 3,
        'ISFP': 4,
        'INTJ': 5,
        'INTP': 6,
        'INFJ': 7,
        'INFP': 8,
        'ESTJ': 9,
        'ESTP': 10,
        'ESFJ': 11,
        'ESFP': 12,
        'ENTJ': 13,
        'ENTP': 14,
        'ENFJ': 15,
        'ENFP': 16,
      },
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
    getMBTIMovies: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      const MBTIID = this.mbtiID[this.$store.state.userInfo.mbti]
      axios({
        method: 'get',
        url: `${Django_URL}/movies/recommendation/mbti/${MBTIID}/`,
        headers: this.setToken(),
      })
        .then(res => {
          console.log(res)
          const MBTIMovies = res.data
          this.movies = _.sampleSize(MBTIMovies, 3)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    this.getMBTIMovies()
    if (this.$store.state.userInfo.mbti == '없음') {
      swal({
        title: '알림',
        text: '프로필 페이지에서 MBTI를 설정하세요',
        icon: 'warning',
        button: '확인',
        // onClose() {
        //   this.$router.push({ name: 'Profile' })
        // }
      })
    }
  },
}
</script>

<style>

</style>