<template>
  <div class="lian">
    <header>练习</header>
    <div class="wxq-content">
      <div class="list">
        <ul>
          <router-link to="/ti" tag="li">
            <img src="/static/img-lian/1.jpg" />
            <p>考点专练</p>
          </router-link>

          <router-link to="/tao" tag="li">
            <img src="/static/img-lian/2.jpg" />
            <p>套卷练习</p>
          </router-link>
          <router-link to="/fang" tag="li">
            <img src="/static/img-lian/3.jpg" />
            <p>仿真模考</p>
          </router-link>
          <router-link to="/cuo" tag="li">
            <img src="/static/img-lian/4.jpg" />
            <p>错题练习</p>
          </router-link>
          <router-link to="/ce" tag="li">
            <img src="/static/img-lian/5.jpg" />
            <p>测评记录</p>
          </router-link>
          <router-link to="/xi" tag="li">
            <img src="/static/img-lian/6.jpg" />
            <p>习题收藏</p>
          </router-link>
        </ul>
      </div>
      <div class="down">
        <p>近期模考</p>
        <div>
          <p>默认排序</p>
          <p>时间</p>
        </div>
        <div>
          <img src="/static/img-lian/r.jpg" />
          <p>暂无模考计划，敬请期待</p>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer";
export default {
  name: "Lian",
  components: { Footer },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.lian {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;

  .wxq-content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
  }
}
header {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  background: white;
  font-size: 0.4rem;
}
.list {
  width: 7.1rem;
  margin: 0.22rem 0.2rem;
  height: 3.64rem;
  background: white;
  border-radius: 0.1rem;
  ul {
    width: 100%;
    height: 3.64rem;
    display: flex;

    align-items: center;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: 50%;
      text-align: center;
      img {
        width: 0.82rem;
        height: 0.82rem;
        margin: 0.2rem 0;
      }
      p {
        font-size: 0.24rem;
        color: #7d8f98;
      }
    }
  }
}
.down {
  width: 100%;
  height: 4.88rem;
  background: white;
  & > p {
    height: 0.88rem;
    line-height: 0.88rem;
    margin-left: 0.26rem;
    color: #9d9d9d;
  }
  & > div:nth-of-type(1) {
    width: 7rem;
    margin: 0 0.25rem;
    display: flex;
    justify-content: space-between;
    & > p {
      font-size: 0.2rem;
      color: #9d9d9d;
    }
  }
  & > div:nth-of-type(2) {
    width: 100%;

    text-align: center;
    img {
      width: 1.72rem;
      height: 2.32rem;
      margin: 0.4rem 0 0.3rem 0;
    }
    p {
      color: #9d9d9d;
      font-size: 0.2rem;
    }
  }
}
</style>