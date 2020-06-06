<template>
  <div id="Oto">
    <!-- 头部 -->
    <div class="header">
      <div @click="back">
        <img src="../../../static/images/back.png" alt />
      </div>
      <div>一对一辅导</div>
      <div>
        <img src="../../../static/images/search.png" alt />
      </div>
    </div>
    <!-- 内容   -->
    <div class="box">
      <div class="content">
        <div class="yuenav">
          <!-- 给导航添加样式 -->
          <div @click="flag1=!flag1,flag2=false">
            <span :class="flag1?'active_s':''">选择上课时间</span>
            <i :class="flag1?'active_i':''"></i>
          </div>
          <div @click="flag2=!flag2,flag1=false">
            <span :class="flag2?'active_s':''">选择老师条件</span>
            <i :class="flag2?'active_i':''"></i>
          </div>
        </div>

        <!-- 三个属性同时控制  有点迷 -->
        <div class="part" v-show="!flag1&!flag2&!flag7">
          <div class="part_div" v-for="(item,index) in list" :key="index">
            <div>
              <img :src="item.avatar" alt="对不起" />
            </div>
            <div>
              <p>
                <span>{{item.real_name}}</span>
                <span v-text="item.is_collect?'已关注':''"></span>
              </p>
              <p>
                <span v-text="item.sex==0?'男':'女'"></span>
                <span>{{item.teach_age}}年教龄</span>
              </p>
            </div>
            <div @click="toyuyue(item.teacher_id)">预约</div>
          </div>
        </div>

        <div class="wxq-time" v-show="flag1">
          <div class="wxq-date">
            <p>日期</p>
          </div>
          <div class="wxq-footer">
            <button>重置</button>
            <button>确定</button>
          </div>
        </div>
        <div class="wxq-type" v-show="flag2">
          <div class="wxq-footer">
            <button @click="reset()">重置</button>
            <button @click="sub()">确定</button>
          </div>
          <div class="wxq-div1">
            <p>老师类型</p>
            <div>
              <span
                v-for="(item,index) in teacherType"
                :key="index"
                :class="item.flag?'active3':''"
                @click="type1(item,index)"
              >{{item.level_name}}</span>
            </div>
          </div>
          <div class="wxq-div2">
            <p>只看</p>
            <div>
              <div>
                <div :class="flag3?'active':''" @click="flag3=!flag3">
                  <span v-show="flag3"></span>
                </div>
                <span>已关注</span>
              </div>

              <div>
                <div :class="flag4?'active':''" @click="flag4=!flag4">
                  <span v-show="flag4"></span>
                </div>
                <span>上过课的</span>
              </div>
            </div>
          </div>
          <div class="wxq-div1">
            <p>性别</p>
            <div>
              <span :class="flag5?'active3':''" @click="flag5=true,flag6=false">男</span>
              <span :class="flag6?'active3':''" @click="flag6=true,flag5=false">女</span>
            </div>
          </div>
          <div class="wxq-div1">
            <p>{{gradeData.attr_name}}</p>
            <div>
              <span
                v-for="(item,index) in gradeData.child"
                :key="index"
                :class="item.flag?'active3':''"
                @click="type2(item,index)"
              >{{item.attr_val_name}}</span>
            </div>
          </div>
          <div class="wxq-div1">
            <p>{{classData.attr_name}}</p>
            <div>
              <span
                v-for="(item,index) in classData.child"
                :key="index"
                :class="item.flag?'active3':''"
                @click="type3(item,index)"
              >{{item.attr_val_name}}</span>
            </div>
          </div>
        </div>
        <div class="wxq-finished" v-show="flag7">没有更多了</div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      list: [],
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag6: false,
      flag7: false,
      teacherType: [],
      gradeData: [],
      classData: [],
      typeID: "",
      gradeID: "",
      classID: ""
    };
  },
  mounted() {
    var token = this.$store.state.user.userInfo.remember_token;
    this.$axios
      .get("https://test.365msmk.com/api/app/otoCourse?page=1&limit=10&", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data;
        }
      });

    this.$axios
      .get("https://test.365msmk.com/api/app/otoCourseOptions?", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.teacherType = res.data.data.otoTeacherLevel;
          this.gradeData = res.data.data.attrList[0];
          this.classData = res.data.data.attrList[2];
          // for (var i = 0; i < this.teacherType.length; i++) {
          //   this.teacherType[i].flag = false;
          // }
        }
      });
  },
  methods: {
    back() {
      this.$router.push("/a");
    },
    toyuyue(item) {
      this.$router.push({ path: "/oto-plan", query: { teacherID: item } });
    },
    type1(item, index) {
      for (var i = 0; i < this.teacherType.length; i++) {
        this.teacherType[i].flag = false;
      }

      //之前能添加上  此处必须用this.$set方法更改属性  否则试图不及时更新
      this.$set(this.teacherType, index, {
        level_id: item.id,
        level_name: item.level_name,
        flag: true
      });

      this.typeID = item.level_id;
    },
    type2(item, index) {
      for (var i = 0; i < this.gradeData.child.length; i++) {
        this.gradeData.child[i].flag = false;
      }
      //之前能添加上  此处必须用this.$set方法更改属性  否则试图不及时更新
      this.$set(this.gradeData.child, index, {
        attr_val_id: item.attr_val_id,
        attr_val_name: item.attr_val_name,
        vsort: item.vsort,
        flag: true
      });

      this.gradeID = item.attr_val_id;
    },
    type3(item, index) {
      for (var i = 0; i < this.classData.child.length; i++) {
        this.classData.child[i].flag = false;
      }
      //之前能添加上  此处必须用this.$set方法更改属性  否则试图不及时更新
      this.$set(this.classData.child, index, {
        attr_val_id: item.id,
        attr_val_name: item.attr_val_name,
        vsort: item.vsort,
        flag: true
      });

      this.classID = item.attr_val_id;
    },
    sub() {
      this.flag7 = false;
      this.list = [];
      var collectID = 0;
      var attendedID = 0;
      var sex = "";
      if (this.flag3 == true) {
        collectID = 1;
      }
      if (this.flag4 == true) {
        attendedID = 1;
      }
      if (this.flag5 == true) {
        sex = 0;
      } else {
        sex = 1;
      }
      var ID = "";

      if (this.gradeID == "") {
        ID = this.classID;
      } else if (this.classID == "") {
        ID = this.gradeID;
      } else {
        ID = this.gradeID + "," + this.classID;
      }

      var token = this.$store.state.user.userInfo.remember_token;
      this.$axios
        .get(
          "https://test.365msmk.com/api/app/otoCourse?page=1&limit=10&start_time=&end_time=&level_id=" +
            this.typeID +
            "&is_collect=" +
            collectID +
            "&is_attended=" +
            attendedID +
            "&sex=" +
            sex +
            "&attr_val_id=" +
            ID +
            "&",
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            if (res.data.data == "") {
              this.flag7 = true;
              this.flag2 = false;
            } else {
              this.list = res.data.data;
              this.flag2 = false;
            }
          }
        });
    },
    //type的重置
    reset() {
      //点击重置初始化flag  状态  为刚开始页面状态
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = false;
      this.flag4 = false;
      this.flag5 = false;
      this.flag6 = false;
      this.flag7 = false;
      this.list = [];
      //视图没有及时更新  手动更改每个对象flag
      for (var i = 0; i < this.teacherType.length; i++) {
        //之前能添加上  此处必须用this.$set方法更改属性  否则试图不及时更新
        this.$set(this.teacherType, i, {
          level_id: this.teacherType[i].id,
          level_name: this.teacherType[i].level_name,
          flag: false
        });
      }

      for (var i = 0; i < this.gradeData.child.length; i++) {
        this.$set(this.gradeData.child, i, {
          attr_val_id: this.gradeData.child[i].attr_val_id,
          attr_val_name: this.gradeData.child[i].attr_val_name,
          vsort: this.gradeData.child[i].vsort,
          flag: false
        });
      }

      for (var i = 0; i < this.classData.child.length; i++) {
        //之前能添加上  此处必须用this.$set方法更改属性  否则试图不及时更新
        this.$set(this.classData.child, i, {
          attr_val_id: this.classData.child[i].id,
          attr_val_name: this.classData.child[i].attr_val_name,
          vsort: this.classData.child[i].vsort,
          flag: false
        });
      }

      var token = this.$store.state.user.userInfo.remember_token;
      this.$axios
        .get(
          "https://test.365msmk.com/api/app/otoCourse?page=1&limit=10&start_time=&end_time=&level_id=&is_collect=0&is_attended=0&sex=&attr_val_id=&",
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            if (res.data.data == "") {
              this.flag7 = true;
              this.flag2 = false;
            } else {
              this.list = res.data.data;
              this.flag2 = false;
            }
          }
        });
    }
  }
};
</script>




