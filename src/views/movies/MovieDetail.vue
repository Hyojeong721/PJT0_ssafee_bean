<template>
  <div id="movie-detail" class="card row">
    <span v-for="(title, idx) in genres" :key="idx">
        {{ title }}
    </span>
    <div class="card-body offset-md-2 col-8">
      <div class="movie-title">
        <span>{{ movie.title }}</span>
      </div>
      
      <div name="movie-content" class="row">
        <div name="movie-image" class="col-6">
          <img :src="imageURL" alt="movie image" class="card-img-top" />
        </div>
        <div class="col-6">
          <div name="movie-user-rank">
            <vue-star-rate v-if="rankData.user_rank" :rateRange="rankData.user_rank" :maxIcon="5" :iconHeight="22" :iconWidth="22" :hasCounter="true" iconShape="star" @ratingSet="myRating"></vue-star-rate>
            <vue-star-rate v-else :rateRange="0" :maxIcon="5" :iconHeight="22" :iconWidth="22" :hasCounter="true" iconShape="star" @ratingSet="myRating"></vue-star-rate>
            <button v-if="rankData.user_rank" data-bs-toggle="modal" data-bs-target='#rankModal'>수정</button>
            <div class="modal fade" id="rankModal" tabindex="-1" aria-labelledby="rankModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">평점</h3>
                    <vue-star-rate
                      :rateRange="0"
                      :maxIcon="5"
                      :iconHeight="22"
                      :iconWidth="22"
                      :hasCounter="true"
                      iconShape="star"
                      @ratingSet="myRatingUpdate"
                    ></vue-star-rate>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="reload">닫기</button>
                  </div>
                </div>
                
              </div>
            </div>
            <button v-if="rankData.user_rank" @click="myRatingDelete">삭제</button>
          </div>
        
          <div name="movie-like">
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
          </div>
          
          <p class="card-text">{{ movie.story }}</p>
        </div>

      </div>


      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// vue 별점 기능 구현 라이브러리
import vueStarRate from 'vue-js-star-rating'
import swal from 'sweetalert'

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
        user_rank: this.$store.state.userRank,
        user: this.$store.state.userInfo.id,
        movie: 0,
      },
      rankID: 0,
      genres_name: [],
    };
  },
  methods: {
    reload: function () {
      this.$router.go()
    },
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
          this.rankData.user_rank = rating
          this.getUserRank()
        })
        .catch(err => {
          console.log(err)
        })
    },
    myRatingUpdate: function (rating) {
      this.rankData.user_rank = rating
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'put',
        url: `${Django_URL}/movies/${this.movie.id}/rank/${this.rankID}/`,
        data: this.rankData,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          swal('완료', res.data.message, 'success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    myRatingDelete: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'delete',
        url: `${Django_URL}/movies/${this.movie.id}/rank/${this.rankID}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getUserRank()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserLikes: function () {
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
    },
    getUserRank: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      const token = localStorage.getItem("jwt")
      // 평점 GET
      axios({
        method: 'get',
        url: `${Django_URL}/movies/${this.movie.id}/rank/`,
        headers: {
          Authorization: `JWT ${token}`
        },
      })
        .then(res => {
          this.rankID = res.data.id
          const userRank = res.data.user_rank
          this.rankData.user_rank = userRank
          this.$store.dispatch('userRank', userRank)
        })
        .catch(() => {
          const userRank = 0
          this.rankData.user_rank = userRank
          this.$store.dispatch('userRank', userRank)
        })
    },
  },
  computed: {
    imageURL: function () {
      const movieImage = this.movie.poster_path
      return `https://image.tmdb.org/t/p/original/${movieImage}`
    },
    genres: function () {
      const genres = this.movie.genres
      const genresList = this.$store.state.genresList
      const genresName = this.genres_name
      console.log(genresName)
      for (var i= 0; i < genres.length; i ++) {
        // console.log(genres.length)
        for (var j= 0; j < genresList.length; j ++) {
          // console.log(j)
          if (Object.values(genresList[j]).includes(genres[i])) {
            genresName.push(genresList[j].name)
          }
        }
      }
      return genresName
    },
  },
  created: function () {
    const movie_id = this.$route.params.movie_id
    const movies = this.$store.state.movies
    if (movie_id) {
      const selectedmovie = movies.filter((movie) => {
        if (movie.id == movie_id) {
          return movie
        }
      })
      this.movie = selectedmovie[0]
      this.rankData.movie = selectedmovie[0].id
      this.rankData.user = this.$store.state.userInfo.id
    }
    this.getUserLikes()
    this.getUserRank()
  },
}
</script>

<style>
#movie-detail .movie-title {
  text-align: center;
  margin: 1rem;
  font-weight: bold;
  font-size: 60px;
}
</style>