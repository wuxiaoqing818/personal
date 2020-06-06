<template>
  <div class="wll_details">
    <!-- 详情页面 -->
    <div class="wll_destop">
      <p>
        <span class="wll_fhindex" @click="back()">&lt;</span>
        <span>课程详情</span>
        <img
          src="data:image/png;base64,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"
          alt
        />
      </p>
    </div>
    <div class="wll_div">
      <div class="wll_detdiv">
        <p>
          <span>{{list1.title}}</span>
          <img src="/static/images/sc.png" alt v-show="flagStars" @click="addStars()" />
          <img src="/static/images/sc-active.png" alt v-show="!flagStars" @click="cancelStars()" />
        </p>
        <p>
          <span v-text="list1.price==0? '免费':list1.price"></span>
        </p>
        <p>
          <span>共{{list1.total_periods}}课时|</span>
          <span>{{list1.sales_num}}人报名</span>
        </p>
        <p>
          <span>开课时间:</span>
          <span>1111111</span>
        </p>
      </div>
      <div>
        <h2>教学团队</h2>
        <ul>
          <li @click="teacherDetail()">
            <img :src="list2.teacher_avatar" alt />
            <p>{{list2.teacher_name}}</p>
          </li>
        </ul>
      </div>
      <div>
        <h2>课程介绍</h2>
        <p v-html="list1.course_details"></p>
      </div>
      <div>
        <h2>课程大纲</h2>
        <ul>
          <li>
            <div class="wll_coldiv">
              <span></span>
              <p>第一讲：{{list3[0].periods_title}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h2>课程评论</h2>
        <img src="http://wap.365msmk.com/img/empty.0d284c2e.png" alt />
        <p>暂无评论</p>
      </div>
    </div>
    <div class="wll_desfood">
      <h2>立即报名</h2>
    </div>
  </div>
</template>
<script>
import http from "../http/http";
export default {
  name: "Details",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      //收藏 默认显示没有收藏的效果
      flagStars: true,
      ID: ""
    };
  },
  mounted() {
    //得到首页跳转的id值  并请求数据
    var id = this.$route.query.id;
    this.ID = this.$route.query.id;
    var type = this.$route.query.type;
    var token = this.$store.state.user.userInfo.remember_token;
    http(
      "get",
      "https://test.365msmk.com/api/app/courseInfo/basis_id=" + id + "?",
      null,
      token
    ).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        this.list1 = res.data.data.info;
        this.list2 = res.data.data.teachers[0];
        // console.log(res.data.data.info);
        if (this.list1.is_collect == 0) {
          this.flagStars = true;
        } else {
          this.flagStars = false;
        }
      }
    });

    http("post", "https://test.365msmk.com/api/app/courseChapter", {
      id: id
    }).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        this.list3 = res.data.data;
        // console.log(res.data.data);
      }
    });
  },

  methods: {
    //添加收藏
    addStars() {
      var token = this.$store.state.user.userInfo.remember_token;
      // console.log(this.ID)

      this.$axios
        .post(
          "https://test.365msmk.com/api/app/collect",
          { course_basis_id: this.ID, type: 1 },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: "收藏成功"
            });

            //收藏成功 请求数据

            this.$axios
              .get(
                "https://test.365msmk.com/api/app/courseInfo/basis_id=" +
                  this.ID,
                { headers: { Authorization: "Bearer " + token } }
              )
              .then(res => {
                // console.log(res);
                if (res.data.code == 200) {
                  this.list1 = res.data.data.info;
                  this.list2 = res.data.data.teachers[0];
                  //切换星星样式
                  this.flagStars = false;
                  console.log(this.list1);
                }
              });
          } else if (res.data.code == 202) {
            this.$toast({
              message: "请先登录"
            });
            this.$router.push("/my-login");
          }
        });

      //这样写不行 封装有bug
      // http(
      //   "post",
      //   "https://test.365msmk.com/api/app/collect",
      //   { course_basis_id: this.ID, type: 1 },
      //   token
      // ).then(res => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //     this.$toast({
      //       message: "收藏成功"
      //     });
      //   }
      // });
    },
    cancelStars() {
      // this.flagStars = !this.flagStars;
      var token = this.$store.state.user.userInfo.remember_token;
      http(
        "put",
        "https://test.365msmk.com/api/app/collect/cancel/" +
          this.list1.collect_id +
          "/1",
        null,
        token
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$toast({
            message: "取消收藏"
          });

          //取消收藏 请求数据

          this.$axios
            .get(
              "https://test.365msmk.com/api/app/courseInfo/basis_id=" + this.ID,
              { headers: { Authorization: "Bearer " + token } }
            )
            .then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                this.list1 = res.data.data.info;
                this.list2 = res.data.data.teachers[0];
                //切换星星样式
                this.flagStars = true;
              }
            });
        }
      });
    },
    teacherDetail(item) {
      // this.$router.push({ path: "/xiangqing" + item.id });
      this.$router.push({
        path: "/teacher-detail",
        query: { id: this.list2.teacher_id }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
body,
html,
.wll_details {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .wll_details {
    width: 100%;
    background: #f1f2f5;

    .wll_destop {
      width: 100%;
      height: 1rem;
      background: #ffffff;
      border-bottom: 1px solid #f1f2f5;

      p {
        width: 7rem;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 0.36rem;
        }

        img {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }

    .wll_div {
      width: 100%;
      flex: 1;
      overflow: auto;

      .wll_detdiv {
        width: 100%;
        height: 2.43rem;
        background: #ffffff;
        p {
          padding: 0.24rem 0;
        }

        p:nth-of-type(1) {
          width: 7rem;
          height: 0.54rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 0.26rem;
          }

          img {
            width: 0.34rem;
            height: 0.34rem;
          }
        }

        p:nth-of-type(2) {
          width: 7rem;
          height: 0.4rem;
          font-size: 0.26rem;
          margin: 0 auto;
          color: #ee732e;
          display: flex;
          justify-content: space-between;
        }

        p:nth-of-type(3) {
          width: 7rem;
          height: 0.4rem;
          font-size: 0.24rem;
          color: #8a857f;
          margin: 0 auto;

          span:nth-of-type(1) {
            display: inline-block;
            /*width: 1.5rem;*/
            height: 0.2rem;
          }
        }

        p:nth-of-type(4) {
          width: 7rem;
          margin: 0 auto;
          font-size: 0.24rem;
          color: #8a857f;
        }
      }

      div:nth-of-type(2) {
        width: 100%;
        height: 2.42rem;
        background: #ffffff;
        margin-top: 0.26rem;

        h2 {
          width: 7rem;
          display: flex;
          margin: 0 auto;
          padding-top: 0.2rem;
          font-size: 0.26rem;
        }

        ul {
          width: 7rem;
          height: 1.88rem;
          margin: 0 auto;
          display: flex;
          align-items: center;

          li {
            width: 1.1rem;
            height: 0.98rem;
            line-height: 0.36rem;

            img {
              width: 0.8rem;
              height: 0.8rem;
              display: block;
              border-radius: 50%;
            }

            p {
              color: #b0b0b0;
              line-height: 0.36rem;
              padding: 0 0 0 0.1rem;
            }
          }
        }
      }

      div:nth-of-type(3) {
        width: 100%;
        // height: 2rem;
        margin-top: 0.26rem;
        background: #ffffff;
        padding: 0.2rem 0;

        h2 {
          width: 7rem;
          margin: 0 auto;
          padding-top: 0.26rem;
        }

        p {
          width: 7rem;
          margin: 0 auto 0;
          padding-top: 0.1rem;
          color: #b0b0b0;
        }
      }

      div:nth-of-type(4) {
        width: 100%;
        // height: 2rem;
        margin-top: 0.3rem;
        background: #ffffff;
        padding: 0.26rem 0 0.26rem 0.26rem;

        h2 {
          width: 7rem;
        }

        ul {
          width: 7rem;
        }
        .wll_coldiv {
          display: flex;
          align-items: center;
          margin: 0.2rem 0 0 0.2rem;

          span {
            display: inline-block;
            width: 0.1rem;
            height: 0.1rem;
            background: red;
            border-radius: 3px;
            margin-right: 0.2rem;
          }
        }

        p {
          color: #b0b0b0;
          font-size: 0.24rem;
        }
      }

      div:nth-of-type(5) {
        width: 100%;
        /*height: 3.46rem;*/
        background: #ffffff;
        margin-top: 0.3rem;

        h2 {
          width: 7rem;
          margin: 0 auto;
          padding-top: 0.26rem;
        }

        img {
          width: 2.6rem;
          height: 2.6rem;
          margin: 0 auto;
          display: block;
          margin-top: 0.3rem;
        }

        p {
          width: 7rem;
          margin: 0 auto;
          font-size: 0.3rem;
          color: #8a857f;
          text-align: center;
          margin-top: 0.3rem;
        }
      }
    }

    .wll_desfood {
      width: 100%;
      height: 86px;
      margin-top: 20px;

      h2 {
        width: 100%;
        height: 86px;
        margin-top: 20px;
        background: #ee732e;
        color: #ffffff;
        text-align: center;
        line-height: 86px;
      }
    }
  }
}
</style>
