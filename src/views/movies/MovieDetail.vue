<template>
  <div id="movie-detail" class="card row">
    <div class="card-body offset-md-2 col-8">
      <div name="movie-header">
        <div class="movie-title">
          <span>{{ movie.title }}</span>
        </div>
        <div class="movie-original-title">
          <span>&lt; {{ movie.original_title }} &gt;</span>
        </div>
      </div>
      
      <div name="movie-detail" class="row mt-5">
        <div name="movie-image" class="col-6">
          <img :src="imageURL" alt="movie image" class="card-img-top" />
        </div>

        <div id="movie-content" class="col-6">
          <div class="rank">
            <div name="tmdb" class="rank-frame row" >
              <div class="tmdb-rank-title col-6">
                <span>평점</span>
              </div>
              <div class="rank col">
                {{ movie.rank }}
              </div>
            </div>
            <div name="user" class="rank-frame row" >
              <div class="tmdb-rank-title col-6">
                <span>사용자 평점 </span>
              </div>
              <div class="rank col">
                콩 들어갈 곳
              </div>
            </div>
          </div>

          <div class="movie-info row">
            <div name="movie-genre" class="mt-2">
              <span style="font-weight: bold;">장르&nbsp; | &nbsp;</span>
              <span v-for="(genre, idx) in genres" :key="idx">
                {{ genre }} &nbsp;
              </span> 
            </div>
            <div name="movie-related-date" >
              <div class="movie-genre mt-2">
                <span style="font-weight: bold;">개봉일&nbsp; | &nbsp;</span>
                <span >{{ movie.release_date }}</span>
              </div>
            </div>
          </div> 

          <div name="i-want-see">
            <div name="movie-like" class="col my-2">
              <span>
                <i
                  v-if="liked"
                  class="fas fa-heart"
                  style="color: red"
                  @click="updateLikes"
                ></i>
                <i
                  v-else
                  class="far fa-heart"
                  style="color: white"
                  @click="updateLikes"
                ></i>
              </span>
                찜콩 +
            </div> 
          </div> 

          <div class="movie-story">
            <div class="movie-story-title mb-2">
              줄거리
            </div>
            <div>
              {{ movie.story }}
            </div>

          </div>

        </div>

          <div name="movie-user-rank">
            <vue-star-rate v-if="rankData.user_rank" :rateRange="rankData.user_rank" :maxIcon="5" :iconHeight="22" :iconWidth="22" :hasCounter="true" iconShape="bean" @ratingSet="myRating"></vue-star-rate>
            <vue-star-rate v-else :rateRange="0" :maxIcon="5" :iconHeight="22" :iconWidth="22" :hasCounter="false" iconColor="#603217" iconColorHover="#603217" iconShape="tablets" @ratingSet="myRating"></vue-star-rate>
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
        
            <!-- <span>{{ likeCount }}</span>명이 좋아합니다. -->
          <p class="card-text">{{ movie.story }}</p>
          <youtube-video :youtubeVideo="youtubeVideo"></youtube-video>
        </div>




      </div>
    </div>
  </div>
</template>

<script>
import YoutubeVideo from './YoutubeVideo.vue'
import axios from 'axios'
// vue 별점 기능 구현 라이브러리
import vueStarRate from 'vue-js-star-rating'
import swal from 'sweetalert'

const API_KEY = 'AIzaSyCHmkc02QIBqLGdUPBCmQ_XHLk1CayQUzs'
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'MovieDetail',
  components: {
    YoutubeVideo,
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
      youtubeVideo: '',
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
    getYoutubeVideo: function () {
      const params = {
        key: API_KEY,
        part: 'snippet',
        q: this.movie.title + ' 공식 예고편',
        type: 'video',
      }

      axios({
        method: 'get',
        url: API_URL,
        params: params,
      })
        .then(res => {
          console.log(res)
          const youtubeVideos = res.data.items
          this.youtubeVideo = youtubeVideos[0]
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
    this.getYoutubeVideo()
  },
}
</script>

<style>
  #movie-detail {
    background-color: rgb(20, 21, 23);
  }
#movie-detail .movie-title {
  text-align: center;
  margin: 10px;
  font-weight: bold;
  font-size: 50px;
}
#movie-detail .movie-original-title {
  text-align: center;
  margin: 2px;
  font-size: 20px;
}
.rank-frame {
  margin-bottom: 5px;
  font-size: 15px;
}
.rank-frame .tmdb-rank-title {
  background-color: #633111;
  border: 2px solid rgb(56, 56, 56);
}
.rank-frame .rank {
  border: 2px solid rgb(56, 56, 56);
}
.movie-info {
  font-size: 10px;
}
.movie-story {
  font-size: 12px;
}
.movie-story-title {
  font-size: 13px;
  font-weight:700;
}

</style>