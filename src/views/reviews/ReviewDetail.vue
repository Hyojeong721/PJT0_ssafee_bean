<template>
  <div>
    <h1>리뷰 정보</h1>
    <h3>제목: {{ review[0].title }}</h3>
    <p>내용: {{ review[0].content }}</p>
    <p>생성시각: {{ review[0].created_at }}</p>
    <p>수정시각: {{ review[0].updated_at }}</p>
    <button v-if="this.$store.state.userInfo.id == review[0].user" @click="deleteReview">삭제</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewDetail',
  data: function () {
    return {
      review: {},
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
    deleteReview: function () {
      const id = this.review[0].id
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${id}/`,
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
    console.log(this.review)
  },
}
</script>

<style>

</style>