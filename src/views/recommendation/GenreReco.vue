<template>
  <div id="genre-reco">
    <div class="title-nav row">
      <div id="mbti-reco-title" class="col-4">
        <h2 v-if="this.$store.state.loginUser" class="row m-0 pt-4 p-4 pb-0">{{ this.$store.state.loginUser }}님</h2>
        <h2 v-else class="row m-0 pt-4 p-4 pb-0">비회원님</h2>
        <h4 class="row m-0 p-4 pt-3">장르 기준 추천</h4>
      </div>
      <div name="genre-reco-mbti" class="col-4 center-center">
        <h1 style="font-weight: bold;">장르를 선택하세요.</h1>
      </div>
    </div>

    <div class="row" style="text-align: center;">
      <div id="genreli" class="mt-5" style="width:810px; margin:0 auto;">
        <li class="genreli">
          <span @click="onGenre(28, '액션')">액션</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(12, '모험')">모험</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(16, '애니메이션')">애니메이션</span>
        </li>
         <li class="genreli">
          <span @click="onGenre(35, '코미디')">코미디</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(80, '범죄')">범죄</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(99, '다큐멘터리')">다큐멘터리</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(18, '드라마')">드라마</span>
        </li>
        <li class="genreli">  
          <span @click="onGenre(10751, '가족')">가족</span>
        </li>
        <li class="genreli">  
          <span @click="onGenre(14, '판타지')">판타지</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(36, '역사')">역사</span>
        </li>  
        <li class="genreli">
          <span @click="onGenre(27, '공포')">공포</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10402, '음악')">음악</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(9648, '미스터리')">미스터리</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10749, '로맨스')">로맨스</span>
        </li>  
        <li class="genreli">
          <span @click="onGenre(878, 'SF')">SF</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10770, 'TV영화')">TV영화</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(53, '스릴러')">스릴러</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(10752, '전쟁')">전쟁</span>
        </li>
        <li class="genreli">
          <span @click="onGenre(37, '서부')">서부</span>
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
    onGenre: function (genreID, genreName) {
      this.$store.dispatch('genreName', genreName)
      this.genreID = genreID
      this.$router.push({
        name: 'GenreRecoDetail',
        params: {
          genre_id: genreID
        },
      })
    }
  }

}
</script>

<style>
#genreReco {
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