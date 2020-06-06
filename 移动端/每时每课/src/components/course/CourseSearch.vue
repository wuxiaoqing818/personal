<template>
  <div id="lzd_zzz">
    <div class="lzd_ss_div1">
      <img src="/static/images/back.png" @click="back()" />
      <input type="text" placeholder="请输入内容" v-model="title" />
      <button v-show="!flag" @click="back()">取消</button>
      <button v-show="flag" @click="search()">搜索</button>
    </div>
    <div class="lzd_ss_div2" v-show="!flag">
      <div class="wxq-search">
        <span>历史搜索</span>
        <i @click="del()"></i>
      </div>

      <div>
        <span v-for="(item,index) in this.$store.state.user.courseSearch" :key="index">{{item}}</span>
      </div>

    </div>
       <div class="wxq-content" v-show="flag3">
      <ul class="list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index1) in data" :key="index1">
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
    <div class="wxq-none" v-show="flag2">
        <img src="http://wap.365msmk.com/img/empty.0d284c2e.png" alt="">
        <p>暂无搜索记录</p>
    </div>


  </div>
</template>
<script>
import http from "../http/http";
export default {
  data() {
    return {
      title: "",
      flag: false,
      data: [],
      loading: false, //上拉加载内容效果属性
      finished: false, //没有更多了 属性
      page:1,
      flag2:"",
      flag3:false
    };
  },
  methods: {
    back() {
      this.$router.push("/course");
    },
    search() {
      this.flag3 = false
      http(
        "get",
        "https://test.365msmk.com/api/app/courseBasis?limit=10&page=1&course_type=0&keywords=" +
          this.title +
          "%20%20&"
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
            this.data = res.data.data.list
            if(this.data.length==0){
                this.flag2 = true
            }else {
                this.flag2 = false
                this.flag3 = true
            }
        }
      });
    //   this.title.replace(/\s*/g,"");
      if (this.title == "") {
          return false
      }
      this.$store.commit("courseSearch", this.title);
    },
    del() {
      this.$store.commit("delCourseSearch");
    },
     //上拉加载新数据
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        http(
          "get",
          "https://test.365msmk.com/api/app/courseBasis?limit=10&page="+this.page+"&course_type=0&keywords="+this.title+"%20&",
          null,
          null
        ).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.data = this.data.concat(res.data.data.list);
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
  },
  watch: {
    title: function(val) {
      if (val !== "") {
        this.flag = true;
      } else {
        this.flag = false;
        this.flag2 = ""
        this.flag3 = false
        this.data = []
      }
    }
  }
};
</script>
<style lang="scss">
#lzd_zzz {
  width: 100%;
  height: 100%;
  background-color: #fff;

    .wxq-content {
    background-color: #f2f5f0;
    .list {
      padding: 0.3rem 0.3rem;
      .van-cell {
        margin-bottom: 0.2rem;
         border-radius: 10px;
      }
      li {
        padding: 0.2rem 0.3rem;
        background: white;
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

  .wxq-none {
      text-align: center;
      img {
          width: 3rem;
          height: 3rem;
          margin-bottom: 0.4rem;
      }
      p {
          font-size: 0.28rem;
      }
  }
}
.lzd_ss_div1 {
  width: 100%;
  height: 0.96rem;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.lzd_ss_div1 > input {
  width: 5.4rem;
  height: 0.6rem;
  background-color: #e4e7ed;
  border: none;
  border-radius: 50px;
  font-size: 0.3rem;
  padding-left: 0.5rem;
}
.lzd_ss_div1 > input::-webkit-input-placeholder {
  font-size: 0.3rem;
  padding-top: 0.2rem;
  margin-left: 0.5rem;
}
.lzd_ss_div1 > button {
  border: none;
  background-color: #fff;
  color: #d5d3cf;
  font-size: 0.28rem;
  margin-right: 0.3rem;
}
.lzd_ss_div1 > img {
  width: 0.2rem;
  margin-left: 0.5rem;
}
.lzd_ss_div2 {
  padding: 0.5rem 0.4rem;

  .wxq-search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.3rem;
    font-weight: bold;
    margin-bottom: 0.4rem;

    i {
      width: 0.33rem;
      height: 0.33rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAqJJREFUWAntWb+PEkEUdvcO+Cso7vxxZ4gdtZEQAiQWWnj+BxdbvdLicsUVl3DGv+Ou0EaBRGK0prtQKNJQQ2ezuwp+j+Ntls3MMO4MZ0xmE/Jm3nzve49vZmfZwbulec3n861ut3sE+AHaD2DzmqErMM/zIjiuYC/z+XyrUqn8WgFIOp7Ev+JeFvkJ9tHKgGEHxX4tFApVnWJ9nVykpO0iKS84HwZBQLO09tpei7gGHDAOKrwuFoutUqkUsu9vbL/fz00mk5co8mwZ9wyW21IqLUVBSmtycZkUSQTlcjkCx9trtoWqMTf7RFarUATGN05WJZPJUxwxdxKTbusWmo678b7X6/Vuh2FIa7CgyH6cGDtJtE2aupwBtrELr9PpDLEG75hk3HQsbuAf/83Ub+dyuYbG1G9aNBV/gBovVAA3lkUB6bO+3W7v+b7/dDabvWs2m99E5LRjRFH0BFPzvlqtjrJi8IguIvYx8n2o1WpjEY/qEfoRRe7ijjtE4K4oGEV2aMeAfYHxu1kx4Ojicx/5voNjT8SjuusXxYFgRxRIPioyaUU4HQzi9pex94AXzrKqUFHef+ZzhdqW3inqFLWtgG0+t0adorYVsM3n1qhT1LYCtvlM1yifP7EV1cdjbEWYtT6jQvHqcI43gJ/4tGSZdDCy2KRf+GuaAHhnmjMQ70xSHGNMLA5BZvzLvtFo+PjicW7mNVKUSW7CukJtq6xSNOBkw+FQddLHsEyWTqB5fWJtRqL1ScSqQq8482g0OhoMBloHrhyjY4lzOp0mz/DjnOl41QEEHUyVKQDf+HQ8Hp9iJ0jHG/XBmY6XHoZJFcU28QbT8DnNtMH+F/yVcy7jV+6PUHILe9wrFPwc7cx/gsmSwx+Cm6b7sl6vt9D+LcP+AZp39kJf+YeiAAAAAElFTkSuQmCC)
        no-repeat;
      background-size: 100% 100%;
    }
  }

  &>div:nth-of-type(2) {
    span {
      display: inline-block;
      padding: 0.08rem 0.2rem;
      background: #ccc;
      border-radius: 15px;
      font-size: 0.24rem;
      margin: 0 0.2rem 0.2rem 0;
    }
  }


}
</style>