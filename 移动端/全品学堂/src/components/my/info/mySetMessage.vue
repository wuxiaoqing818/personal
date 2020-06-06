<template>
  <div class="MySetMessage">
    <div class="wxq-header">
      <i class="fa fa-angle-left" @click="back()"></i>
      <span>信息填写</span>
    </div>

    <div class="wxq-content">
      <div @click="showPopup4">
        <span>头像</span>
        <p>
          <img :src="userList.avatar" alt />
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <router-link :to="'/my-set-info?tag=nickname&value='+userList.nickname">
          <span>昵称</span>
          <p>
            <span>{{userList.nickname}}</span>
            <i class="fa fa-angle-right"></i>
          </p>
        </router-link>
      </div>

      <div>
        <router-link :to="'/my-set-info?tag=sex&value='+userList.sex">
          <span>性别</span>
          <p>
            <span>{{sex}}</span>
            <i class="fa fa-angle-right"></i>
          </p>
        </router-link>
      </div>

      <div @click="showPopup1">
        <span>出生日期</span>
        <p>
          <span>{{userList.birthday}}</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div @click="showPopup2">
        <span>所在城市</span>
        <p>
          <span>{{userList.province_name}},{{userList.city_name}},{{userList.district_name}}</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div @click="showPopup3">
        <span>年级</span>
        <p>
          <span>{{gradeData}}</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <router-link :to="'/my-set-info?tag=subject'">
          <span>学科</span>
          <p>
            <span v-show="!classFlag">请选择</span>
            <span v-show="classFlag" v-for="(item,key) in classList" :key="key">{{item.attr_value}}</span>
            <!-- <span>{{userList.attr}}</span> -->
            <i class="fa fa-angle-right"></i>
          </p>
        </router-link>
      </div>

      <button @click="subMessage()">提交信息</button>
    </div>

    <!-- 出生日期弹出层 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '36%' }">
      <van-datetime-picker v-model="currentDate" type="date" @confirm="day" />/>
    </van-popup>
    <!-- 城市弹出层 -->
    <van-popup v-model="show2" position="bottom" :style="{ height: '36%' }">
      <van-area
        :area-list="areaList"
        :columns-num="3"
        title="标题"
        value="110101"
        @confirm="city"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup>
    <!-- 年级弹出层 -->
    <van-popup v-model="show3" position="bottom" :style="{ height: '36%' }">
      <van-area
        :area-list="areaList2"
        :columns-num="1"
        title="标题"
        @confirm="grade"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
      <!-- 官网是下一种  比较简单 -->
      <!-- <van-picker show-toolbar title="标题" :columns="columns" @cancel="onCancel" @confirm="onConfirm" /> -->
    </van-popup>
    <!-- <van-popup v-model="show4" position="bottom" :style="{ height: '36%' }">学科</van-popup> -->

    <!-- 头像弹出层 -->
    <van-popup v-model="show4" position="bottom" :style="{ height: '24%' }">
      <ul class="wxq-headImg">
        <li>
          拍照
          <input type="text" />
        </li>
        <li>
          <input type="file" accept="image/*" @change="selectImg()" ref="upload_file" />
          从手机相册选择
        </li>
        <li>
          <input type="text" />
          取消
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import http from "../../http/http";
export default {
  mounted() {
    //调用请求接口的方法  每次访问页面要渲染  所以在mounted调用
    this.getUserInfo();
  },
  created() {},
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      userList: [],
      sex: "",
      currentDate: new Date(),
      time: "",
      city1: "",
      city2: "",
      city3: "",
      classList: [],
      classFlag: "",
      gradeData: "",
      areaList: {
        province_list: {
          110000: "北京",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
          // ....
        }
      },
      areaList2: {
        province_list: {
          // 18: "小学一年级",
        }
      }
      // columns: [
      //   { id: 1, text: "杭州" },
      // ]
    };
  },
  methods: {
    //请求用户信息方法
    async getUserInfo() {
      var token = this.$store.state.user.userInfo.remember_token;
      var userInfo = await http(
        "get",
        "https://test.365msmk.com/api/app/userInfo?",

        null,
        token
      );
      console.log(userInfo);
      this.userList = userInfo.data.data;
      //设置性别
      if (this.userList.sex == 0) {
        this.sex = "男";
      } else if (this.userList.sex == 1) {
        this.sex = "女";
      } else {
        this.sex = "请选择";
      }
      //设置出生日期所在城市等 如果为空请选择
      if (this.userList.birthday == 0) {
        this.userList.birthday = "请选择";
      }
      if (this.userList.province_name == "") {
        this.userList.province_name = "请选择";
        this.userList.city_name = "";
        this.userList.district_name = "";
      }

      if (this.userList.attr == "") {
        this.gradeData = "请选择";
        this.classFlag = false;
      } else {
        this.classFlag = true;
        this.gradeData = this.userList.attr[0].attr_value;
        this.classList = this.userList.attr.slice(1);
        // console.log(this.classList);
      }
    },
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;


    },
    showPopup3() {
      this.show3 = true;

      var token = this.$store.state.user.userInfo.remember_token;
      http(
        "get",
        "https://test.365msmk.com/api/app/module/attribute/1?",
        null,
        token
      ).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          var cityArr = res.data.data[0].value;
          cityArr.sort(function(a, b) {
            return a.id - b.id;
          });
          // console.log(cityArr)
          //给areaList2.province_list年级列表  变量动态添加属性和属性值
          for (var i = 0; i < cityArr.length; i++) {
            var idd = cityArr[i].id;
            var name = cityArr[i].name;
            // this.areaList2.province_list.id = name;
            this.$set(this.areaList2.province_list, idd, name);
          }
          // console.log(this.areaList2.province_list);
        }
      });
    },
    showPopup4() {
      this.show4 = true;
    },
    //选择图片
    selectImg() {
      //第一步拿到文件
      var file = this.$refs.upload_file.files[0];
      // console.log(file)
      var formdata1 = new FormData(); //创建form对象
      formdata1.append("file", file); //通过append向form对象添加数据，可以通过append继续添加数据
      //或formdata1.append("img",file)
      let config = {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundaryXP5PaNFa4AAVRmL",
          Authorization:
            "Bearer " + this.$store.state.user.userInfo.remember_token
        }
      }; //添加请求头
      let _this = this;
      this.$axios
        .post("https://test.365msmk.com/api/app/public/img", formdata1, config)
        .then(res => {
          if (res.data.code == 200) {
            // console.log(res);
            // alert(444);
            _this.$axios
              .put(
                "https://test.365msmk.com/api/app/user",
                { avatar: res.data.data.path },
                {
                  headers: {
                    Authorization:
                      "Bearer " + this.$store.state.user.userInfo.remember_token
                  }
                }
              )
              .then(res => {
                // console.log(res);
                this.userList.avatar = res.data.data.avatar;
                this.show4 = false;
              });
          }
        });
    },
    //提交信息
    subMessage() {
      this.$router.push("/person");
    },
    //设置信息返回设置密码
    back() {
      this.$router.push("/person");
    },
    day(d) {
      //点击时间确定让弹出层隐藏
      this.show1 = false;
      var y = d.getFullYear(); //getFullYear方法以四位数字返回年份
      var m = d.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
      var d = d.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
      this.time = y + "-" + m + "-" + d;

      var token = this.$store.state.user.userInfo.remember_token;
      http(
        "put",
        "https://test.365msmk.com/api/app/user",
        {
          birthday: this.time
        },
        token
      ).then(res => {
        console.log(res);
        // this.name=res.
        if (res.data.code == 200) {
          //如果成功把时间给userList的birthday  监听userList 达到数据实时更新
          this.userList.birthday = this.time;
          this.$toast({
            message: res.data.msg
          });
        }
      });
    },
    city(c) {
      //点击城市确定让弹出层隐藏
      this.show2 = false;
      // console.log(c);
      this.city1 = c[0].code;
      this.city2 = c[1].code;
      this.city3 = c[2].code;

      var token = this.$store.state.user.userInfo.remember_token;
      http(
        "put",
        "https://test.365msmk.com/api/app/user",
        {
          province_id: this.city1,
          city_id: this.city2,
          district_id: this.city3
        },
        token
      ).then(res => {
        // console.log(res);
        // this.name=res.
        if (res.data.code == 200) {
          //如果成功把时间给userList的city   监听userList 达到数据实时更新
          this.userList.province_name = c[0].name;
          this.userList.city_name = c[1].name;
          this.userList.district_name = c[2].name;
          this.$toast({
            message: res.data.msg
          });
        }
      });
    },
    grade(g) {
      //点击年级确定让弹出层隐藏
      this.show3 = false;

      console.log(g);
      // this.gradeID = g.id;
      // this.classID=this.userList.attr.attr_val_id
      //  console.log(this.userList.attr[0])
      // this.userList.attr[0]=""
      // this.userList.attr[1]=""
      var arr = [];
      var obj = {
        attr_id: 1,
        attr_val_id: g[0].code
      };
      arr.push(obj);
      this.classArr = this.userList.attr.slice(1);

      for (var i = 0; i < this.classArr.length; i++) {
        arr.push(this.classArr[i]);
      }

      // console.log(arr);

      var token = this.$store.state.user.userInfo.remember_token;
      http(
        "put",
        "https://test.365msmk.com/api/app/user",
        {
          user_attr: JSON.stringify(arr)
        },
        token
      ).then(res => {
        console.log(res);
        // this.name=res.
        if (res.data.code == 200) {
          //如果成功把年级给userList的attr里的年级   监听userList 达到数据实时更新
          this.gradeData = g[0].name;
          // alert("11");
          this.$toast({
            message: res.data.msg
          });
        }
      });
    }
  },
  watch: {
    //监听userList  实现不刷新页面的数据更新
    userList: {
      handler(val) {
        this.userList = val;
        // this.gradeData = val.attr[0].attr_value
      },
      deep: true
    }
    // gradeData:function(val) {
    //   this.gradeData = val;
    // }
  }
};
</script>

