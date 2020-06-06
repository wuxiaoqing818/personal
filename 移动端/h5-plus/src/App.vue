<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeCreate() {
    document.addEventListener(
      "plusready",
      function() {
        let uuid = plus.device.uuid;
      },
      false
    );
  }
};
</script>

<style>
</style>
