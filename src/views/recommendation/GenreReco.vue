<template>
  <div id="genreReco">
    <div class="row" style="text-align: center;">
      <h3 class="p-5">원하는 장르를 선택하세요.</h3>
      <div id="genreli" class="mt-3" style="width:810px; float:left; margin:0 auto;">
        <li class="genreli">
          <span @click="onGenre(28)">액션</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(12)">모험</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(16)">애니메이션</span>
        </li>
         <li class="genreli">
          <span @click="onGenre(35)">코미디</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(80)">범죄</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(99)">다큐멘터리</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(18)">드라마</span>
        </li>
        <li class="genreli">  
          <span @click="onGenre(10751)">가족</span>
        </li>
        <li class="genreli">  
          <span @click="onGenre(14)">판타지</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(36)">역사</span>
        </li>  
        <li class="genreli">
          <span @click="onGenre(27)">공포</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10402)">음악</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(9648)">미스터리</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10749)">로맨스</span>
        </li>  
        <li class="genreli">
          <span @click="onGenre(878)">SF</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10770)">TV영화</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(53)">스릴러</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10752)">전쟁</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(37)">서부</span>
        </li>
      </div>

       

        

    </div>
  </div>
</template>

<script>
export default {
  name: 'GenreReco',
  data: function () {
    return {
      genreId: null,
    }
  },
  methods: {
    onGenre: function (genre_id) {
      this.genreId = genre_id
      this.$router.push({
        name: 'GenreRecoDetail',
        params: {
          genre_id: genre_id
        }
      })
    }
  }

}
</script>

<style>
#genreReco {
  background-color: black;
  color: white;
 
}
#genreli  {
  background-color: rgb(39, 36, 36);
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
  margin-bottom: 200px;
  
}
.genreli {
  display: inline-block;
  width: 185px;
  cursor: pointer;
  margin: 20px 5px;
}
</style>