<style lang="scss">
.MySetMessage {
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
    align-items: center;
    background: white;
    margin-bottom: 0.1rem;
    font-size: 0.32rem;

    span {
      margin-left: 2.8rem;
    }
  }

  .wxq-content {
    background: white;
    width: 100%;
    flex: 1;
    padding: 0 0.2rem;

    i {
      font-size: 0.48rem;
    }

    div:nth-of-type(4),
    div:nth-of-type(5),
    div:nth-of-type(6) {
      padding: 0.3rem 0;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cccccc;
      font-size: 0.27rem;

      p {
        color: #bebebe;

        span {
          margin-right: 0.19rem;
        }
      }
    }
    div:nth-of-type(1) {
      width: 100%;
      height: 1.1rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cccccc;
      font-size: 0.27rem;
      align-items: center;
      p {
        color: #bebebe;
        display: flex;
        align-items: center;

        img {
          width: 0.74rem;
          height: 0.74rem;
          margin-right: 0.19rem;
          border-radius: 50%;
        }
      }
    }
    div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(7) {
      border-bottom: 1px solid #cccccc;
      font-size: 0.27rem;

      a {
        display: block;
        padding: 0.3rem 0;
        color: black;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-decoration: none;
      }

      p {
        color: #bebebe;

        span {
          margin-right: 0.19rem;
        }
      }
    }

    div:last-of-type {
      border: none;
      margin-bottom: 1.6rem;
    }

    button {
      width: 100%;
      height: 0.9rem;
      border: none;
      outline: none;
      background: #eb6100;
      background-size: 100% 100%;
      color: white;
      margin-top: 0.46rem;
      border-radius: 5px;
    }
  }

  .wxq-headImg {
    width: 100%;
    height: 100%;
    padding: 0.1rem 0.2rem;
    font-size: 0.36rem;

    li {
      position: relative;
      width: 100%;
      height: 33.3%;
      line-height: 33.3%;
      text-align: center;
      border-bottom: 1px solid #cccccc;

      input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border: none;
        opacity: 0;
      }
    }
  }
}
</style>