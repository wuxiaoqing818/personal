<template>
  <div class="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: "wxq-app",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
body,
html,
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
