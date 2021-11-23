<template>
  <tr>
    <th scope="row">{{review.id}}</th>
    <td><router-link :to="`/reviews/${review.id}`">{{ review.title }}</router-link></td>
    <td><router-link :to="`/reviews/${review.id}`">{글쓴이 }}</router-link></td>
    <td><router-link :to="`/reviews/${review.id}`">{{createdAt}}</router-link></td>
    <td><router-link :to="`/reviews/${review.id}`">{{ likeusersCnt }}</router-link></td>
  </tr>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewItem',
  props: {
    review: Object,
  },
  data: function () {
    return {
      commentCnt: 0,
      likeusersCnt: 0,
      createdAt: null,
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
    getReview: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/community/${this.review.id}/`,
        headers: this.setToken(),
      })
        .then(res => {
          this.commentCnt = res.data.comment_count
          this.createdAt= res.data.created_at
          this.likeusersCnt = res.data.like_users.length
          
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    this.getReview()
  },
}
</script>

<style>

</style>