<template>
  <div class="MySetPass">
    <div class="wxq-header">
      <i class="fa fa-angle-left" @click="back()"></i>
      <span>设置密码</span>
      <span @click="jump()">跳过</span>
    </div>

    <div class="wxq-content">
      <p>
        <input
          type="password"
          placeholder="请设置登陆密码"
          v-model="setPass"
          @blur="blur1()"
          @focus="focus1()"
          :class="flag1"
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="请再次输入密码"
          v-model="surePass"
          @blur="blur2()"
          @focus="focus2()"
          :class="flag2"
        />
      </p>

      <button @click="sub()">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setPass: "",
      surePass: "",
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
    //点击跳过不保存密码
    jump() {
      this.$router.push("/my-set-message");
    },
    //点击提交保存密码
    sub() {
      let regPass = /^(.){6,20}$/;
      if (!regPass.test(this.setPass)) {
        this.$toast({
          message: "密码 必须在 6 到 20 个\n字符之间"
        });
      } else if (this.setPass != this.surePass) {
        this.$toast({
          message: "两次密码不一致"
        });
      } else {
        this.$axios;

        var token = this.$store.state.user.userInfo.remember_token;
        http(
          "post",
          "https://test.365msmk.com/api/app/password",
          {
            mobile: sessionStorage.getItem("userPhone"),
            password: this.setPass,
            sms_code: sessionStorage.getItem("userMessage")
          },
          token
        ).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: res.data.msg
            });
            this.$router.push("/my-set-message");
          } else if (res.data.code) {
            this.$toast({
              message: res.data.msg
            });
          }
        });
      }
    },
    //设置密码页面返回登陆页面
    back() {
      this.$router.push("/my-sms-login");
    }
  }
};
</script>

<style lang="scss">
.MySetPass {
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
      font-size: 0.22rem;
      color: #999999;
    }
  }

  .wxq-content {
    background: white;
    width: 100%;
    flex: 1;
    padding: 0 0.2rem;

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

    button {
      width: 100%;
      height: 0.9rem;
      border: none;
      outline: none;
      background: #eb6100;
      background-size: 100% 100%;
      color: white;
      margin-top: 0.46rem;
      border-radius: 5px;
    }
  }
}
</style>