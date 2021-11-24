<template>
  <div id="reviewdetailtext">
    <div name="page" class="tablesytle">
      <div name="board-top" class="board-wrap">
        <div class="detail-head">
          <div class="line-set">
            <span class="text-group">리뷰</span>
            <span class="review-title">{{ review[0].title }}</span>
          </div>
          <div class="status">
            <span class="img">
              <div class="mask" :style="{backgroundImage:'url('+imageURL+')'}"></div>
            </span>
            <span class="name">{{ review[0].user_name }}</span>
            <div class="date">{{ review[0].created_at | moment('YYYY-MM-DD hh:mm') }}</div>
            <!-- <i class="fas fa-heart" style="color: red "></i> -->
            <span class="like-num">
              <i class="fas fa-heart" style="color: red "></i>  {{ likeCount }}
            </span>
          </div>
        </div>
        <div class="datail-body">
          <div name="update_delete">
            <div class="update-delete">
              <span class="mx-2" style="cursor: pointer;" v-if="this.$store.state.userInfo.id == review[0].user" data-bs-toggle="modal" data-bs-target="#reviewModal">수정</span>
              <sapn style="cursor: pointer;" v-if="this.$store.state.userInfo.id == review[0].user" @click="deleteReview">삭제</sapn>
            </div>
          </div>
          <div v-html="content"></div>
        </div>
      </div>
      <div name="like" class="detail-util">
        <button type="button" class="btn btn-md btn-favor">
          <i
          v-if="liked"
          class="fas fa-heart"
          style="color: red "
          @click="updateLikes"
          ></i>
          <i
            v-else
            class="far fa-heart"
            style="color: white"
            @click="updateLikes"
          ></i>
          좋아요
        </button>  
      </div>
      <div name="coment">
        <h2>댓글</h2>
        <div class="coment-create">
          <div class="textarea">
            <div style="margin-bottom: 6px;">
              <textarea class="form-control noresize" v-model="userComment.content" placeholder="댓글을 입력하세요." id="answerCont" maxlength="4000"></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="commentCreate">등록</button>
            </div>
          </div>
        </div>
        <div class="comment-list">
          <div >
            <comment class="comment" v-for="comment in comments" :key="comment.id" :comment="comment">
              <!-- <div name="comment-user-info" >
                <span class="img">
                <div class="mask" :style="{backgroundImage:'url('+commentImageURL+')'}"></div>
                </span>
                <span class="comment-name">{{ comment.username }}</span>
                <div class="commnet-date">{{ comment.created_at | moment('YY-MM-DD | hh:mm') }}</div>
              </div>
              <div class="mt-3">{{ comment.content }}</div>
              <div v-if="comment.username == loginUser" class="d-flex justify-content-end mb-2" >
                <button @click="commentDelete(comment.id)">삭제</button>
              </div> -->
            </comment>
          </div>
        </div>
      </div>

    </div>
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
import Comment from './Comment.vue'

export default {
  name: 'ReviewDetail',
  components: {
    Comment
  },
  data: function () {
    return {
      loginUser: this.$store.state.loginUser,
      usersAvatar: this.$store.state.usersAvatar,
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
        thumb: '',
      },
    }
  },
  computed: {
    content() { 
      return this.review[0].content.split('\n').join('<br>')
    },
    imageURL() {
      const review = this.review
      const revUser = this.usersAvatar.filter(function (user) {
        if (user.username == review[0].user_name) {
          return user
        }
      })
      return `http://127.0.0.1:8000${revUser[0].avatar_thumbnail}`
    },
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
    padding: 40px 20px 20px;
}
.board-wrap .detail-head .text-group {
    line-height: 20px;
    font-size: 30px;
    font-weight: 1000;
    vertical-align: middle;
    color: rgb(82 43 28);
    margin-right: 20px;
}
.board-wrap .detail-head .review-title {
    margin: 13px 0 0;
    display: inline-block;
    font-size: 45px;
    line-height: 18px;
    max-width: 830px;
}
.line-set {
  margin-bottom: 20px;
}
.name {
    display: inline-block;
    vertical-align: top;
    line-height: 50px;
}
.board-wrap .status .date {
    position: relative;
    margin-left: 20px;
    line-height: 50px;
    display: inline-block;
    vertical-align: top;
}
.mask {
    position: relative;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: blue;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    margin-right: 20px;
}
.board-wrap .datail-body {
    padding: 16px;
    font-size: 18px;
    line-height: 30px;
    color: white;
    border-bottom: 1px solid #e3e7eb;
    word-break: break-all;
}
.detail-util {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
}
.like-num {
  display: block;
  float: right;
  margin-top: 20px;
}
.detail-util .btn{
  color: white;
  border: 1px solid white;
}
.update-delete {
  display: flex;
  justify-content: flex-end;
}
.board-wrap .coment-create {
    padding: 20px;
    background: #fafbfc;
    border: 1px solid #e3e7eb;
}
.textarea textarea {
    width: 100%;
    min-height: 120px;
    border: 0;
    font-size: 14px;
    resize: none;
}
.comment {
  margin-top: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid oldlace;
}
.comment-list {
  margin-top: 40px;
  border-top: 1px solid #e3e7eb;
}
.comment-name{
  display: inline-block;
  vertical-align: top;
  /* line-height: 20px; */
}
.commnet-date {
  font-size: 12px;
  display: inline;
}
</style>