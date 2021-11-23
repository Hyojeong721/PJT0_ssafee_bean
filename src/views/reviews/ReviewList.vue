<template>
  <div id="reviewtable" style="color: white; text-decoration: none;">
    <div class="m-3">
      <h1>영화 리뷰</h1>
    </div>
    <div align="right" class="btnsytle py-3">
      <router-link id="reviewcreate" class="btn" to="/reviews/create">리뷰 작성</router-link>
    </div>
    <div class="tablesytle">
      <table class="table table-dark table-hover table-bordered">
        <thead>
          <tr class="col">
            <th scope="col">게시번호</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">작성일</th>
            <th scope="col">좋아요 수</th>
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
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getReviews()
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
}
</script>

<style>
#reviewcreate {
  background-color: thistle;
  color: yellow;
}
#reviewtable {
  margin: 30px;
}
a {
  color: white;
  text-decoration: none;
}
thead {
  color: white;
  font-size: 20px;
}
.btnsytle {
  width: 65%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.tablesytle {
  width: 65%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>