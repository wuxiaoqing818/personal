<template>
  <div class="find">
    <header>发现</header>
    <div class="scan" @click="startRecognize">
      <dl>
        <dt>
          <img src="../../../static/images/find-active.png" alt />
        </dt>
        <dd>
          <p>扫一扫</p>
          <p>扫码充值、看课、发现更多精彩</p>
        </dd>
      </dl>
    </div>
    <div id="bcid" :style="{zIndex:zIndex}"></div>
    <i @click="shareInfo">分享</i>
    <i @click="shareInfo2">分享2</i>
    <Footer></Footer>
  </div>
</template>

<script>
import http from "../http/http";
import Footer from "@/components/footer/footer";
import {
  commonShare,
  shareTitle,
  shareUrl,
  shareImg,
  shareDesc
} from "../../../static/js/share";
import share2 from "../../../static/js/share2";
let scan = null;
export default {
  name: "find",
  components: { Footer },
  data() {
    return {
      text: "",
      codeUrl: "",
      scan: "",
      zIndex: -1
    };
  },
  mounted() {},
  methods: {
    shareInfo() {
      //第一个分享的封装
      commonShare(
        this,
        "shareTitle",
        "../../../static/images/find-active.png",
        "../../../static/images/find-active.png",
        "shareDesc"
      );
    },
    shareInfo2() {
      //第二个封装的分享
      share2.wxShowMenu();
    },
    //扫码
    //初始化扫描控件
    startRecognize() {
      this.zIndex = 9999;
      let that = this;
      if (!window.plus) {
        return;
      }
      // 初始化扫描控件
      this.scan = new plus.barcode.Barcode("bcid");
      this.scan.onmarked = onmarked;
      // 调用开始扫描
      this.startScan();
      // 扫描后回调
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        // 返回值
        Toast(result);
        that.zIndex = -1;
        that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      this.scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      that.zIndex = -1;
      this.scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      this.scan.close();
    }
  }
};
</script>

<style lang="scss">
.find {
  width: 100%;
  height: 100%;

  header {
    height: 1rem;
    background: white;
    line-height: 1rem;
    text-align: center;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .scan {
    padding: 0.2rem;
    img {
      width: 0.6rem;
    }
    dl {
      background: white;
      padding: 0.2rem 0.4rem;
      display: flex;
      align-items: center;

      dt {
        margin-right: 0.4rem;
      }
    }
  }
}
</style>