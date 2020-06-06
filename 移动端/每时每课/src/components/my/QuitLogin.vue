<template>
  <div class="QuitLogin">
    <div class="wxq-header">
      <i class="fa fa-angle-left" @click="back()"></i>
      <span>设置</span>
      <p></p>
    </div>
    <div class="wxq-content">
      <div class="wxq-top" @click="newPass()">
        <span>设置密码</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="wxq-bottom">
        <button @click="quitLogin()">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push("/person");
    },
    newPass() {
      this.$router.push("/my-set-new-pass");
    },
    quitLogin() {
      this.$store.commit("quitLogin");
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss">
.QuitLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eeeeee;

  .wxq-header {
    padding: 0 0.2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    background: white;
    font-size: 0.36rem;
    margin-bottom: 0.2rem;
    justify-content: space-between;

    i {
      font-size: 0.56rem;
    }

    span {
      margin-left: 2rem;
    }

    p {
      width: 2rem;
    }
  }

  .wxq-content {
    width: 100%;
    flex: 1;

    .wxq-top {
      padding: 0 0.2rem;
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      font-size: 0.32rem;

      i {
        font-size: 0.48rem;
      }
    }

    .wxq-bottom {
      padding: 1.6rem 0.2rem 0.8rem;
      background: white;
      button {
        width: 100%;
        height: 0.9rem;
        border: none;
        outline: none;
        background: #eb6100;
        background-size: 100% 100%;
        color: white;
        border-radius: 5px;
        font-size: 0.36rem;
      }
    }
  }
}
</style>