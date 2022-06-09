<template>
  <div v-if="youtubeVideo">
    <div class="video-container" style="text-align:center; position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
      <iframe
      :src="videoURL" 
      frameborder="0"
      class="p-3 video-iframe col"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
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