<style lang="scss">
#Oto {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .wxq-time .wxq-footer,
  .wxq-type .wxq-footer {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    display: flex;
    padding: 0;

    button {
      width: 50%;
      border: none;
      background: white;
      color: red;
      font-size: 0.4rem;
      height: 100%;
    }
    button:nth-of-type(2) {
      background: orangered;
      color: white;
    }
  }

  .wxq-finished {
    padding: 0.2rem 0;
    flex-grow: 1;
    background: #f0f2f5;
    font-size: 0.23rem;
    color: #636363;
    text-align: center;
  }

  .wxq-time {
    padding: 0.2rem 0;
    flex-grow: 1;
    background: #f0f2f5;
    font-size: 0.23rem;
    color: #636363;
    & > div {
      width: 93%;
      margin: 0 auto;
    }
  }

  .wxq-type {
    background: white;
    padding: 0.2rem 0;
    flex-grow: 1;
    border-top: 2px solid #f5f5f5;
    font-size: 0.23rem;
    color: #636363;

    & > div {
      width: 93%;
      margin: 0 auto;
      padding: 0.2rem 0;
      border-bottom: 2px solid #f5f5f5;

      & > p {
        margin-bottom: 0.1rem;
      }
    }

    & > div:last-of-type {
      margin-bottom: 1rem;
    }

    .wxq-div1 {
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
        span:nth-of-type(4n) {
          margin-right: 0;
        }

        .active3 {
          background: pink;
          color: orangered;
        }
      }
    }

    .wxq-div2 {
      & > div {
        display: flex;
        & > div {
          display: flex;
          align-items: center;
          div {
            width: 0.3rem;
            height: 0.3rem;
            border: 2px solid #cccccc;
            border-radius: 8px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-right: 0.1rem;

            span {
              display: inline-block;
              width: 0.1rem;
              height: 0.1rem;
              background: red;
            }
          }
          .active {
            border: 2px solid red;
          }
        }
        & > div:nth-of-type(1) {
          margin-right: 0.6rem;
        }
      }
    }
  }
}

