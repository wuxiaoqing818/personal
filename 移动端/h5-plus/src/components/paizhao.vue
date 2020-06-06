<template>
  <div class="scan2">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell" id="device.html" @click="getImage">
        <a class="mui-navigate-right">调用拍照</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
    // 扩展API准备完成后要执行的操作
    plusReady() {
      var ws = plus.webview.currentWebview();
      //pw回车可输出plus.webview
      console.log("hello plus");
    },
    created() {
      // 扩展API是否准备好，如果没有则监听“plusready"事件
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },

    getImage() {
      let cmr = plus.camera.getCamera(); // 获取摄像头对象

      let res = cmr.supportedImageResolutions[0]; // 字符串数组，摄像头支持的拍照分辨率

      let fmt = cmr.supportedImageFormats[0]; // 字符串数组，摄像头支持的拍照文件格式

      console.log("Resolution :" + res + ", Format: " + fmt);

      cmr.captureImage(
        path => {
          alert("调用成功: " + path);
        },

        error => {
          // 拍照操作失败的回调函数

          alert("调用失败: " + error.message);
        },

        { resolution: res, format: fmt } // 摄像头拍照参数
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
