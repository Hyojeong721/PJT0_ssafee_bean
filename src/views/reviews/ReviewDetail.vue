<template>
  <div id="reviewdetailtext">

    <div name="page" class="tablesytle">
     
      <div name="review" class="board-wrap">
        <div class="detail-head">
          <div class="line-set">
            <span class="text-group">리뷰</span>
            <span class="review-title">{{ review[0].title }}</span>
          </div>

        </div>

      </div>

      <div name="like">  
        <span>{{ likeCount }}</span>명이 좋아합니다.
      </div>

      <div name="update_delete">
        <button v-if="this.$store.state.userInfo.id == review[0].user" data-bs-toggle="modal" data-bs-target="#reviewModal">수정</button>
        <button v-if="this.$store.state.userInfo.id == review[0].user" @click="deleteReview">삭제</button>
      </div>
  
      <div name="coment">
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
    

    <!-- <div name="page">
      <div class="m-3">
        <h1>리뷰 정보</h1>
      </div>

      <div>
        <h3>제목: {{ review[0].title }}</h3>
        <p>내용: </p>
        <div v-html="content"></div>
        <p>작성자: {{ review[0].user_name }}</p>
        <p>생성시각: {{ review[0].created_at | moment('YYYY-MM-DD') }}</p>
        <p>수정시각: {{ review[0].updated_at | moment('YYYY-MM-DD') }}</p>
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
      </div>
    </div> -->

    <div id="modalpage">
      <div class="modal" tabindex="-1" id="reviewModal" aria-labelledby="reviewModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">리뷰 수정</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="my-2">
                <label for="title" class="form-label m-3" ><h5 class="modal-title" id="exampleModalLabel">제목</h5></label>
                <input id="title" type="text" v-model="review[0].title">
              </div>
              <div class="my-2">
                <label for="content" class="form-label m-3"><h5>내용</h5></label>
                <textarea 
                class="form-control" 
                id="content" 
                rows="3" 
                v-model="review[0].content"
                placeholder="내용"
                >
                </textarea>
              </div>
            </div>  
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal"  @click="updateReview" >Save changes</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
            </div>
          </div>
        </div>
      </div>
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
  computed: {
    content() { 
      return this.review[0].content.split('\n').join('<br>')
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
        updated_at: new Date(),
        user_name: this.$store.state.userInfo.username
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
#reviewdetailtext {
  color: white;
}
#modalpage {
  color: black;
}
.board-wrap .detail-head {
    position: relative;
    padding: 15px 0 20px;
}
.board-wrap .detail-head {
    position: relative;
    border-top: 1px solid #24282b;
    border-bottom: 1px solid #e3e7eb;
    padding: 16px 20px 20px;
}
.board-wrap .detail-head .text-group {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    vertical-align: middle;
    color: #3c90e2;
}
.board-wrap .detail-head .title {
    margin: 13px 0 0;
    /* vertical-align: middle; */
    display: block;
    line-height: 18px;
    max-width: 830px;
}
</style>