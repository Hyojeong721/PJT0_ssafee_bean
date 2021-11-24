<template>
  <div name="login-from" class="container">
    <div class="login-title">
      <h1>로그인</h1>
    </div>
    <div class="login-body">
      <div class="login-id col-6">
        <div class="input-group input-group-lg row mb-3">
          <label class="input-group-text col-4" for="userid">userID</label>
          <input type="text" class="form-control" id="userid" v-model="credentials.username">
        </div>
      </div>
      
      <div name="login-pw" class="col-6">
        <div class="input-group input-group-lg row mb-3">
          <label class="input-group-text col-4" for="password">password</label>
          <input 
          type="password" 
          class="form-control" 
          id="password"
          v-model="credentials.password"
          @keyup.enter="login"
          >
        </div>
      </div>

      <div name="login-btn" class="col-6">
        <button type="button" class="btn btn-primary login-btn" @click="login">로그인</button>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
    }
  },
  components: {

  },
  methods: {
    login: function () {
      const Django_URL = 'http://127.0.0.1:8000'

      axios({
        method: 'post',
        url: `${Django_URL}/accounts/api-token-auth/`,
        data: this.credentials,
      })
        .then((res) => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$store.dispatch('loginUser', this.credentials)
          this.$router.push({ name: 'Profile' })
          // 굳이 profile 경유해야 하는가
          setTimeout(() => {
            this.$router.push({ name: 'Home' })
          }, 1);
        })
        .catch(() => {
          swal('오류', '잘못된 정보를 입력하였습니다.', 'error')
        })
    },
  },
}
</script>

<style>
.login-title {
  text-align: center;
  display: block;
  margin: 2rem;
}
.login-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-id {
  font-weight: bold;
}
.login-btn {
  margin-left: 62px;
  margin-top: 30px;
  width: 60%;
  border-radius: 70px;
}

</style>