#Oto {
  font-size: 0.2rem;
  line-height: 0.4rem;

  .header {
    height: 0.9rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 2px solid #f5f5f5;
    div:nth-of-type(1) {
      width: 0.19rem;
      height: 0.3rem;
      img {
        width: 100%;
      }
    }
    div:nth-of-type(2) {
      color: #636363;
      font-size: 0.33rem;
      line-height: 0.9rem;
    }
    div:nth-of-type(3) {
      width: 0.4rem;
      height: 0.4rem;
      img {
        width: 100%;
      }
    }
  }
  .yuenav {
    width: 100%;
    height: 0.82rem;
    line-height: 0.82rem;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    div {
      width: 50%;
      color: #8c8c8c;
      font-size: 0.3rem;
      display: flex;
      align-items: center;

      span {
        margin: 0 0.2rem 0 0.8rem;
      }
      .active_s {
        color: orangered;
      }

      i {
        display: inline-block;
        width: 0.2rem;
        height: 0.1rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAAXNSR0IArs4c6QAAAU1JREFUSA3lk71qAkEQx++2zttYBoQ092GVBxFSGBJCFAySIKIpAmnzBqnS3B0EAmlS+jTayG3+/8WBPZU9L3FtHJDZ+fzdzqxBcGoSyoXzPG+XZXkZhuGZ1lpBK8QYV7R5Xvu2bMakBtrkrW3bv1RKvcdx/IZ80zgoiuIc0G8W0elZLtI0/eJNAkA7R4JybC0yDRjGDw3fAs4K4/4kx4Ax9w+cpz7BgGKouhtF0Zycyk6zLJsi2PPxAQB3kyR5ld7mxmIgcI2EmdgH1Fc2lH0rYDo8wHt4xS/sbcsWmMEDwm8AfbaBcq7sWJyi/7NzvN47PNqx9NrUO28sSX+9OaB9F5T9nWAmNIUDOgT0kbUuqQWzeF84/hEjQB9cQIk5dyxJol07B/QJH3gvuXW6EZjNdsEBnQB6Wwez43uN2i7g2LlHwDT8C/wGTaHs9wsfI3k1vlOHEgAAAABJRU5ErkJggg==)
          no-repeat;
        background-size: 100% 100%;
      }
      .active_i {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAYAAABM8m7ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBDMUJFQTRCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ0RDlCOUNCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MEMxQkVBMkI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MEMxQkVBM0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prbv5ocAAAD7SURBVHjaYvz//z8DqeBvGGMNkKoEYk4gbmRe9b+RVDMYSbUYaGkHkCpHE+4FWl5CijlMJFraisVSECgGyvXQxGKgwU1AqgqPEpIsZyLS0nogVUuEUqItJxjHQIOqgVQLiWmHYJwzEbC0ggxLifI5Ex5LS4FUOwP5AK/lWIMaqKEQSPUxUAdgDXYmLJbmUdFSnD5nQrM0G0hNZKA+wLCcCcnSdCA1mYF2AGR5N0ocAwUMgOwzQMzMQHvgB4zzzTAfO9PJUhCwQA7qs3SyFJSFtqFkJ2BwJwGpYGhVBxL8B8XI7H945AixvwDxemAwHyKrWqQWYGIYIAAQYADdQHEe2IBzhgAAAABJRU5ErkJggg==)
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  html,
  body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .box {
    height: 0;
    flex-grow: 1;
    overflow: auto;
  }
  .box > .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .part {
    background: #f0f2f5;
    padding-top: 0.02rem;
    flex-grow: 1;
  }
  .part_div {
    width: 7.12rem;
    height: 1.6rem;
    background: #ffffff;
    border-radius: 4px;
    margin-top: 0.2rem;
    margin-left: 0.2rem;
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
      width: 4rem;
      height: 0.8rem;
      margin-top: 0.44rem;
      margin-left: 0.2rem;
      p:nth-of-type(1) {
        color: #393939;
        font-size: 0.3rem;
        font-weight: 600;

        span:nth-of-type(2) {
          color: orangered;
          font-size: 0.22rem;
          font-weight: normal;
        }
      }
      p:nth-of-type(2) {
        color: #a7a7a7;
        font-size: 0.27rem;
        font-weight: 600;
        span:nth-of-type(2) {
          margin-left: 0.15rem;
        }
      }
    }
    div:nth-of-type(3) {
      width: 1.4rem;
      height: 0.6rem;
      background: #ebeefe;
      text-align: center;
      line-height: 0.6rem;
      color: #eb5a11;
      font-size: 0.25rem;
      font-weight: 400;
      border-radius: 25px;
      margin-top: 0.5rem;
    }
  }
}
</style>