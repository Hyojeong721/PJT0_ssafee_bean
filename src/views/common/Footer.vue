<template>
  <footer class="row">
    <section class="col-4">
      <img src="http://127.0.0.1:8000/static/movies/logo.png" alt="">
    </section>
    <section class="row col-4">
      <div class="col-6">
        <p>영화 더 보기</p>
        <p>영화 추천</p>
        <p>커뮤니티</p>
      </div>
      <div class="col-6">
        <p>찜콩</p>
        <p>프로필</p>
      </div>
    </section>
    <section class="col-4">
      <b-button href="https://github.com/dudqo225/ssafee_bean_server"><b-icon icon="github" aria-hidden="true" font-scale="2"></b-icon></b-button>
      <b-button><b-icon icon="facebook" aria-hidden="true" font-scale="2"></b-icon></b-button>
      <b-button><b-icon icon="instagram" aria-hidden="true" font-scale="2"></b-icon></b-button>
    </section>
    <section>
      <p>Copyright © 2021 SSAfee Bean All right reserved.</p>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
footer {
  border-top: 1px solid #35495e; 
  text-align: center; 
  font-size: 16px; 
  color: rgb(146, 146, 146); 
  margin: 200px 0 0 0;
  padding-top: 20px;
}
footer img {
  width: 100px;
  height: 100px;
}
section p {
  margin: 0 auto;
  padding: 0 auto;
}
</style>