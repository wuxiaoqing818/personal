<template>
  <div id="lzd_qwer">
    <div class="wxq-header">
      <div class="lzd_top">
        <span>特色课</span>
        <img src="/static/images/search.png" @click="search()" />
      </div>
      <div class="lzd_fenlei">
        <ul>
          <li @click="showPopup1()">
            <van-dropdown-menu active-color="#eb6100">
              <van-dropdown-item title="分类" />
            </van-dropdown-menu>
          </li>
          <li @click="showPopup2()">
            <van-dropdown-menu active-color="#eb6100">
              <van-dropdown-item title="排序" />
            </van-dropdown-menu>
          </li>
          <li @click="showPopup3()">
            <van-dropdown-menu active-color="#eb6100">
              <van-dropdown-item title="筛选" />
            </van-dropdown-menu>
          </li>
        </ul>
      </div>
      <!-- 分类 -->
      <van-popup
        v-model="show1"
        position="top"
        overlay-class="overlay1"
        :style="{ height: '56%',top:'1.64rem'}"
        class="tepi1"
        :get-container="getContainer"
      >
        <ul>
          <li>
            <p>年级</p>
            <div>
              <!-- <span
                num="1"
                :class="flag1?'active':''"
                @click="flag1=true,flag2=false,flag3=false,flag4=false,flag5=false,flag6=false"
              >初一</span>
              <span
                num="0"
                :class="flag2?'active':''"
                @click="flag2=true,flag1=false,flag3=false,flag4=false,flag5=false,flag6=false"
              >初二</span>
              <span
                num="2"
                :class="flag3?'active':''"
                @click="flag3=true,flag1=false,flag2=false,flag4=false,flag5=false,flag6=false"
              >初三</span>
              <span
                num="3"
                :class="flag4?'active':''"
                @click="flag4=true,flag1=false,flag2=false,flag3=false,flag5=false,flag6=false"
              >高一</span>
              <span
                num="4"
                :class="flag5?'active':''"
                @click="flag5=true,flag1=false,flag2=false,flag3=false,flag4=false,flag6=false"
              >高二</span>
              <span
                num="5"
                :class="flag6?'active':''"
                @click="flag6=true,flag1=false,flag2=false,flag3=false,flag4=false,flag5=false"
              >小学一年级</span>-->

              <span
                v-for="(item,index) in gradeData"
                :key="index"
                :class="item.flag?'active':''"
                @click="grade(item)"
              >{{item.name}}</span>
            </div>
          </li>
          <li>
            <p>学科</p>
            <div>
              <!-- <span
                num="7"
                :class="fl1?'active':''"
                @click="fl1=true,fl2=false,fl3=false,fl4=false,fl5=false,fl6=false,fl7=false"
              >语文</span>
              <span
                num="8"
                :class="fl2?'active':''"
                @click="fl2=true,fl1=false,fl3=false,fl4=false,fl5=false,fl6=false,fl7=false"
              >数学</span>
              <span
                num="9"
                :class="fl3?'active':''"
                @click="fl3=true,fl2=false,fl1=false,fl4=false,fl5=false,fl6=false,fl7=false"
              >英语</span>
              <span
                num="10"
                :class="fl4?'active':''"
                @click="fl4=true,fl2=false,fl3=false,fl1=false,fl5=false,fl6=false,fl7=false"
              >历史</span>
              <span
                num="11"
                :class="fl5?'active':''"
                @click="fl5=true,fl2=false,fl3=false,fl4=false,fl1=false,fl6=false,fl7=false"
              >地理</span>
              <span
                num="12"
                :class="fl6?'active':''"
                @click="fl6=true,fl2=false,fl3=false,fl4=false,fl5=false,fl1=false,fl7=false"
              >物理</span>
              <span
                num="13"
                :class="fl7?'active':''"
                @click="fl7=true,fl2=false,fl3=false,fl4=false,fl5=false,fl6=false,fl1=false"
              >化学</span>-->
              <span
                v-for="(item,index) in classData"
                :key="index"
                :class="item.flag?'active':''"
                @click="course(item)"
              >{{item.name}}</span>
            </div>
          </li>
        </ul>

        <div>
          <button>重置</button>
          <button @click="sub()">确定</button>
        </div>
      </van-popup>
      <!-- 排序 -->
      <van-popup
        v-model="show2"
        position="top"
        overlay-class="overlay1"
        :style="{ height: '44%',top:'1.64rem'}"
        class="tepi2"
      >
        <p num="0" @click="sort($event)">综合排序</p>
        <p num="1" @click="sort($event)">最新</p>
        <p num="2" @click="sort($event)">最热</p>
        <p num="3" @click="sort($event)">价格从低到高</p>
        <p num="4" @click="sort($event)">价格从高到底</p>
      </van-popup>
      <!-- 筛选 -->
      <van-popup
        v-model="show3"
        position="top"
        overlay-class="overlay1"
        :style="{ height: '36%',top:'1.64rem'}"
        class="tepi3"
      >
        <ul>
          <li>
            <div>
              <span num="0" @click="choose($event)">全部</span>
              <span num="2" @click="choose($event)">大班课</span>
              <span num="3" @click="choose($event)">小班课</span>
              <span num="4" @click="choose($event)">公开课</span>
              <span num="5" @click="choose($event)">点播课</span>
              <span num="7" @click="choose($event)">面授课</span>
              <span num="8" @click="choose($event)">音频课</span>
              <span num="9" @click="choose($event)">系统课</span>
              <span num="10" @click="choose($event)">图文课</span>
              <span @click="chooseVip()">会员课</span>
            </div>
          </li>
        </ul>
      </van-popup>
    </div>
    <div class="wxq-content">
      <ul class="list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index1) in list" :key="index1">
            <li @click="courseDetail(item)">
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
          </van-cell>
        </van-list>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import http from "../http/http";
