<template>
  <div class="TeacherDetail">
    <div class="content">
      <header>
        <div>
          <router-link to="/home">
            <i class="fa fa-angle-left"></i>
          </router-link>
          <h3>讲师详情</h3>
        </div>
      </header>
      <ul class="wxq-introduce">
        <li>
          <div>
            <img :src="teacherData2.avatar" alt />
            <div>
              <p>
                <span>{{teacherData2.teacher_name}}</span>
                <span>m11</span>
              </p>
              <p>
                <span v-text="teacherData2.sex==0?'男':'女'"></span>
                <span>{{teacherData2.teach_age}}年教龄</span>
              </p>
            </div>
          </div>
          <span @click="collect()" v-show="flagCollect">关注</span>
          <p v-show="!flagCollect" @click="cancelCollect()">已关注</p>
        </li>
        <li>
          <span v-for="(item,index) in teacherData2.tag_content" :key="index">{{item}}</span>
        </li>
      </ul>
      
      <!--选项卡-->
      <van-tabs class="wxq-tab" @click="ping">
        <van-tab title="讲师介绍" name="a">
          <ul class="wxq-list1">
            <li>
              <span>{{teacherData.attr[3].attr_name}}</span>
              <span>{{teacherData.attr[3].attr_value[0].attr_value_name}}</span>
            </li>
            <li>
              <span>{{teacherData.attr[4].attr_name}}</span>
              <span>{{teacherData.attr[4].attr_value[0].attr_value_name}}</span>
            </li>
            <li>
              <span>老师简介</span>
              <div>{{teacherData.intro}}</div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="主讲课程" name="b">
          <ul class="wxq-list2">
            <li v-for="(item,index) in classData" :key="index">
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
        </van-tab>
        <van-tab title="学员评价" name="c">
          <div class="wxq-list3">
            <ol>
              <li>
                <div>
                  <div>
                    <span>升大</span>
                    <span>10</span>
                    <span>10</span>
                  </div>
                  <div v-show="!flag2">
                    <span>升大</span>
                    <span>10</span>
                    <span>10</span>
                  </div>
                </div>

                <span v-show="flag1" @click="show1()"></span>
                <span v-show="!flag1" @click="show1()"></span>
              </li>
            </ol>
            <ul>
              <li>
                <img :src="classData[0].teachers_list[0].teacher_avatar" alt />

                <div>
                  <p>111</p>
                  <div>
                    <span>111</span>
                    <span>111</span>
                    <span>1111</span>
                    <span>111</span>
                    <span>111</span>
                    <span>111</span>
                  </div>

                  <p>1111111</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>

      <!---->
    </div>

    <footer>
      <button>立即预约</button>
    </footer>
  </div>
</template>

