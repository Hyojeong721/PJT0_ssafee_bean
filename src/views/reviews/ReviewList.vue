<template>
  <div>
    <h1>영화 리뷰</h1>
    <router-link to="/reviews/create">리뷰 작성</router-link>
    <review-item
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    >
    </review-item>
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
          // console.log(res)
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

</style>