import Footer from "@/components/footer/Footer";
export default {
  components: { Footer },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      list: [], //接口数据
      loading: false, //上拉加载内容效果属性
      finished: false, //没有更多了 属性
      page: 1,
      gradeData: [
        { id: 1, name: "初一", flag: false },
        { id: 2, name: "初二", flag: false },
        { id: 3, name: "初三", flag: false },
        { id: 4, name: "高一", flag: false },
        { id: 5, name: "高二", flag: false }
      ],
      classData: [
        { id: 7, name: "语文", flag: false },
        { id: 8, name: "数学", flag: false },
        { id: 9, name: "英语", flag: false },
        { id: 10, name: "历史", flag: false },
        { id: 11, name: "地理", flag: false },
        { id: 12, name: "物理", flag: false },
        { id: 13, name: "化学", flag: false }
      ],
      gradeID: "",
      classID: ""
      // flag1: false,
      // flag2: false,
      // flag3: false,
      // flag4: false,
      // flag5: false,
      // flag6: false,
      // fl1: false,
      // fl2: false,
      // fl3: false,
      // fl4: false,
      // fl5: false,
      // fl6: false,
      // fl7: false,
      // sortFlag1: "",
      // sortFlag2: ""
    };
  },

  //进入页面默认请求十条数据
  created() {
    http(
      "get",
      "https://test.365msmk.com/api/app/courseBasis?page=1&limit=10&",
      { page: 1, limit: 10 },
      null
    ).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        this.list = res.data.data.list;
        // console.log(this.data1);
      }
    });
  },
  methods: {
        getContainer() {
      return document.querySelector('.lzd_fenlei');
    },
    search() {
      this.$router.push("/course-search");
    },
    //进入详情页
    courseDetail(item) {
      this.$router.push({
        path: "/course-detail",
        query: { id: item.id, type: item.course_type }
      });
    },
    showPopup1() {
      this.show1 = !this.show1;
      this.show2 = false;
      this.show3 = false;
    },
    showPopup2() {
      this.show2 = !this.show2;
      this.show1 = false;
      this.show3 = false;
    },
    showPopup3() {
      this.show3 = !this.show3;
      this.show1 = false;
      this.show2 = false;
    },
    //上拉加载新数据
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        http(
          "get",
          "https://test.365msmk.com/api/app/courseBasis?page=" +
            this.page +
            "&limit=10&",
          null,
          null
        ).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.list = this.list.concat(res.data.data.list);
            // console.log(this.data1);
            this.page++;

            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (res.data.data.list.length < 10) {
              this.finished = true;
            }
          }
        });
      }, 500);
    },

    //筛选
    choose(e) {
      // console.log(e.target.getAttribute("num"));
      var num1 = e.target.getAttribute("num");
      console.log(this.num1);
      http(
        "get",
        "https://test.365msmk.com/api/app/courseBasis?page=1" +
          "&limit=10&course_type=" +
          num1 +
          "&classify_id=&order_by=&attr_val_id=&is_vip=0&"
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data.list;
          // this.data33 = res.data.data.list;
          // console.log(this.data3);
        }
      });

      this.show3 = !this.show3;
      this.show1 = false;
      this.show2 = false;
    },

    //点击会员课
    chooseVip() {
      http(
        "get",
        "https://www.365msmk.com/api/app/courseBasis?page=1&limit=10&course_type=0&classify_id=&order_by=&attr_val_id=&is_vip=1&"
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data.list;
          // this.data33 = res.data.data.list;
          // console.log(this.data3);
        }
      });

      this.show3 = !this.show3;
      this.show1 = false;
      this.show2 = false;
    },

    //排序
    sort(e) {
      var num1 = e.target.getAttribute("num");
      http(
        "get",
        "https://test.365msmk.com/api/app/courseBasis?page=&limit=10&course_type=&classify_id=&order_by=" +
          num1 +
          "&attr_val_id=&is_vip=0&"
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data.list;
          // this.data33 = res.data.data.list;
          // console.log(this.data3);
        }
      });

      this.show2 = !this.show2;
      this.show1 = false;
      this.show3 = false;
    },

    //分类选择年级
    grade(item) {
      for (var i = 0; i < this.gradeData.length; i++) {
        this.gradeData[i].flag = false;
      }
      item.flag = true;
      this.gradeID = item.id;
    },
    //分类选择课程
    course(item) {
      for (var i = 0; i < this.classData.length; i++) {
        this.classData[i].flag = false;
      }
      item.flag = true;
      this.classID = item.id;
    },

    //点击分类的确定按钮
    sub() {
      http(
        "get",
        "https://test.365msmk.com/api/app/courseBasis?page=1&limit=10&course_type=&classify_id=&order_by=&attr_val_id=" +
          this.gradeID +
          "," +
          this.classID +
          "&is_vip=0&"
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data.list;
          // this.data33 = res.data.data.list;
          // console.log(this.data3);
        }
      });

      this.show1 = !this.show1;
      this.show2 = false;
      this.show3 = false;
      // if (this.flag1 == true) {
      //   this.sortFlag1 = this.flag1;
      // } else if (this.flag2 == true) {
      //   this.sortFlag1 = this.flag2;
      // } else if (this.flag3 == true) {
      //   this.sortFlag1 = this.flag3;
      // } else if (this.flag4 == true) {
      //   this.sortFlag1 = this.flag4;
      // } else if (this.flag5 == true) {
      //   this.sortFlag1 = this.flag5;
      // } else if (this.flag6 == true) {
      //   this.sortFlag1 = this.flag6;
      // }

      // if (this.fl1 == true) {
      //   this.sortFlag2 = this.fl1;
      // } else if (this.fl2 == true) {
      //   this.sortFlag2 = this.fl2;
      // } else if (this.f3 == true) {
      //   this.sortFlag2 = this.fl3;
      // } else if (this.fl4 == true) {
      //   this.sortFlag2 = this.fl4;
      // } else if (this.fl5 == true) {
      //   this.sortFlag2 = this.fl5;
      // } else if (this.fl6 == true) {
      //   this.sortFlag2 = this.fl6;
      // } else if (this.fl7 == true) {
      //   this.sortFlag2 = this.fl7;
      // }
    }
  },
  watch: {
    // list: {
    //   handler(val) {
    //     this.list = val;
    //   },
    //   deep: true
    // }
  }
};
</script>
<style lang="scss">
#lzd_qwer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .overlay1 {
    display: none;
  }

  .van-popup {
    border-top: 1px solid #eee;
    padding: 0 0.2rem;
    font-size: 0.26rem;
  }
  .tepi1 {
    ul {
      li {
        padding: 0.2rem 0;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ccc;

        p {
          font-size: 0.24rem;
          color: 999;
          margin-bottom: 0.12rem;
        }

        div {
          span {
            display: inline-block;
            width: 20%;
            height: 0.64rem;
            background: #eee;
            border-radius: 5px;
            margin: 0 0.4rem 0.2rem 0;
            text-align: center;
            line-height: 0.64rem;
          }
          span:nth-of-type(4) {
            margin-right: 0;
          }

          .active {
            background: pink;
          }
        }
      }
    }

    & > div {
      padding-top: 0.2rem;
      button {
        width: 3.4rem;
        height: 0.64rem;
        border-radius: 5px;
      }
      button:nth-of-type(1) {
        border: none;
        border: 1px solid #cccccc;
        background: none;
        margin-right: 0.2rem;
      }
      button:nth-of-type(2) {
        border: none;
        background: pink;
        color: white;
      }
    }
  }
  .tepi2 {
    padding: 0;

    p {
      width: 100%;
      border-bottom: 1px solid #eee;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    p:last-of-type {
      border: none;
    }
  }
  .tepi3 {
    ul {
      li {
        padding: 0.3rem 0;
        width: 100%;
        height: 100%;

        div {
          span {
            display: inline-block;
            width: 20%;
            height: 0.64rem;
            background: #eee;
            border-radius: 5px;
            margin: 0 0.4rem 0.2rem 0;
            text-align: center;
            line-height: 0.64rem;
          }
          span:nth-of-type(4) {
            margin-right: 0;
          }
        }
      }
    }
  }

  .wxq-content {
    flex: 1;
    overflow-y: auto;
    background-color: #f2f5f0;

    .list {
      padding: 0.3rem 0.3rem;
      .van-cell {
        margin-bottom: 0.2rem;
      }
      li {
        padding: 0.2rem 0.3rem;

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
  }

  .wxq-header {
    .lzd_top {
      width: 100%;
      font-size: 0.36rem;
      height: 0.84rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #cccccc;
    }
    .lzd_top > span {
      margin-left: 3.2rem;
    }
    .lzd_top > img {
      width: 0.4rem;
      margin-left: 2.54rem;
    }
    .lzd_fenlei {
      width: 100%;
      height: 0.8rem;
      font-size: 0.36rem;
      background-color: #fff;
    }
    .lzd_fenlei > ul {
      display: flex;
      list-style: none;
      justify-content: space-around;
      height: 100%;
      align-items: center;

      li {
        width: 33.3%;
        height: 100%;
      }
      li .van-dropdown-menu {
        width: 100%;
        height: 100%;
      }
      .van-dropdown-menu__item {
        width: 100%;
        height: 100%;
      }
      .van-ellipsis {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 0.3rem;
      }

      .van-dropdown-menu__title:after {
        border-width: 0.06rem;
        margin-top: -0.12rem;
      }
      .van-dropdown-menu__title--down::after {
        margin-top: -2px;
      }

      .van-dropdown-menu__title {
        height: 100%;
        padding: 0 0.2rem;
      }
    }
    .lzd_fenlei > ul > li > img {
      margin-top: 0.05rem;
      width: 0.15rem;
    }
    .lzd_a {
      text-decoration: none;
      color: #000;
    }

    .lzd_div1 > ul > li {
      margin-left: 0.3rem;
      display: flex;
      align-items: center;
      height: 1.53rem;
      margin-top: 0.6rem;
      font-size: 0.3rem;
    }
    .van-dropdown-menu__item {
      font-size: 0.3rem;
    }
    van-dropdown-item {
      width: 20px;
      height: 100px;
      background-color: #000;
    }
  }

  .lzd_ul1 > li {
    width: 6.86rem;
    height: 3.43rem;
    background-color: #fff;
    margin-top: 0.3rem;
    margin-left: 0.28rem;
    border-radius: 0.1rem;
  }
  .lzd_ul1 > li > div:nth-child(1) {
    font-size: 0.3rem;
    margin-left: 0.22rem;
    padding-top: 0.22rem;
  }
  .lzd_ul1 > li > div:nth-child(2) {
    display: flex;
    align-items: center;
    width: 5.4rem;
    font-size: 0.24rem;
    margin-left: 0.22rem;
    margin-top: 0.14rem;
  }
  .lzd_ul1 > li > div:nth-child(2) > img {
    width: 0.26rem;
  }
  .lzd_ul1 > li > div:nth-child(2) > span {
    margin-left: 0.1rem;
  }
  .lzd_ul1 > li > div:nth-child(3) {
    display: flex;
    align-items: center;
    margin-left: 0.22rem;
    margin-top: 0.5rem;
  }
  .lzd_ul1 > li > div:nth-child(3) > img {
    width: 0.5rem;
  }
  .lzd_ul1 > li > div:nth-child(3) > span {
    font-size: 0.23rem;
    margin-left: 0.17rem;
  }
  .lzd_ul1 > li > div:nth-child(4) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.3rem;
    font-size: 0.26rem;
    margin-top: 0.67rem;
    margin-left: 0.22rem;
  }
  .lzd_ul1 > li > div:nth-child(4) > span:nth-child(2) {
    display: flex;
    align-items: center;
  }
  .lzd_itemimg {
    width: 0.22rem;
    height: 0.23rem;
    margin-top: 0.08rem;
  }
}
</style>