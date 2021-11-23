<template>
  <div class="container" id=text>
    <div class="my-5 ">
      <h1>리뷰 작성</h1>
    </div>
    
    <div id="reviewcreatetable">
      <div class="m-3"> 
        <div class="my-2">
          <label for="title" class="form-label m-3" ><h3>제목</h3></label>
          <input id="title" type="text" class="form-control" v-model="title"  placeholder="제목을 입력하세요">
        </div>
        <div class="my-2">
          <label for="content" class="form-label m-3"><h4>내용</h4></label>
          <textarea 
          class="form-control" 
          id="content" 
          rows="3" 
          v-model="content"
          placeholder="내용을 입력하세요"
          >
          </textarea>
        </div>
        <div class="d-md-flex justify-content-end mt-2">
          <input class="btn btn-primary" type="button" value="작성" @click="createReview">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewForm',
  data: function () {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    createReview: function () {
      const token = localStorage.getItem('jwt')
      const review = {
        title: this.title,
        content: this.content,
        user: this.$store.state.userInfo.id,
        movie: 566525,
        created_at: new Date(),
        user_name: this.$store.state.userInfo.username
      }
      if (review.title) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/community/',
          data: review,
          headers: {
            Authorization: `JWT ${token}`
          }
        })
          .then(res => {
            console.log(res)
            this.$router.push({ name: 'ReviewList' })
          })
          .catch(err => {
            console.log(err)
            alert('내용을 입력하세요~^^')
          })
      } else {
        alert('제목을 입력하세요~^^')
      }

    },
  },
}
</script>

<style>
#text {
  color: white;
}
#reviewcreatetable {
  border: 2px solid white;
}
textarea.form-control {
    min-height: calc(17.5em + 0.75rem + 2px);
}
</style>