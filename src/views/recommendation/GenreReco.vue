<template>
  <div>
    <h3>원하는 장르를 선택하세요.</h3>
      <ul class="box row">
        <a class="li">
          <div>
            <span @click="onGenre(28)">액션</span>
          </div>
        </a>
        <li class="li">
          <div> 
            <span @click="onGenre(12)">모험</span>
          </div>
        </li>
        <li class="li">
          <div>
            <span @click="onGenre(16)">애니메이션</span>
          </div>
        </li>
        <li>
          <div>
            <span @click="onGenre(35)">코미디</span>
          </div>
        </li>
          <span @click="onGenre(80)">범죄</span>
          <span @click="onGenre(99)">다큐멘터리</span>
          <span @click="onGenre(18)">드라마</span>
          <span @click="onGenre(10751)">가족</span>
          <span @click="onGenre(14)">판타지</span>
          <span @click="onGenre(36)">역사</span>
          <span @click="onGenre(27)">공포</span>
          <span @click="onGenre(10402)">음악</span>
          <span @click="onGenre(9648)">미스터리</span>
          <span @click="onGenre(10749)">로맨스</span>
          <span @click="onGenre(878)">SF</span>
          <span @click="onGenre(10770)">TV영화</span>
          <span @click="onGenre(53)">스릴러</span>
          <span @click="onGenre(10752)">전쟁</span>
          <span @click="onGenre(37)">서부</span>

       

        

      </ul>
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
.li {
  list-style: none;
  text-decoration: none;
  cursor: pointer;
}
</style>