<template>
  <div>
    <div name="comment-user-info" >
      <span class="img">
        <div class="mask" :style="{backgroundImage:'url('+commentImageURL+')'}"></div>
      </span>
      <span class="comment-name">{{ comment.username }}</span>
      <div class="commnet-date">{{ comment.created_at | moment('YY-MM-DD | hh:mm') }}</div>
    </div>
    <div class="mt-3 mb-3">{{ comment.content }}</div>
    <div v-if="comment.username == loginUser" class="d-flex justify-content-end mb-2" >
      <button @click="commentDelete(comment.id)">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comment',
  props: {
    comment: Object,
  },
  data: function () {
    return {
      loginUser: this.$store.state.loginUser,
      usersAvatar: this.$store.state.usersAvatar,
    }
  },
  computed: {
    commentImageURL() {
      const comment = this.comment
      const comUser = this.usersAvatar.filter(function (user) {
        if (user.username == comment.username) {
          return user
        }
      })
      if (comUser[0].avatar_thumbnail) {
        return `http://127.0.0.1:8000${comUser[0].avatar_thumbnail}`
      } else {
        return 'http://127.0.0.1:8000/accounts/avatars/default.jpg'
      }
    },
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    commentDelete: function (comment_id) {
      const Django_URL = 'http://127.0.0.1:8000'
      axios({
        method: 'delete',
        url: `${Django_URL}/community/${this.comment.review}/comments/${comment_id}`,
        headers: this.setToken()
      })
      .then(() => {
        this.$router.go()
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
}
</script>

<style>

</style>