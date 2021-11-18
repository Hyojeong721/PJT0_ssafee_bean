<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">홈</router-link> |
        <router-link to='/moviews'>영화</router-link> |
        <router-link to='/recommendation'>추천</router-link> |
        <router-link to="/reviews">리뷰</router-link> |
      <span v-if="isLogin">
        <router-link @click.native="logout" to="#">로그아웃</router-link>
      </span>
      <span v-else>
        <router-link to="/signup">회원가입</router-link> |
        <router-link to="/login">로그인</router-link>
      </span>
     
    </div>
    <router-view @login="isLogin=true"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Home' })
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
    }
  }
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
