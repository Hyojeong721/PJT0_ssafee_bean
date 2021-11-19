<template>
  <div>
    <h1>회원가입</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input 
        type="text" 
        id="username"
        v-model="credentials.username"
      >
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input 
        type="password" 
        id="password"
        v-model="credentials.password"
      >
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인: </label>
      <input 
        type="password" 
        id="passwordConfirmation"
        v-model="credentials.passwordConfirmation"
        @keyup.enter="signup"
      >
    </div>
    <!-- <div>
      <label for="avatarThumbnail">사진 등록: </label>
      <input 
        type="file"
        id="avatarThumbnail"
        v-model="credentials.avatarThumbnail"
      >
    </div> -->
    <button @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        avatarThumbnail: null,
        // mbti: null,
        // mileage: null,
        // pay: false,
      }
    }
  },
  methods: {
    signup: function () {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'post',
        url: `${Django_URL}/accounts/signup/`,
        data: this.credentials
      })
        .then(() => {
          // console.log(res)
          this.$router.push({ name: 'Login'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