<script>
import http from "../http/http";
export default {
  name: "Teacher",
  data() {
    return {
      teacherData: [],
      teacherData2: [],
      classData: [],
      flag1: true,
      flag2: true,
      //关注 默认true显示未关注得效果  因为不登陆的客户会显示关注
      flagCollect: true
    };
  },
  mounted() {
    var id = this.$route.query.id;
    // console.log(id);
    http(
      "get",
      "https://test.365msmk.com/api/app/teacher/info/" + id + "?",
      null,
      null
    ).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        this.teacherData = res.data.data;
        // console.log(this.list1)
      }
    });

    //有关注功能 所以要加token 不加的话登陆后的客户看不到是否关注
    var token = this.$store.state.user.userInfo.remember_token;
    this.$axios
      .get(
        "https://test.365msmk.com/api/app/teacher/" +
          this.$route.query.id +
          "?",
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.teacherData2 = res.data.data.teacher;
          //客户是否登录  关注效果的完成
          if (res.data.data.flag == 0) {
            this.flagCollect = true;
          } else if (res.data.data.flag == 2) {
            this.flagCollect = true;
          } else {
            this.flagCollect = false;
          }
        }
        // console.log(this.teacherData);
      });

    http(
      "post",
      "https://test.365msmk.com/api/app/teacher/mainCourse",
      { limit: 10, page: 1, teacher_id: id },
      null
    ).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        this.classData = res.data.data.list;
        // console.log(this.classData);
      }
    });

    // http(
    //   "post",
    //   "https://test.365msmk.com/api/app/teacher/comment",
    //   null,
    //   { limit: 2, page: 1, teacher_id: id },
    // ).then(res => {
    //   console.log(res);
    //   if (res.data.code == 200) {
    //     // this.list2 = res.data.data.attr;
    //     // console.log(this.list2);
    //   }
    // });
  },
  methods: {
    dian(k1) {
      this.num = k1;
    },
    show1() {
      this.flag1 = !this.flag1;
      this.flag2 = !this.flag2;
    },

    //点击学员评价  请求学员评价数据
    ping(name, title) {
      //判断是学员评价  请求学员评价数据
      if (name == "c") {
        this.$axios
          .get("https://test.365msmk.com/api/app/teacher/comment", {
            limit: 2,
            page: 1,
            teacher_id: this.$route.query.id
          })
          .then(res => {
            // console.log(res);
          });
      }
    },

    //关注
    collect() {
      var token = this.$store.state.user.userInfo.remember_token;
      this.$axios
        .get(
          "https://test.365msmk.com/api/app/teacher/collect/" +
            this.$route.query.id +
            "?",
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: "关注成功"
            });

            //关注成功 请求数据

            this.$axios
              .get(
                "https://test.365msmk.com/api/app/teacher/" +
                  this.$route.query.id,
                {
                  headers: { Authorization: "Bearer " + token }
                }
              )
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.teacherData2 = res.data.data.teacher;
                  //切换是否关注样式
                  if (res.data.data.flag == 0) {
                    this.flagCollect = true;
                  } else {
                    this.flagCollect = false;
                  }
                }
              });
          } else if (res.data.code == 202) {
            this.$toast({
              message: "登陆超时 请先登录"
            });
            this.$router.push("/my-login");
          }
        });
    },
    //取消关注
    cancelCollect() {
      var token = this.$store.state.user.userInfo.remember_token;
      this.$axios
        .get(
          "https://test.365msmk.com/api/app/teacher/collect/" +
            this.$route.query.id +
            "?",
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: "取消关注"
            });

            //关注成功 请求数据

            this.$axios
              .get(
                "https://test.365msmk.com/api/app/teacher/" +
                  this.$route.query.id,
                {
                  headers: { Authorization: "Bearer " + token }
                }
              )
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.teacherData2 = res.data.data.teacher;
                  //切换是否关注样式
                  if (res.data.data.flag == 2) {
                    this.flagCollect = true;
                  } else {
                    this.flagCollect = false;
                  }
                }
              });
          }
        });
    }
  }
};
</script>

