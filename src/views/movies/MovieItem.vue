<template>
  <div>
    <li>
      {{movie.title}}
    </li>    
  </div>
</template>

<script>
export default {
  name:'MovieItem',
  props:{
    movie: Object,
  },
  methods: {},
}
</script>

<style>

</style>