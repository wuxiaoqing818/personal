<template>
  <div class="freeArea">
    <div class="movie-video">
      <video
        controls
        autoplay
        loop
        src="http://vodcdn.video.taobao.com/oss/taobao-ugc/790a1d211eeb47f99cb7f937e31af277/1502937456/video.mp4"
        ref="video"
      ></video>
    </div>
    <button @click="closeVideo">关闭视频</button>
    <button @click="startVideo">开始播放</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.video.pause();
  },
  methods: {
    startVideo() {
      console.log(this.$refs);
      this.$refs.video.play();
    },
    closeVideo() {
      this.$refs.video.pause();
    }
  }
};
</script>

<style lang="scss">
.freeArea {
  width: 100%;
  height: 100%;

  .movie-video {
    padding: 0 0.4rem;
    height: 4rem;
    width: 100%;

    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>