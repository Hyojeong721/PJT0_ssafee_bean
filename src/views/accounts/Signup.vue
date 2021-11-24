<template>
  <div name="signup">
    <div class="signup-title">
      <h1>회원가입</h1>
    </div>

    <div class="signup-body">
      <div class="signup-id col-6">
        <div class="input-group input-group-lg row mb-3">
          <label class="input-group-text col-4" for="userid">userID</label>
          <input type="text" class="form-control" id="userid" v-model="credentials.username">
        </div>
      </div>

      <div name="signup-pw" class="col-6">
        <div class="input-group input-group-lg row mb-3">
          <label class="input-group-text col-4" for="password">password</label>
          <input 
          type="password" 
          class="form-control" 
          id="password"
          v-model="credentials.password"
          >
        </div>
        <div class="input-group input-group-lg row mb-3">
          <label class="input-group-text col-4" for="password">비밀번호: </label>
          <input 
            type="password" 
            class="form-control"
            id="passwordConfirmation"
            v-model="credentials.passwordConfirmation"
            @keyup.enter="signup"
          >
        </div>
      </div>

      <div name="login-btn" class="col-6">
        <button type="button" class="btn btn-primary signup-btn" @click="signup">회원가입</button>
      </div>

    </div>
  </div>



</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        avatarThumbnail: null,
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
          this.$router.push({ name: 'Login'})
        })
        .catch(err => {
          swal('오류', err.response.data.error, 'error')
        })
    }
  }
}
</script>

<style>
.signup-title {
  text-align: center;
  display: block;
  margin: 2rem;
}
.signup-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signup-id {
  font-weight: bold;
}
.signup-btn {
  margin-left: 62px;
  margin-top: 30px;
  width: 60%;
  border-radius: 70px;
}
</style>