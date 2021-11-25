<template>
  <div id="app" class="app body">
    <div id="nav">
      <nav class="navbar fixed-top navbar-expand-md navbar-light" style="background-color: black;">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/"><img src="http://127.0.0.1:8000/static/movies/logo.png" alt="logo" style="width: 60px;"></router-link> 
          <button style="background-color: #603217;" class="navbar-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="nav navbar-nav me-auto mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to='/movies'>영화</router-link> 
              </li>  
              <li class="nav-item dropdown">
                <router-link 
                class="nav-link dropdown-toggle" 
                id="navbarDarkDropdownMenuLink"
                role="button" data-bs-toggle="dropdown" 
                aria-expanded="false" 
                style="color: white; font-weight: normal;"
                to=''>추천</router-link>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><router-link class="dropdown-item text" to="/recommendation/genre">장르별</router-link></li>
                  <li><router-link class="dropdown-item text" to="/recommendation/rank">평점별</router-link></li>
                  <li><router-link class="dropdown-item text" to="/recommendation/mbti">MBTI</router-link></li>
                </ul> 
              </li>     
              <li class="nav-item">
                <router-link class="nav-link"  to="/reviews">리뷰</router-link> 
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0 col-xs-4">
              <input class="form-control mr-sm-2" type="search" placeholder="영화 검색" v-model="userQuery" @keydown.enter.prevent="movieSearch">
            </form>
            <button class="btn btn-outline-success my-2 my-sm-0" @click="movieSearch">검색</button>
            <ul v-if="isLogin" class="navbar-nav navbar-right ">
              <li class="nav-item">
                  <router-link class="nav-link" to='/profile/likes'>찜콩</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to='/profile'>프로필</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" style="color: white; font-weight: normal;" @click.native="logout" to="">로그아웃</router-link>
              </li>
              <li v-if="this.$store.state.userInfo.id == 1" class="nav-item pt-2">
                <a href="http://127.0.0.1:8000/admin/">관리자</a>
              </li>
            </ul>
            <ul v-else class="navbar-nav navbar-right ">
              <li class="nav-item">
                <router-link class="nav-link" to="/signup">회원가입</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">로그인</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
@import url('https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Gothic&display=swap');
html {
  background-color:rgb(20, 21, 23) ;
}

.app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif, 'Jua', sans-serif; */
  font-family: 'Jua', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

#nav {
  padding: 35px;
  font-size: 20px;
  background-color: black;
  font-family: 'Jua', sans-serif;
}
#nav .navbar-brand{
  margin-left: 20px;
}
.navbar-toggler {
  background-color: #603217;
}

#nav a {
  text-decoration: none;
  color: white;
}
#nav a.router-link-exact-active {
  font-weight: bold;
  color: red;
}
li {
  float: left;
  margin-left: 5px;
}
.body {
  background-color: rgb(20, 21, 23);
  color : white;
}
</style>
