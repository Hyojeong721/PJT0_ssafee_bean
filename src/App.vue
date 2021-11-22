<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">홈</router-link> |
        <router-link to='/movies'>영화</router-link> |
        <router-link to='/recommendation'>추천</router-link> |
        <router-link to="/reviews">리뷰</router-link> |
        <input type="text" v-model="userQuery" @keyup.enter="movieSearch">
        <button @click="movieSearch">검색</button>
      <span v-if="isLogin">
        <router-link to='/profile/likes'>찜</router-link> |
        <router-link to='/profile'>프로필</router-link> |
        <router-link @click.native="logout" to="#">로그아웃</router-link>
      </span>
      <span v-else>
        <router-link to="/signup">회원가입</router-link> |
        <router-link to="/login">로그인</router-link>
      </span>
      <span v-if="this.$store.state.userInfo.id == 1"><a href="http://127.0.0.1:8000/admin/"> | 관리자</a></span>
        
     
    </div>
    <router-view :key="$route.fullPath" @login="isLogin=true"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      userQuery: '',
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      localStorage.removeItem('vuex')
      // this.$router.push({ name: 'Home' })
      this.$router.go()
    },
    movieSearch: function () {
      this.$router.push({
        name: 'MovieSearch',
        query: {
          search_query: this.userQuery,
        }
      })
      this.userQuery= ''
    },
  },
  created: function () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
    }
    this.$store.dispatch('getMovies')
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
