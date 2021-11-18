<template>
  <div>
    <h1>영화 리뷰</h1>
    <router-link to="/reviews/create">리뷰 작성</router-link>
    <review-item></review-item>
  </div>
</template>

<script>
import ReviewItem from './ReviewItem.vue'
// import axios from 'axios'

export default {
  name: 'ReviewList',
  components: {
    ReviewItem
    },
}
</script>

<style>

</style>