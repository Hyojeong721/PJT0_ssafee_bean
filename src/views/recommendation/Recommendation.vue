<template>
  <div>
    <div id="nav">
      <router-link to="/recommendation/genre">장르별 추천</router-link> |
      <router-link to="/recommendation/rank">평점별 추천</router-link> |
      <router-link to="/recommendation/mbti">MBTI 추천</router-link>
    
    </div>
      <div class="mt-3">
        <genre-reco>
        </genre-reco>
      </div>
  </div>
</template>

<script>
import GenreReco from './GenreReco.vue'

export default {
  name:'Recommendation',
  components:{
    GenreReco,
  },
 
}
</script>

<style>

</style>