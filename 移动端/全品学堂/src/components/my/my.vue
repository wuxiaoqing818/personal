<template>
  <div class="my">
    <header>
      <dl class="logo">
        <dt @click="goInfo">
          <img src="../../../static/images/my-active.png" alt />
        </dt>
        <dd>
          <p>暖风来了</p>
          <div>
            <i class="fa fa-home"></i>
            <span>个人主页</span>
          </div>
        </dd>
      </dl>
    </header>
    <router-link to="my-login">
      <h1>去登录</h1>
    </router-link>
    <router-link to="/my-set-message">
      <h1>去修改信息</h1>
    </router-link>
    <Footer></Footer>
  </div>
</template>

<script>
import http from "../http/http";
import Footer from "@/components/footer/footer";
export default {
  name: "my",
  components: { Footer },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goInfo() {
      this.$router.push("/set-info");
    }
  }
};
</script>


<style lang="scss">
.my {
  width: 100%;
  height: 100%;

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .logo {
    width: 100%;
    height: 3rem;
    background: #87cefa;
    padding: 1rem 0.4rem;
    display: flex;
    align-items: center;

    dt {
      width: 1rem;
      height: 1rem;
      margin-right: 0.2rem;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    dd {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 0.34rem;
        color: white;
      }

      div {
        padding: 0.02rem 0.14rem;
        background: rgba($color: #000000, $alpha: 0.2);
        font-size: 0.24rem;
        border-radius: 0.2rem;
        color: white;
      }
    }
  }
}
</style>