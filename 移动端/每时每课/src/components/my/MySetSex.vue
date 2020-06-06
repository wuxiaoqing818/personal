<template>
  <div class="MySetSex">
    <div class="wxq-header">
      <i class="fa fa-angle-left"></i>
      <span>修改性别</span>
      <span @click="save()">保存</span>
    </div>

    <div class="wxq-content">
      <p @click="setSex1()">
        <span>男</span>
        <i v-show="flag1"></i>
      </p>
      <p @click="setSex2()">
        <span>女</span>
        <i v-show="flag2"></i>
      </p>
    </div>

    <van-picker show-toolbar title="标题" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  created() {
    //接受路由跳转传递的sex值  改变当前样式和sex一致  默认为男
    if (this.$route.query.sex == 1) {
      this.flag2 = true;
      this.flag1 = false;
    } else {
      this.flag1 = true;
      this.flag2 = false;
    }
  },
  data() {
    return {
      flag1: false,
      flag2: false,
      sex: "",
      columns: [
        { id: 1, text: "杭州" },
        { id: 2, text: "宁波" },
        { id: 3, text: "温州" }
      ]
    };
  },
  methods: {
    onCancel() {},
    onConfirm() {},
    setSex1() {
      this.flag1 = true;
      this.flag2 = false;
      this.sex = 0;
    },
    setSex2() {
      this.flag2 = true;
      this.flag1 = false;
      this.sex = 1;
    },
    //返回设置信息页面
    back() {
      this.$router.push("/my-set-message");
    },
    save() {
      this.$axios
        .put(
          "https://test.365msmk.com/api/app/user",
          {
            nickname: this.name,
            sex: this.sex
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          // console.log(res);
          // this.name=res.
        });
      this.$router.push({ path: "/my-set-message", query: { sex: this.sex } });
    }
  }
};
</script>

<style lang="scss">
.MySetSex {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;

  .wxq-header {
    padding: 0 0.2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-bottom: 0.2rem;
    font-size: 0.32rem;

    span:nth-of-type(2) {
      font-size: 0.28rem;
    }
  }

  .wxq-content {
    width: 100%;
    flex: 1;

    p {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0.2rem;
      border-bottom: 1px solid #cccccc;
      background: white;

      i {
        width: 0.3rem;
        height: 0.3rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMTk5NkVCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMTk5NkZCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUExOTk2Q0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUExOTk2REI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvL8dXQAAAHGSURBVHjaYvz//z/DQALGP6F0t1MRiIOB+BEQr2ahs+UaQHwMiAWhfF0mOlrOA8RrkSwHAXt6OmAOEGuhic2ilwMKgDgcTWwuEC+hRyK0AeL9QIyc3s4BsTUQ/6C1AySglkkiib0DYmMgfgDi0DIKQD5eiWY5qNCJgVlOawd0ALEdmlgTEG+nR0EUAipk0MR2ALE3EP+jtQPUgfg0EPMiiT2Axvs7dMVMNChs1qFZ/hMaIu+waWCiQ2GTA8RncWkAOcAAiK8C8VcgngzEbFQsbOZBHYW3NtwJpN2QxECFRhAQf6BWYYNPIygEnqOJOQLxESCWI6GwWYVm+XtolfuDkGaQA4qA+DiauDYQnwBiPTILm2jkwoaQA0Cp0wmaepEByNBDWAoTkgsbYltEIMf0QhMTMgAFYyQQbyC3sCG1SVYCxF0gOSSxv0CcCcSz8RQ2D4HYCFd+J7VNGAetr9GbbLVAPAGIT6Ll95/QFH+Wmo1SL2gQc6GJgxKXAppYKqH8Tm6r2BKItwCxEB41oMImmZbNck0gBhVWsljkiCpsCGVDQuA6jvi9BMT+lFhOanXMDMQ+0EIKVHfsAuLvFPeMBrprBhBgADxzbshcfaUMAAAAAElFTkSuQmCC)
          no-repeat 100%;
        background-size: 100% 100%;
      }
    }
    p:last-of-type {
      border-bottom: none;
    }
  }
}
</style>