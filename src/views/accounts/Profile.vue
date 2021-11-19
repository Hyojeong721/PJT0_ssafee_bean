<template>
  <div>
    <h1>프로필</h1>
    <div>
      <img :src="`http://127.0.0.1:8000${user.avatar_thumbnail}`" alt="">
    </div>
    <div>
      <h2>{{ user.username }}</h2>
      <h4>{{ user.mbti }}</h4>
      <p>{{ user.mileage }}</p>
      <p>카카오페이 연동여부: {{ kakao }}</p>
    </div>
    <div>
      <button>프로필 수정</button>
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
  },
  created: function () {
    const username = this.$store.state.loginUser
    const Django_URL = 'http://127.0.0.1:8000'
    axios({
      method: 'get',
      url: `${Django_URL}/accounts/${username}/`,
      headers: this.setToken()
    })
      .then(res => {
        console.log(res)
        this.user = res.data
        this.$store.dispatch('userInfo', this.user)
      })
      .catch(err => {
        console.log(err)
      })
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

</style>