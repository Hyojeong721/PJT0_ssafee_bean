<template>
  <div>
    <h1>로그인</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="credentials.username" />
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        @keyup.enter="login"
      />
    </div>
    <button @click="login">로그인</button>
    <!-- <GoogleLogin class="big-button" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
  </div>
</template>

<script>
import axios from "axios"
import GoogleLogin from 'vue-google-login'

export default {
  name: "Login",
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
      params: {
        client_id: '527977877033-nkv5b2vo72bgsk6hdsg4f1tl9fq1s0of.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    login: function () {
      const Django_URL = 'http://127.0.0.1:8000'

      axios({
        method: "post",
        url: `${Django_URL}/accounts/api-token-auth/`,
        data: this.credentials,
      })
        .then((res) => {
          localStorage.setItem("jwt", res.data.token);
          this.$emit("login");
          this.$store.dispatch("loginUser", this.credentials)
          this.$router.push({ name: "Profile" })
          // 굳이 profile 경유해야 하는가
          setTimeout(() => {
            this.$router.push({ name: "Home" })
          }, 1);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSuccess(googleUser) {
      console.log(googleUser.getBasicProfile())
    }
  },
}
</script>
