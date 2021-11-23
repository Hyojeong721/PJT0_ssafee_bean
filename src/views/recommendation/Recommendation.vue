<template>
  <div>
    <div id="reconav">
      <router-link class="text" to="/recommendation/genre">장르별</router-link> |
      <router-link class="text" to="/recommendation/rank">평점별</router-link> |
      <router-link class="text" to="/recommendation/mbti">MBTI</router-link>
    </div>

    <div class="">
      <genre-reco></genre-reco>
      <rank-reco></rank-reco>
      <mbti-reco></mbti-reco>
    </div>

  </div>
</template>

<script>
import GenreReco from './GenreReco.vue'
import RankReco from './RankReco.vue'
import MbtiReco from './MbtiReco.vue'

export default {
  name:'Recommendation',
  components:{
    GenreReco,
    RankReco,
    MbtiReco,
  },
 
}
</script>

<style>
#reconav {
  padding: 19px;
  background-color: black;
}
.text {
  text-decoration: none;
  color: white;
  font-size: 18px;
}
</style>