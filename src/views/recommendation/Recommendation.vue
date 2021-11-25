<template>
  <div>
    <!-- <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
      <li><router-link class="dropdown-item text" to="/recommendation/genre">장르별</router-link></li>
      <li><router-link class="dropdown-item text" to="/recommendation/rank">평점별</router-link></li>
      <li><router-link class="dropdown-item text" to="/recommendation/mbti">MBTI</router-link></li>
    </ul> 
   
     <div id="reconav">
      <router-link class="text" to="/recommendation/genre">장르별</router-link> |
      <router-link class="text" to="/recommendation/rank">평점별</router-link> |
      <router-link class="text" to="/recommendation/mbti">MBTI</router-link>
    </div> -->

    <div>
      <genre-reco></genre-reco>
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