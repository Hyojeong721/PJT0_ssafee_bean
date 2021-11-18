<template>
  <div>
    <li class="list-group-item" @click="selectReview(review.id)">
      <router-link :to="`/reviews/${review.id}`">{{ review.title }}</router-link>
    </li>
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: Object,
  },
  methods: {
    selectReview: function (index) {
      this.$router.push({
        name: 'ReviewDetail',
        params: {
          review_id: index
        }
      })
    },
  },
}
</script>

<style>

</style>