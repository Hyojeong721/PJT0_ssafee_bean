<template>
  <div>
    <h1>리뷰 작성</h1>
    <label for="title">제목</label>
    <input id="title" type="text" v-model="title">
    <label for="content">내용</label>
    <textarea id="content" type="text" v-model="content"></textarea>
    <button @click="createReview">작성</button>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'ReviewForm',
  data: function () {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    mileageUpdate: function () {
      const token = localStorage.getItem('jwt')
      const Django_URL = 'http://127.0.0.1:8000'
      const userName = this.$store.state.userInfo.username
      const mileage = this.$store.state.userInfo.mileage + 3
      axios({
        method: 'put',
        url: `${Django_URL}/accounts/${userName}/mileage/`,
        data: mileage,
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createReview: function () {
      const token = localStorage.getItem('jwt')
      const Django_URL = 'http://127.0.0.1:8000'
      const review = {
        title: this.title,
        content: this.content,
        user: this.$store.state.userInfo.id,
        movie: 566525,
        created_at: new Date(),
        user_name: this.$store.state.userInfo.username
      }
      if (review.title) {
        axios({
          method: 'post',
          url: `${Django_URL}/community/`,
          data: review,
          headers: {
            Authorization: `JWT ${token}`
          }
        })
          .then(res => {
            console.log(res)
            this.$router.push({ name: 'ReviewList' })
          })
          .catch(err => {
            console.log(err)
            swal('오류', '리뷰 내용을 입력하세요!', 'error')
          })
      } else {
        swal('오류', '리뷰 제목을 입력하세요!', 'error')
      }
    },
  },
}
</script>

<style>

</style>