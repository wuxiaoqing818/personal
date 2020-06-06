<template>
  <div class="MySetName">
    <div class="wxq-header">
      <i class="fa fa-angle-left" @click="back()"></i>
      <span>修改个人信息</span>
      <span @click="save()">保存</span>
    </div>

    <div class="wxq-content1" v-if="tag=='nickname'">
      <input type="text" v-model="name" />
    </div>

    <div class="wxq-content2" v-if="tag=='sex'">
      <p @click="setSex1()">
        <span>男</span>
        <i v-show="flag1"></i>
      </p>
      <p @click="setSex2()">
        <span>女</span>
        <i v-show="flag2"></i>
      </p>
    </div>

    <div class="wxq-content3" v-if="tag=='subject'">
      <p v-for="(item,key) in classList" :key="item.id">
        <input type="checkbox" v-model="item.checked" @click="change1(item,key)" />
        <span>{{item.name}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import http from "../http/http";
export default {
  mounted() {
    //调用请求接口的方法  每次访问页面要渲染  所以在mounted调用
    //先获取tag参数  判断是否调用方法请求接口渲染   避免打开姓名 性别 学科 都请求学科数据
    // console.log(this.$route.query.tag);
    // console.log(this.$route.query.value);
    this.tag = this.$route.query.tag;

    if (this.tag == "subject") {
      this.getUserInfoAndAttr();
    }

    // console.log(this.tag)

    if (this.$route.query.value == 0) {
      this.flag1 = true;
      this.flag2 = false;
      this.sex = this.$route.query.value;
    } else if (this.$route.query.value == 1) {
      this.flag2 = true;
      this.flag1 = false;
      this.sex = this.$route.query.value;
    } else if (this.$route.query.value === 3) {
      //绝对等于  因为名字是字符串  不绝对3的话下面不执行 性别3为没有
      this.flag1 = true;
      this.flag2 = false;
      this.sex = this.$route.query.value;
    } else {
      this.name = this.$route.query.value;
    }

    // this.$axios
    //   .get("https://test.365msmk.com/api/app/module/attribute/1?", {
    //     headers: {
    //       Authorization: "Bearer " + sessionStorage.getItem("token")
    //     }
    //   })
    //   .then(res => {
    //     this.classList = res.data.data[1].value;
    //     for (var i = 0; i < this.classList.length; i++) {
    //       this.classList[i].checked = false;
    //     }
    //     // console.log(this.classList);
    //   });
  },

  created() {
    //接受传递的姓名 当前input为客户姓名
    // this.name = this.$route.query.name;
  },
  data() {
    return {
      name: "",
      tag: "",
      sex: "",
      flag1: false,
      flag2: false,
      classList: [],
      chooseClass: [{ attr_id: 1, attr_val_id: 1 }]
    };
  },
  methods: {
    //请求年级学科的数据
    async getUserInfoAndAttr() {
      var token = this.$store.state.user.userInfo.remember_token;
      var userInfo = await http(
        "get",
        "https://test.365msmk.com/api/app/module/attribute/1?",
       
        null,
         token
      );
      console.log(userInfo);
      if (userInfo.data.code == 200) {
        //如果请求成功 拿出学科数据  循环遍历给里面的每个对象元素添加一个checked属性 默认为false
        this.classList = userInfo.data.data[1].value;
        for (var i = 0; i < this.classList.length; i++) {
          this.classList[i].checked = false;
        }
        this.$toast({
          message: userInfo.data.msg
        });
      } else {
        this.$toast({
          message: userInfo.data.msg
        });
      }
    },
    setSex1() {
      this.flag1 = true;
      this.flag2 = false;
      this.sex = 0;
    },
    setSex2() {
      this.flag2 = true;
      this.flag1 = false;
      this.sex = 1;
    },
    //返回设置信息页面
    back() {
      this.$router.push("/my-set-message");
    },
    save() {
      if (this.tag == "nickname") {
        var token = this.$store.state.user.userInfo.remember_token;
        http("put", "https://test.365msmk.com/api/app/user", {
          nickname: this.name
        }, token).then(res => {
          console.log(res);
          // this.name=res.
          this.$router.push({
            path: "/my-set-message"
            // query: { chooseClass: this.chooseClass }
          });
        });
      }

      if (this.tag == "sex") {
        var token = this.$store.state.user.userInfo.remember_token;
        http("put", "https://test.365msmk.com/api/app/user", {
          sex: this.sex
        }, token).then(res => {
          console.log(res);
          // this.name=res.
          this.$router.push({
            path: "/my-set-message"
            // query: { chooseClass: this.chooseClass }
          });
        });
      }

      if (this.tag == "subject") {
        var token = this.$store.state.user.userInfo.remember_token;
        http("put", "https://test.365msmk.com/api/app/user", {
          user_attr: JSON.stringify(this.chooseClass)
        }, token).then(res => {
          console.log(res);
          // this.name=res.
          this.$router.push({
            path: "/my-set-message"
            // query: { chooseClass: this.chooseClass }
          });
        });
      }
    },
    //给复选框加点击事件
    change1(item, key) {
      // alert(key);
      item.checked = !item.checked;

      if (item.checked == true) {
        var obj = {
          attr_id: 2,
          attr_val_id: item.id
        };
      }

      this.chooseClass.push(obj);
      console.log(this.chooseClass);

      // console.log(this.chooseClass);
    }
  }
};
</script>

<style lang="scss">
.MySetName {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;

  .wxq-header {
    padding: 0 0.2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-bottom: 0.2rem;
    font-size: 0.32rem;

    span:nth-of-type(2) {
      font-size: 0.28rem;
    }
  }

  .wxq-content1 {
    width: 100%;
    flex: 1;
    input {
      width: 100%;
      height: 1rem;
      padding: 0.4rem 0.3rem;
      border: none;
      outline: none;
      font-size: 0.27rem;
    }
  }

  .wxq-content2 {
    width: 100%;
    flex: 1;

    p {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0.2rem;
      border-bottom: 1px solid #cccccc;
      background: white;

      i {
        width: 0.3rem;
        height: 0.3rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMTk5NkVCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMTk5NkZCNzRDMTFFOTlEMzU4OTdFRjlDNjMxNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUExOTk2Q0I3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUExOTk2REI3NEMxMUU5OUQzNTg5N0VGOUM2MzE2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvL8dXQAAAHGSURBVHjaYvz//z/DQALGP6F0t1MRiIOB+BEQr2ahs+UaQHwMiAWhfF0mOlrOA8RrkSwHAXt6OmAOEGuhic2ilwMKgDgcTWwuEC+hRyK0AeL9QIyc3s4BsTUQ/6C1AySglkkiib0DYmMgfgDi0DIKQD5eiWY5qNCJgVlOawd0ALEdmlgTEG+nR0EUAipk0MR2ALE3EP+jtQPUgfg0EPMiiT2Axvs7dMVMNChs1qFZ/hMaIu+waWCiQ2GTA8RncWkAOcAAiK8C8VcgngzEbFQsbOZBHYW3NtwJpN2QxECFRhAQf6BWYYNPIygEnqOJOQLxESCWI6GwWYVm+XtolfuDkGaQA4qA+DiauDYQnwBiPTILm2jkwoaQA0Cp0wmaepEByNBDWAoTkgsbYltEIMf0QhMTMgAFYyQQbyC3sCG1SVYCxF0gOSSxv0CcCcSz8RQ2D4HYCFd+J7VNGAetr9GbbLVAPAGIT6Ll95/QFH+Wmo1SL2gQc6GJgxKXAppYKqH8Tm6r2BKItwCxEB41oMImmZbNck0gBhVWsljkiCpsCGVDQuA6jvi9BMT+lFhOanXMDMQ+0EIKVHfsAuLvFPeMBrprBhBgADxzbshcfaUMAAAAAElFTkSuQmCC)
          no-repeat 100%;
        background-size: 100% 100%;
      }
    }
    p:last-of-type {
      border-bottom: none;
    }
  }

  .wxq-content3 {
    width: 100%;
    flex: 1;
    p {
      padding: 0.3rem 0.2rem;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      background: white;

      span {
        margin-left: 0.2rem;
      }

      input[type="checkbox"] {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>