<style lang="scss">
.TeacherDetail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;

  .content {
    flex-direction: column;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 0.3rem;
  }

  header {
    width: 100%;
    height: 2rem;
    background: blueviolet;
    color: white;
    padding: 0 0.3rem;

    div {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;

      i {
        margin-right: 2.6rem;
        font-size: 0.5rem;
        color: white;
      }
    }
  }

  .wxq-introduce {
    width: 94%;
    margin: -1rem auto 0.2rem;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 14px;
    padding: 0.4rem 0.3rem;
    border-radius: 10px;

    li:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3rem;

      & > span {
        display: inline-block;
        width: 1.2rem;
        height: 0.56rem;
        background: #eee;
        border-radius: 30px;
        color: red;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.26rem;
      }
      & > p {
        font-size: 0.3rem;
        color: #ccc;
      }

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-right: 0.1rem;
        }

        div {
          p:nth-of-type(1) {
            span:nth-of-type(1) {
              font-size: 0.3rem;
            }
            span:nth-of-type(2) {
              font-size: 0.24rem;
              color: red;
            }
          }
          p:nth-of-type(2) {
            font-size: 0.26rem;
            color: #ccc;
            span:nth-of-type(1) {
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
    li:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 1.4rem;
        height: 0.5rem;
        background: pink;
        border-radius: 20px;
        margin-right: 0.1rem;
        line-height: 0.5rem;
        text-align: center;
      }
    }
  }
  .wxq-tab {
    width: 100%;
    background: white;
    font-size: 0.3rem;

    ul {
      padding: 0.4rem;
      height: 100%;
    }

    .wxq-list1 {
      padding: 0.3;

      li {
        padding: 0 0 0.6rem 0;

        span:nth-of-type(1) {
          margin-right: 0.3rem;
        }
      }

      li:last-of-type {
        display: flex;
        div {
          width: 76%;
          white-space: normal;
        }
      }
    }
    .wxq-list2 {
      li {
        padding: 0.2rem 0.3rem;
        margin-bottom: 0.2rem;
        background: white;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 14px;
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
            font-size: 0.24rem;
            color: #eee;
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
          flex-wrap: wrap;

          div {
            display: flex;
            align-items: center;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            img {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.2rem;
            }
          }
        }
      }
    }

    .wxq-list3 {
      padding: 0.4rem;
      height: 100%;
      ol > li {
        display: flex;
        justify-content: space-between;
        & > div {
          div {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.2rem;
            span {
              display: inline-block;
              width: 1.8rem;
              height: 0.54rem;
              margin-right: 0.24rem;
              line-height: 0.5rem;
              text-align: center;
              border: 1px solid pink;
              border-radius: 5px;
              color: red;
            }
          }
        }
        & > span:nth-of-type(1) {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABOElEQVQ4T62Uu06FQBCGZ1iuDfACdmzwDYynstPO3sLCBzPRwt5OO6tjfAPJAo0V0FFJwu6aIWJWBI8XtiH5Z/h2/pndRZhZQohjxtiZ1noDAHvvKS+IuJVS3nDO76e/oSlkWbbPGLtExMO5DUZNa/0opbxI0/R51D5AQogjy7JuASD8DmLEWqXUKef8gbQBRJXYtv30C8jIa/u+P6DKBlCe59tddpaqJJtJkmyQGmtZ1t0P7cymKaVOsCzLK631+X9AiHiNRVEIAEhGkOd5EIYhNE0zy6YYrbZtzXhOoFcA8Ew1jmNwHOcLjCBBEEBVVdNNulkQZU1hBPF9H+q6nqt0AH2yZmZFUQRkteu64bsAGQa/s9kEc113sWfDYaRmrzb+1Q7kqleEYKtc2nFSqzwj5tj/8rC9AQYhrzswjcIUAAAAAElFTkSuQmCC)
            no-repeat;
          background-size: 100% 100%;
        }
        & > span:nth-of-type(2) {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABOElEQVQ4T62UvU6EQBDHZxYSOjqgsoPgGxivstPO3sLCBzPRwt7O66zO+AaSBRpfAGj43F0zKBckC3cattlkZvY385/ZXQTN4pxfGoZxo5TaAMDJT8gnIu6EEE9BEGynx3BsiKLo1DCMe0Q81yUYbEqpNyHEXRiGH4NtD+KcXzDGngHAXoKMfIWU8joIgley9SCqxDTN9z9ABl7Rdd0ZVdaD4jjeHZIzVyXJ9H1/g9RYxtjLkXK0YVLKK0zT9EEpdTsHchwHmqaBPM9ncyHiIyZJwgHA10W5rgt1XYNlWf2+AIsJVAGANQURpKoqKIqid1FlbdtClmW6nLUW5HkelGW5hwwnF2A96Jc02/6+RkMl0/QEIx9JHa34YLOPmWbf7NXGv9qFXPWJEGyVRzs0dJVvZDyd/3xsXwmlxDvBXMYAAAAAAElFTkSuQmCC)
            no-repeat;
          background-size: 100% 100%;
        }
      }

      ul {
        padding: 0;
      }
      ul > li {
        display: flex;
        padding-top: 0.2rem;

        & > img {
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }

        & > div {
          div {
            display: flex;
            flex-wrap: wrap;
            span {
              display: block;
              width: 1.7rem;
              height: 0.44rem;
              line-height: 0.44rem;
              border-radius: 7%;
              background: #eee;
              margin-right: 0.2rem;
              margin-bottom: 0.1rem;
              color: #ccc;
              text-align: center;
            }
          }
        }
      }
    }
  }

  footer button {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: orangered;
    color: white;
    font-size: 0.34rem;
    border: none;
    opacity: 0.8;
  }
}
</style>