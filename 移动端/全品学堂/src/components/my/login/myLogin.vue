<template>
  <div class="MyLogin">
    <div class="wxq-header">
      <i class="fa fa-angle-left"></i>
    </div>
    <div class="wxq-content">
      <div class="wxq-logo">
        <img
          src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
          alt
        />
      </div>

      <div class="wxq-write">
        <p :class="flag1">
          <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur1()" @focus="focus1()" />
        </p>
        <p :class="flag2">
          <input type="password" placeholder="请输入密码" v-model="pass" @blur="blur2()" @focus="focus2()" />
        </p>
        <div>
          <span>找回密码</span>
          <span @click="smsLogin()">注册/验证码登录</span>
        </div>
        <button @click="login()">登录</button>
      </div>
    </div>
    <!-- <div class="wxq-fix">
      <i></i>
    </div>-->
  </div>
</template>

<script>
import http from "../../http/http";
export default {
  name: "MyLogin",
  data() {
    return {
      phone: "",
      pass: "",
      flag1: "",
      flag2: ""
    };
  },
  methods: {
    //input获取失去焦点改变p的样式
    focus1() {
      this.flag1 = "active";
    },
    blur1() {
      this.flag1 = "";
    },
    focus2() {
      this.flag2 = "active";
    },
    blur2() {
      this.flag2 = "";
    },
    //点击登录
    login() {
      let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let regPass = /^(.){6,20}$/;

      if (!regPhone.test(this.phone)) {
        this.$toast({
          message: "手机号码的格式不正确"
        });
      } else if (!regPass.test(this.pass)) {
        this.$toast({
          message: "密码 必须在 6 到 20 个\n字符之间"
        });
      } else {
        http(
          "post",
          "https://test.365msmk.com/api/app/login",
          {
            mobile: this.phone,
            password: this.pass,
            type: 1
          },
          null
        ).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: res.data.msg
            });
            this.$store.commit("setUserInfo", res.data.data);
            // sessionStorage.setItem("token", res.data.data.remember_token);
            this.$router.push("/person");
          } else if (res.data.code) {
            this.$toast({
              message: res.data.msg
            });
          }
        });
      }
      // this.$router.push("/person");
    },
    //点击切换验证码登录
    smsLogin() {
      this.$router.push("/my-sms-login");
    }
  }
};
</script>

<style lang="scss">
.MyLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;

  .wxq-header {
    width: 100%;
    height: 0.83rem;
    display: flex;
    align-items: center;
    margin-left: 0.27rem;

    i {
      font-size: 0.35rem;
    }
  }

  .wxq-content {
    width: 100%;
    flex: 1;
    padding: 0.94rem 0.65rem 0;
    .wxq-logo {
      width: 100%;
      margin-bottom: 1rem;
      img {
        width: 5.11rem;
        margin-left: 0.5rem;
      }
    }

    .wxq-write {
      width: 100%;

      p {
        border-bottom: 1px solid #cccccc;
        input {
          width: 100%;
          height: 1rem;
          padding: 0.4rem 0;
          border: none;
          outline: none;
          font-size: 0.27rem;
          color: #c2c2c2;
        }
      }

      //input获取失去焦点 改变p标签的下边框
      .active {
        border-bottom: 1px solid red;
      }
      div {
        padding-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.22rem;
        color: #999;
        margin-bottom: 1.1rem;
      }
      button {
        width: 100%;
        height: 0.9rem;
        border: none;
        outline: none;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAsAAACECAYAAAD2k6KpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTA4NTY0QkFCNzM3MTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTA4NTY0QkJCNzM3MTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNzRCQjQyN0I3MzIxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNzRCQjQyOEI3MzIxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu/n5g8AAAwlSURBVHja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);
        background-size: 100% 100%;
        color: white;
      }
    }
  }
  //   .wxq-fix {
  //     width: 0.62rem;
  //     height: 0.62rem;
  //     position: fixed;
  //     right: 0.2rem;
  //     bottom: 1rem;
  //     background-color: rgb(0, 122, 255);
  //     box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 14px;
  //     border-radius: 50%;
  //   }
}
</style>