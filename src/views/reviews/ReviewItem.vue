<template>
  <div>
    <li class="list-group-item">
      <router-link :to="`/reviews/${review.id}`">{{ review.title }}[{{ commentCnt }}]{{ review.user_name }}{{ review.created_at | moment('YYYY-MM-DD')}}</router-link>
      {{ review.created_at | moment("from", "now") }}
    </li>
  </div>
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