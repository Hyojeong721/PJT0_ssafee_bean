<template>
  <div class="app">
    <div id="nav" >
      <nav class="navbar fixed-top navbar-expand-md navbar-light" style="background-color: rgb(33, 54, 27);">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">홈</router-link> 
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to='/movies'>영화</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link"  to='/recommendation'>추천</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link"  to="/reviews">리뷰</router-link> 
              </li>
              <li class="nav-item">
                <input type="text" v-model="userQuery" @keyup.enter="movieSearch">
                <button @click="movieSearch">검색</button>
              </li>
            </ul>

            <ul v-if="isLogin" class="navbar-nav navbar-right ">
              <!-- <span v-if="isLogin"> -->
                <li class="nav-item">
                    <router-link class="nav-link" to='/profile/likes'>찜</router-link> 
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to='/profile'>프로필</router-link> 
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" @click.native="logout" to="#">로그아웃</router-link>
                </li>
                <li v-if="this.$store.state.userInfo.id == 1" class="nav-item">
                  <a href="http://127.0.0.1:8000/admin/">관리자</a>
                </li>
              <!-- </span> -->
            </ul>
            <ul v-else class="navbar-nav navbar-right ">
            <!-- <span v-else> -->
              <li class="nav-item">
                <router-link class="nav-link" to="/signup">회원가입</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">로그인</router-link>
              </li>
            <!-- </span> -->
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
      this.$router.push({ name: 'Home' })
      // this.$router.go()
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
  padding: 35px;
  background-color: rgb(33, 54, 27);
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

body {
  background-color: black;
}


</style>
