<template>
  <div>
    <div>
      <h1>리뷰 정보</h1>
      <h3>제목: {{ review[0].title }}</h3>
      <p>내용: {{ review[0].content }}</p>
      <p>생성시각: {{ review[0].created_at }}</p>
      <p>수정시각: {{ review[0].updated_at }}</p>
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
      <button v-if="this.$store.state.userInfo.id == review[0].user" data-bs-toggle="modal" data-bs-target="#reviewModal">수정</button>
        <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="exampleModalLabel">제목</h3>
                <input type="text" v-model="review[0].title">
              </div>
              <div class="modal-body">
                <h5>내용</h5>
                <input type="text" v-model="review[0].content">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="updateReview">저장</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              </div>
            </div>
          </div>
        </div>
      <button v-if="this.$store.state.userInfo.id == review[0].user" @click="deleteReview">삭제</button>
    </div>
    <div>
      <h2>댓글</h2>
      <input type="text" v-model="userComment.content" @keyup.enter="commentCreate">
      <button @click="commentCreate">등록</button>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.username }}
        {{ comment.content }}
        {{ comment.created_at }}
        <button @click="commentDelete(comment.id)">삭제</button>
      </li>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewDetail',
  data: function () {
    return {
      review: {},
      liked: false,
      likeCount: null,
      comments: {},
      update: {
        title: '',
        content: '',
      },
      userComment: {
        content: '',
        created_at: '',
        user: '',
        username: '',
      },
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
    updateReview: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      const review = {
        title: this.review[0].title,
        content: this.review[0].content,
        user: this.$store.state.userInfo.id,
        movie: 566525,
        created_at: this.review[0].created_at,
        updated_at: new Date()
      }
      if (review.title) {
        axios({
          method: 'put',
          url: `${Django_URL}/community/${this.review[0].id}/`,
          data: review,
          headers: this.setToken()
        })
          .then(res => {
            console.log(res)
            // this.$router.push({ 
            //   name: 'ReviewDetail',
            //   params: {
            //     review_id: this.review[0].id
            //   }
            // })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    deleteReview: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'delete',
        url: `${Django_URL}/community/${this.review[0].id}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$router.push({ name: 'ReviewList' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateLikes: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${Django_URL}/community/${this.review[0].id}/likes/`,
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
    getLikeInfo: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/community/${this.review[0].id}/likes/`,
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
    getComments: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/community/${this.review[0].id}/comments/`,
        headers: this.setToken()
      })
      .then(res => {
        this.comments = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    commentCreate: function () {
      this.userComment.created_at = new Date()
      console.log(this.userComment.created_at)
      this.userComment.user = this.$store.state.userInfo.id
      this.userComment.username = this.$store.state.userInfo.username
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${Django_URL}/community/${this.review[0].id}/comments/`,
        data: this.userComment,
        headers: this.setToken()
      })
        .then(() => {
          this.userComment.content = ''
          this.getComments()
        })
        .catch(err => {
          console.log(err)
        })
    },
    commentDelete: function (comment_id) {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'delete',
        url: `${Django_URL}/community/${this.review[0].id}/comments/${comment_id}`,
        headers: this.setToken()
      })
      .then(() => {
        this.getComments()
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function () {
    const index = this.$route.params.review_id
    const reviews = this.$store.state.selectedReview
    const res = reviews.filter(function (rev) {
      if (rev.id == index) {
        return rev
      }
    })
    this.review = res
    this.getLikeInfo()
    this.getComments()
  },
}
</script>

<style>

</style>