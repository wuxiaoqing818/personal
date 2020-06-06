<template>
  <div class="wxq-home">
    <div class="content">
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img width="100%" src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019XXAW4dyinn1575882641.jpg" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img width="100%" src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019MGNW3BtiS91569839576.jpg" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img width="100%" src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img width="100%" src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <ul class="kc">
        <li>特色课</li>
        <li>一对一辅导</li>
        <li>学习日历</li>
      </ul>

      <!-- 推荐课程 -->
      <div class="zt">
        <span></span>
        <p>{{data[0].channel_info.name}}</p>
      </div>
      <ul class="list">
        <li v-for="(item,index1) in data[0].list" :key="index1" @click="courseDetail(item)">
          <p>{{item.title}}</p>
          <p>
            <span>共{{item.total_periods}}课时</span>
          </p>
          <div>
            <div v-for="(it,index2) in item.teachers_list" :key="index2">
              <img :src="it.teacher_avatar" alt />
              <span>{{it.teacher_name}}</span>
            </div>
          </div>
          <hr />
          <div>
            <span>{{item.sales_num}}人已报名</span>
            <p>
              <span :class="item.underlined_price==0? 'active3':'active4'">
                <img
                  src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                  alt
                />
                {{item.underlined_price}}
              </span>
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
                v-show="item.price!=0"
              />
              <span
                :class="item.price==0? 'active1':'active2'"
                v-text="item.price==0? '免费':item.price"
              ></span>
            </p>
          </div>
        </li>
      </ul>

      <!-- 精品课程 -->

      <div class="zt">
        <span></span>
        <p>{{data[1].channel_info.name}}</p>
      </div>
      <ul class="list">
        <li v-for="(item,index3) in data[1].list" :key="index3" @click="courseDetail(item)">
          <p>{{item.title}}</p>
          <p>
            <span>共{{item.total_periods}}课时</span>
          </p>
          <div>
            <div v-for="(it,index4) in item.teachers_list" :key="index4">
              <img :src="it.teacher_avatar" alt />
              <span>{{it.teacher_name}}</span>
            </div>
          </div>
          <hr />
          <div>
            <span>{{item.sales_num}}人已报名</span>
            <p>
              <span :class="item.underlined_price==0? 'active3':'active4'">
                <img
                  src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                  alt
                />
                {{item.underlined_price}}
              </span>
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
                v-show="item.price!=0"
              />
              <span
                :class="item.price==0? 'active1':'active2'"
                v-text="item.price==0? '免费':item.price"
              ></span>
            </p>
          </div>
        </li>
      </ul>
      <!-- 名师阵容 -->
      <div class="zt">
        <span></span>
        <p>{{data[2].channel_info.name}}</p>
      </div>
      <ul
        class="starteacher"
        v-for="(item,index5) in data[2].list"
        :key="index5"
        @click="teacherDetail(item)"
      >
        <li>
          <dl>
            <dt>
              <img :src="item.teacher_avatar" alt />
            </dt>
            <dd>
              <p class="p1">{{item.teacher_name}}</p>
              <p class="p2">{{item.introduction}}</p>
            </dd>
          </dl>
        </li>
      </ul>

      <!-- 明星讲师 -->
      <div class="zt">
        <span></span>
        <p>{{data[3].channel_info.name}}</p>
      </div>
      <ul
        class="starteacher"
        v-for="(item,index6) in data[3].list"
        :key="index6"
        @click="teacherDetail(item)"
      >
        <li>
          <dl>
            <dt>
              <img :src="item.teacher_avatar" alt />
            </dt>
            <dd>
              <p class="p1">{{item.teacher_name}} {{item.level_name}}</p>
              <p class="p2">{{item.introduction}}</p>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import http from "../http/http";
import Footer from "@/components/footer/Footer";
export default {
  name: "home",
  components: { Footer },
  data() {
    return {
      // list: [],
      data: []
    };
  },
  mounted() {
    this.getHomeBanner();
    this.getHomeData();
  },
  methods: {
    //请求轮播图数据
    async getHomeBanner() {
      var homeBanner = await http(
        "get",
        "https://test.365msmk.com/api/app/banner?",
        null
      );
      console.log(homeBanner);
    },
    //请求页面数据
    async getHomeData() {
      var homeData = await http(
        "get",
        "https://test.365msmk.com/api/app/recommend/appIndex?",
        null
      );
      // console.log(homeData.data.data);
      this.data = homeData.data.data;
    },
    courseDetail(item) {
      this.$router.push({
        path: "/course-detail",
        query: { id: item.id, type: item.course_type }
      });
    },
    teacherDetail(item) {
      // this.$router.push({ path: "/xiangqing" + item.id });
      this.$router.push({
        path: "/teacher-detail",
        query: { id: item.teacher_id }
      });
    }
  }
};
</script>

<style lang="scss">
body,
html,
.wxq-home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;

  .content {
    flex: 1;
    overflow-y: auto;
  }

  .kc {
    width: 100%;
    display: flex;
    justify-content: space-around;
    li {
      width: 2rem;
      height: 2rem;
      background: #fff;
      border-radius: 10px;
      margin-top: -0.44rem;
      z-index: 10;
      text-align: center;
      line-height: 2rem;
    }
  }
  .zt {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0.6rem 0.3rem 0.2rem;

    span {
      display: inline-block;
      width: 0.06rem;
      height: 0.38rem;
      background: red;
      margin-right: 0.2rem;
    }
    p {
      font-size: 0.3rem;
      font-weight: bold;
    }
    img {
      height: 50%;
      margin-top: 12px;
    }
  }

  .list {
    padding: 0 0.3rem;
    li {
      padding: 0.2rem 0.3rem;
      margin-bottom: 0.2rem;
      background: white;
      border-radius: 10px;
      p:nth-of-type(1) {
        font-size: 0.3rem;
      }
      p:nth-of-type(2) {
        margin-bottom: 0.4rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
      }
      div:nth-of-type(2) {
        display: flex;
        justify-content: space-between;
        & > span {
          font-size: 0.26rem;
          color: #ccc;
        }
        p {
          font-size: 0.3rem;
          span {
            display: inline-block;
          }

          .active1 {
            color: green;
          }
          .active2 {
            color: red;
          }
          .active3 {
            display: none;
          }
          .active4 {
            text-decoration: line-through;
            color: red;
          }
        }
      }

      div:nth-of-type(1) {
        display: flex;

        div {
          display: flex;
          align-items: center;
          margin-right: 0.2rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
  .starteacher {
    padding: 0 0.3rem;
    width: 100%;

    dl {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 1.6rem;
      background: #fff;
      margin-bottom: 0.2rem;
      line-height: 1.6rem;
      padding: 0.2rem 0.3rem;
      border-radius: 10px;
      dt {
        width: 1rem;
        height: 1rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
      }
      dd {
        width: 100%;
        margin-left: 10px;

        p:nth-of-type(1) {
          font-size: 0.3rem;
        }

        .p2 {
          font-size: 0.24rem;
          width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #cccccc;
        }
      }
    }
  }
}

// .banner {
//   position: relative;
//   width: 100%;
//   height: 0.4rem;
//   van-swipe-item {
//     width: 100px;
//     img {
//       width: 100%;
//     }
//   }
// }
</style>