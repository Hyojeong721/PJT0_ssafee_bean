<template>
  <div class="container" tabindex="-1">
    <div class="profile">
      <div class="mb-5">
        <h1>프로필</h1>
      </div>
      <div name="profile-content" class="row">
        <div class="col-6">
          <img :src="profileURL" alt="">
          <input type="file" accept="image/*" @change="fileSrc">
        </div>
        <div class="col-6">
          <h2>사용자: {{ user.username }}</h2>
          <hr>
          <h4>MBTI</h4>
          <select style="width:100px; height:40px;" name="selectMBTI" v-model="user.mbti">
            <option>없음</option>
            <option>ISTJ</option>
            <option>ISTP</option>
            <option>ISFJ</option>
            <option>ISFP</option>
            <option>INTJ</option>
            <option>INTP</option>
            <option>INFJ</option>
            <option>INFP</option>
            <option>ESTJ</option>
            <option>ESTP</option>
            <option>ESFJ</option>
            <option>ESFP</option>
            <option>ENTJ</option>
            <option>ENTP</option>
            <option>ENFJ</option>
            <option>ENFP</option>
          </select>
          <hr>
          <p>마일리지: {{ user.mileage }}</p>
          <p>카카오페이 연동: {{ kakao }}</p>
        </div>
      </div>
      <div class="mt-5">
        <button @click="profileUpdate">프로필 수정</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data: function () {
    return {
      user: {},
      file: '',
      profileURL: 'http://127.0.0.1:8000/accounts/avatars/default.jpg',
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    fileSrc: function (event) {
      this.file = event.target.files[0]
    },
    getUser: function () {
      const username = this.$store.state.loginUser
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'get',
        url: `${Django_URL}/accounts/${username}/`,
        headers: this.setToken()
      })
        .then(res => {
          this.user = res.data
          if (this.user.mbti == 'NULL') {
            this.user.mbti = '없음'
          }
          if (res.data.avatar_thumbnail) {
            this.profileURL = `http://127.0.0.1:8000${res.data.avatar_thumbnail}`
          }
          this.$store.dispatch('userInfo', this.user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    profileUpdate: function() {
      // 이미지 저장 FormData 변수 생성
      var formData = new FormData()
      if (this.file) {
        formData.append('avatar_thumbnail', this.file)
      } else {
        formData.append('avatar_thumbnail', this.user.avatar_thumbnail)
      }
      formData.append('mbti', this.user.mbti)
      formData.append('mileage', this.user.mileage)
      formData.append('pay', this.user.pay)

      const username = this.$store.state.loginUser
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'put',
        url: `${Django_URL}/accounts/${username}/`,
        data: formData,
        headers: {
          'Authorization': `JWT ${localStorage.getItem('jwt')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    this.getUser()
  },
  computed: {
    kakao: function () {
      if (this.user.pay === false) {
        return '아니오'
      } else {
        return '예'
      }
    },
  },
}
</script>

<style>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 30px;
}

</style>