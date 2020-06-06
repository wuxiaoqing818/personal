<template>
  <footer>
    <ul>
      <li>
        <router-link to="/home">
          <i class="wxq-i1"></i>
          <span>微课</span>
        </router-link>
      </li>
      <li>
        <router-link to="/find">
          <i class="wxq-i2"></i>
          <span>发现</span>
        </router-link>
      </li>
      <li>
        <router-link to="/my">
          <i class="wxq-i3"></i>
          <span>我</span>
        </router-link>
      </li>
    </ul>
  </footer>
</template>


<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
footer {
  border-top: 1px solid #eee;
  ul {
    width: 100%;
    height: 1rem;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.22rem;
    li {
      width: 25%;
      text-align: center;
      a {
        display: block;
        color: #cccccc;
        width: 100%;
        height: 100%;
        text-align: center;
        text-decoration: none;
        i {
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto 0.06rem;
        }
      }
    }

    .wxq-i1 {
      background: url("/static/images/home.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i2 {
      background: url("/static/images/find.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i3 {
      background: url("/static/images/my.png") no-repeat;
      background-size: 100% 100%;
    }

    li:nth-of-type(1) .router-link-active i {
      background: url("/static/images/home-active.png") no-repeat;
      background-size: 100% 100%;
    }

    li:nth-of-type(2) .router-link-active i {
      background: url("/static/images/find-active.png") no-repeat;
      background-size: 100% 100%;
    }
    li:nth-of-type(3) .router-link-active i {
      background: url("/static/images/my-active.png") no-repeat;
      background-size: 100% 100%;
    }

    li:nth-of-type(1) .router-link-active span {
      color: #66CCFF;
    }
    li:nth-of-type(2) .router-link-active span {
      color: #66CCFF;
    }
    li:nth-of-type(3) .router-link-active span {
      color: #66CCFF;
    }
  }
}
</style>