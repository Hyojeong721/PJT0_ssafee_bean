<template>
  <div v-if="youtubeVideo">
    <div class="video-container">
      <iframe
      :src="videoURL" 
      frameborder="0"
      class="p-3 video-iframe"
      height="auto"
      width="100%"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YoutubeVideo',
  props: {
    youtubeVideo: Object,
  },
  computed: {
    videoURL: function () {
      const id = this.youtubeVideo.id.videoId
      return `https://www.youtube.com/embed/${id}`
    }
  }

}
</script>

<style>

</style>