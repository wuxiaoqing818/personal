<template>
  <footer>
    <ul>
      <li>
        <router-link to="/home">
          <i class="wxq-i1"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/course">
          <i class="wxq-i2"></i>
          <span>课程</span>
        </router-link>
      </li>
      <li>
        <router-link to="/a">
          <i class="wxq-i3"></i>
          <span>约课记录</span>
        </router-link>
      </li>
      <li>
        <router-link to="/lian">
          <i class="wxq-i4"></i>
          <span>练习</span>
        </router-link>
      </li>
      <li>
        <router-link to="/person">
          <i class="wxq-i5"></i>
          <span>我的</span>
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
  ul {
    width: 100%;
    height: 1rem;
    background: #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
          width: 0.4rem;
          height: 0.4rem;
          margin: 0 auto;
        }
      }
    }

    .wxq-i1 {
      background: url("/static/images/home.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i2 {
      background: url("/static/images/course.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i3 {
      background: url("/static/images/study.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i4 {
      background: url("/static/images/edit.png") no-repeat;
      background-size: 100% 100%;
    }
    .wxq-i5 {
      background: url("/static/images/my.png") no-repeat;
      background-size: 100% 100%;
    }

    li:nth-of-type(1) .router-link-active i {
      background: url("/static/images/home-active.png") no-repeat;
      background-size: 100% 100%;
    }
    li:nth-of-type(2) .router-link-active i {
      background: url("/static/images/course-active.png") no-repeat;
      background-size: 100% 100%;
    }
    li:nth-of-type(3) .router-link-active i {
      background: url("/static/images/study-active.png") no-repeat;
      background-size: 100% 100%;
    }
    li:nth-of-type(4) .router-link-active i {
      background: url("/static/images/edit-active.png") no-repeat;
      background-size: 100% 100%;
    }
    li:nth-of-type(5) .router-link-active i {
      background: url("/static/images/my-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>