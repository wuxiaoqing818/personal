<template>
  <div id="app">
    <!-- 头部 -->
    <div class="header">
      <div class="one">
        <router-link to="/oto" tag="div">返回</router-link>
        <div>预约课程</div>
        <div></div>
      </div>
      <div class="two">
        <div class="part_div">
          <div>
            <img :src="teacherData.avatar" alt />
          </div>
          <div>
            <p>{{teacherData.teacher_name}}</p>
            <p>
              <span v-text="teacherData.sex==0?'男':'女'"></span>
              <span>{{teacherData.teach_age}}年教龄</span>
            </p>
          </div>
          <div @click="cwq_xiangqing(teacherData.id)" class="xiangqing">查看详情</div>
        </div>
      </div>
    </div>
    <!-- 内容   -->
    <div class="box">
      <div class="content">
        <div class="xiang_nav">
          <p></p>
          <p>选择时间</p>
          <p>(北京时间)</p>
        </div>
        <div class="date">
          <div v-for="(item,index) in timeData" :key="index">
            <p>周一</p>
            <p>{{item.slice(0,2)}}/{{item.slice(3,5)}}</p>
          </div>
          <div v-for="(item,index) in timeData" :key="index">
            <p>周一</p>
            <p>{{item.slice(0,2)}}/{{item.slice(3,5)}}</p>
          </div>
        </div>
        <div class="img">
          <img src="../../../static/images/pic2.png" alt />
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <div class="footer">
      <div>立即约课</div>
    </div>
  </div>
</template>




<script>
export default {
  name: "App",
  data() {
    return {
      teacherData: [],
      timeData: []
    };
  },
  mounted() {
    var token = this.$store.state.user.userInfo.remember_token;
    this.$axios
      .get(
        "https://test.365msmk.com/api/app/teacher/" +
          this.$route.query.teacherID +
          "?",
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.teacherData = res.data.data.teacher;
        }
        // console.log(this.teacherData);
      });

    //获取时间
    this.$axios
      .post(
        "https://test.365msmk.com/api/app/teacher/invite",
        { is_next: 0, teacher_id: this.$route.query.teacherID, week_day: 4 },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.timeData = res.data.data.weekDateList;
        }
      });
  },
  methods: {
    cwq_xiangqing(item) {
      this.$router.push({ path: "/teacher-detail", query: { id: item } });
    }
  }
};
</script>




<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
#app,
ul,
li,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-size: 0.2rem;
  line-height: 0.4rem;
}
.header {
  height: 2rem;
  background-image: linear-gradient(#62b6fd, #507ee4);
  position: relative;
}
.one {
  width: 100%;
  height: 0.85rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.35rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.85rem;
  font-size: 0.32rem;
  font-weight: 500;
}

.part_div {
  position: absolute;
  top: 50px;
  left: 10px;
  width: 7.12rem;
  height: 1.6rem;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  div:nth-of-type(1) {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.4rem;
    margin-left: 0.3rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  div:nth-of-type(2) {
    width: 2rem;
    height: 1.2rem;
    padding: 0.4rem 0 0 0.2rem;
    p:nth-of-type(1) {
      color: #393939;
      font-size: 0.3rem;
      font-weight: 600;
      line-height: normal;
    }
    p:nth-of-type(2) {
      color: #a7a7a7;
      font-size: 0.27rem;
      font-weight: 600;
      line-height: normal;
      span:nth-of-type(2) {
        margin-left: 0.15rem;
      }
    }
  }
}
.xiangqing {
  position: absolute;
  top: 10px;
  right: 20px;
  width: 1.56rem;
  height: 0.6rem;
  border: 2px solid #ec671a;
  text-align: center;
  line-height: 0.6rem;
  color: #eb5a11;
  font-size: 0.25rem;
  font-weight: 600;
  border-radius: 15px;
  margin-top: 0.5rem;
  margin-left: 2.1rem;
}
.xiang_nav {
  width: 100%;
  height: 1rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  p:nth-of-type(1) {
    width: 0.1rem;
    height: 0.32rem;
    background: #eb5100;
    margin-left: 0.23rem;
  }
  p:nth-of-type(2) {
    color: #313131;
    font-size: 0.28rem;
    font-weight: 600;
    margin-left: 0.23rem;
  }
  p:nth-of-type(3) {
    color: #313131;
    font-size: 0.28rem;
    font-weight: 600;
    margin-left: 0.23rem;
  }
}
.date {
  width: 7.12rem;
  height: 1.48rem;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 0.1rem;
  display: flex;
  overflow-x: scroll;
  div {
    text-align: center;
    padding: 0 0.22rem;
    p:nth-of-type(1) {
      color: #aeaeae;
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
    p:nth-of-type(2) {
      color: #aeaeae;
      font-size: 0.26rem;
      margin-top: 0.1rem;
    }
  }
}
.img {
  width: 3.05rem;
  height: 3.67rem;
  margin-top: 0.4rem;
  margin-left: 2.22rem;
  img {
    width: 100%;
  }
}
.footer {
  height: 0.87rem;
  width: 100%;
  background: #eb6100;
  font-size: 0.32rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.87rem;
}
html,
body {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.box {
  display: flex;
  height: 100%;
  overflow: auto;
  background: #f0f2f5;
}
.box > .content {
  width: 100%;
  flex-grow: 1;
}
</style>