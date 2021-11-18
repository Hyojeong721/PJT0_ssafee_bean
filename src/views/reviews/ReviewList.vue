<template>
  <div>
      <h1>Reviews</h1>
      <review-item></review-item>
  </div>
</template>

<script>
import ReviewItem from './ReviewItem.vue'

export default {
    name: 'ReviewList',
    components: {
      ReviewItem
      },
}
</script>

<style>

</style>