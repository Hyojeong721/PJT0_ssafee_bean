<template>
  <div>
    <h1>리뷰 작성</h1>
    <label for="title">제목</label>
    <input id="title" type="text" v-model="title">
    <label for="content">내용</label>
    <input id="content" type="text" v-model="content">
    <button @click="createReview">작성</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewForm',
  data: function () {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    createReview: function () {
      const token = localStorage.getItem('jwt')
      const review = {
        title: this.title,
        content: this.content,
        //user: 1, // 현재 로그인한 유저의 id 입력
        //movie: , // 영화 리스트 중 선택하게끔 변경해야 함
      }
      if (review.title) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/community/',
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
          })
      }
    },
  },
}
</script>

<style>

</style>