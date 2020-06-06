<template></template>

<script>
export default {
  mounted() {
    this.onPlusReady(function() {
      plus.geolocation.getCurrentPosition(
        this.geoInf,
        function(e) {
          alert("获取位置信息失败：" + e.message);
        },
        {
          geocode: false
        }
      );
    });
  }
};
</script>

<style>
</style>