<template>
  <div id="reviewtable">
    <div>
      <h2 class="m-4">리뷰 게시판</h2>
    </div>
    <div class="table-sytle">
      <table class="table table-dark table-hover table-bordered">
        <thead>
          <tr class="col">
            <th scope="col">게시번호</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">좋아요 수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <review-item
            v-for="review in reviews"
            :key="review.id"
            :review="review"
          >
          </review-item>
        </tbody>  
      </table>
    </div>

    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

    <div name="create-btn" align="right" class="btnsytle pb-1">
      <router-link id="review-create" class="btn" to="/reviews/create">리뷰 작성</router-link>
    </div>

  </div>
</template>

<script>
import ReviewItem from './ReviewItem.vue'
import axios from 'axios'
export default {
  name: 'ReviewList',
  components: {
    ReviewItem,
  },
  data: function () {
    return {
      reviews: [],
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
    getReviews: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken()
      })
        .then(res => {
          console.log(res.data)
          this.reviews = res.data
          this.$store.dispatch('selectedReview', this.reviews)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUsersAvatar: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/',
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$store.dispatch('usersAvatar', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getReviews()
      this.getUsersAvatar()
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
}
</script>

<style scoped>
#review-create {
  background-color: #603217;
  border: 1px solid rgb(31,32,35);
  color: white;
  font-weight: 500;
}
thead {
  color: white;
  font-size: 20px;
}
.table {
  background-color: rgb(31, 32, 35);
}
.btnsytle {
  width: 65%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.table-sytle {
  width: 65%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>