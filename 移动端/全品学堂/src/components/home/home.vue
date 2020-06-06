<template>
  <div class="home">
    <!-- 头部开始 -->
    <header>
      <p></p>
      <h5 v-show="navBarFlag">微课</h5>
      <div>
        <i class="fa fa-search"></i>
        <i class="fa fa-arrows-alt"></i>
      </div>
    </header>
    <!-- 学科导航 -->
    <div class="main">
      <dl class="title">
        <dt>微课</dt>
        <dd @click="pickGrade">
          <span>{{title}}</span>
          <span></span>
        </dd>
      </dl>
      <!-- 选择学科 -->
      <ul class="nav" :class="navBarFlag == true ? 'navBarFixed' :''">
        <li
          v-for="(item,index) in navList"
          :key="item.id"
          @click="pickClass(item)"
          :class="classId==item.id?'classActive':''"
        >{{item.name}}</li>
      </ul>
    </div>
    <div v-show="viewFlag">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 首页核心功能开始 -->
      <ul class="region">
        <li>
          <img src="../../../static/images/home-active.png" alt />
          <p>每日签到</p>
        </li>
        <li>
          <img src="../../../static/images/home-active.png" alt />
          <p>每日签到</p>
        </li>
        <li @click="goFreeArea">
          <img src="../../../static/images/home-active.png" alt />
          <p>免费专区</p>
        </li>
        <li>
          <img src="../../../static/images/home-active.png" alt />
          <p>每日签到</p>
        </li>
      </ul>
      <!-- 抢会员开始 -->
      <div class="member">
        <div>111111</div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <!-- 课程分类 -->
      <div class="subjectSort">
        <h4>课程分类</h4>
        <ul>
          <li>哈哈</li>
          <li>哈哈</li>
          <li>哈哈</li>
        </ul>
      </div>
      <!-- 好课推荐 -->
      <div class="subjectGood">
        <h4>课程分类</h4>
      </div>
    </div>
    <SubjectView v-show="!viewFlag" :propsName="name"></SubjectView>

    <!-- 遮罩层嵌内容 -->
    <van-overlay :show="oShow">
      <div class="wrapper" @click="oShow=false">
        <div class="block">
          <center>设置我的年级</center>
          <div class="blockMain" v-for="(item,index) in gradeNav" :key="index">
            <p>{{index}}</p>
            <ul>
              <li v-for="(it,val) in item" @click="chooseGrade(it.name)">{{it.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </van-overlay>
    <Footer></Footer>
  </div>
</template>

<script>
import http from "../http/http";
import Footer from "@/components/footer/footer";
import SubjectView from "@/components/home/views/subjectView";
export default {
  name: "home",
  components: { Footer, SubjectView },
  data() {
    return {
      navBarFlag: false, //控制吸顶
      navList: [], //学科列表
      classId: "", //学科id
      oShow: false, //控制遮罩层
      gradeNav: {}, //年级列表
      title: "一年级", //遮罩层选择后的年级变化
      viewFlag: true, //控制学科导航  首页 和其他学科视图显示
      name: "111" //传给儿子  让儿子请求数据
    };
  },
  mounted() {
    //一年级数据
    this.$axios
      .get("../../../static/data/home/firstGradeNav.json")
      .then(res => {
        this.navList = res.data.id;
      });
    //所有年级数据
    this.$axios.get("../../../static/data/home/gradeNav.json").then(res => {
      console.log(res.data);
      this.gradeNav = res.data;
    });

    window.addEventListener("scroll", this.goScroll); //监听滚动事件
  },
  methods: {
    goScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //当滚动超过50时，实现吸顶效果（导航高度为50）
      // console.log(scrollTop);
      if (scrollTop > 46) {
        this.navBarFlag = true;
      } else {
        this.navBarFlag = false;
      }
    },
    //点击弹出选择年级弹出层
    pickGrade() {
      this.oShow = true;
    },
    //选择年级渲染不同年级得学科列表
    chooseGrade(item) {
      this.title = item;
      if (item == "一年级") {
        this.$axios
          .get("../../../static/data/home/firstGradeNav.json")
          .then(res => {
            this.navList = res.data.id;
          });
      }
      if (item == "高三") {
        this.$axios
          .get("../../../static/data/home/highGradeNav.json")
          .then(res => {
            this.navList = res.data.id;
          });
      }
    },
    pickClass(item) {
      this.classId = item.id;
      this.name = item.name;
      if (item.name == "首页") {
        this.viewFlag = true;
      } else {
        this.viewFlag = false;
      }
    },
    goFreeArea() {
      this.$router.push("/free-area")
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.goScroll);
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  flex: 1;
  padding-bottom: 2rem;

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  header {
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    align-items: center;
    background: white;

    h5 {
      font-weight: bolder;
      margin-left: 1.2rem;
    }

    i {
      display: inline-block;
      font-size: 0.4rem;
      margin-right: 0.2rem;
    }
  }
  .main {
    .title {
      display: flex;
      height: 0.8rem;
      padding: 0 0.4rem;
      margin-top: 1rem;
      justify-content: space-between;
      align-items: center;
      dt {
        font-weight: bolder;
        font-size: 0.5rem;
      }
      dd {
        padding-top: 0.2rem;
        span:nth-of-type(1) {
          font-size: 0.24rem;
        }
        span:last-of-type {
          display: inline-block;
          width: 0;
          height: 0;
          border-bottom: 0.14rem solid black;
          border-left: 0.14rem solid transparent;
          margin-left: 0.1rem;
        }
      }
    }
    //滚动导航
    .nav {
      width: 100%;
      white-space: nowrap;
      overflow: scroll;
      padding-bottom: 0.2rem;
      background: white;
      li {
        display: inline-block;
        text-align: center;
        padding: 0.4rem 0 0;
        margin: 0 0.33rem;
      }
    }
    //去滚动条
    .nav::-webkit-scrollbar {
      display: none;
    }
    //学科下方边框样式
    .classActive {
      border-bottom: 0.1rem solid #87cefa;
    }
    //吸顶效果
    .navBarFixed {
      position: fixed;
      top: 0.8rem;
      z-index: 999;
    }
  }
  //banner图开始
  .banner {
    width: 100%;
    height: 3rem;
    background: blueviolet;
  }

  // 专区开始
  .region {
    padding: 0.3rem 0.5rem;
    display: flex;
    justify-content: space-between;

    img {
      width: 0.8rem;
      height: 0.8rem;
      margin-bottom: 0.1rem;
    }

    li {
      text-align: center;
    }
  }
  .member {
    padding: 0 0.3rem;
    margin-bottom: 0.4rem;
    div {
      width: 100%;
      height: 0.8rem;
      background: pink;
      margin-bottom: 0.02rem;
    }

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;

      li {
        width: 32.8%;
        height: 2.8rem;
        background: pink;
        padding: 0.3rem 0.3rem;
      }
    }
  }

  // 课程分类
  .subjectSort {
    padding: 0.3rem;

    h4 {
      margin-bottom: 0.3rem;
    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 49%;
        padding: 0.26rem;
        background: pink;
        margin-bottom: 0.16rem;
      }
    }
  }
  // 好课推荐
  .subjectGood {
    padding: 0.3rem;

    h4 {
      margin-bottom: 0.3rem;
    }
  }
  //弹出框
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 6.6rem;
    height: 6.6rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding: 0.4rem 0.4rem;

    center {
      margin-bottom: 0.3rem;
    }

    .blockMain {
      p {
        margin-bottom: 0.2rem;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          padding: 0.08rem 0.4rem;
          border: 0.01rem solid #ccc;
          border-radius: 0.3rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>