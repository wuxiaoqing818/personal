<template>
  <div class="home">
    <baidu-map class="map" center="北京">
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
    </baidu-map>
    {{time}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: null
    }
  },
  mounted () {
    let time = new Date()
    this.time = this.$dateFormat(time) // 时间格式处理
    console.log(this.time)
  },
  created () {
    // 请求封装的接口
    this.$http
      .get(
        'shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=' +
          1 +
          '&limit=' +
          10,
        null
      )
      .then(response => {
        console.log(response)
      })
  },
  methods: {}
}
</script>

<style>
.map {
  width: 800px;
  height: 500px;
}
</style>
