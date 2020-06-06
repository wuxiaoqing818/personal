<template>
  <div class="setInfo">
    <header>
      <i class="fa fa-angle-left" @click="goBack()"></i>
      <h5>账号信息</h5>
      <p></p>
    </header>
    <div class="wxq-content">
      <div>
        <span>头像</span>
        <p @click="pickPhoto">
          <img :src="userList.avatar" alt v-show="userList.avatar" />
          <img src="../../../../static/images/home-active.png" v-show="!userList.avatar" />
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>ID</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>

      <div>
        <span>账号</span>
        <p>
          <span></span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>

      <div>
        <span>昵称</span>
        <p>
          <span></span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>角色</span>
        <p>
          <span></span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>性别</span>
        <p>
          <span></span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>生日</span>
        <p>
          <span></span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
    </div>
    <div class="wxq-content">
      <div>
        <span>地区</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>学校</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>年级</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>教材版本</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
    </div>

    <div class="wxq-content">
      <div>
        <span>学号</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
      <div>
        <span>等级称号</span>
        <p>
          <span>111</span>
          <i class="fa fa-angle-right"></i>
        </p>
      </div>
    </div>
    <!-- 遮罩层嵌内容 头像部分拍照 相册-->
    <van-overlay :show="oShow">
      <div class="wrapper" @click="oShow=false">
        <div class="block">
          <h5>请选择您的获取图片方式</h5>
          <ul>
            <li>
              <span>拍照</span>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                @change="onChangeAvatar()"
                ref="uploadFile"
              />
            </li>
            <li>
              <span>相册</span>
              <input type="file" @change="selectImg()" ref="upload_file" />
            </li>
          </ul>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oShow: false, //控制遮罩层
      userList: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    pickPhoto() {
      this.oShow = true;
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
                console.log(res);
                this.userList.avatar = res.data.data.avatar;
                console.log(this.userList.avatar);
                this.$set(this.userList,"avatar",res.data.data.avatar)
              });
          }
        });
    },
    onChangeAvatar(e) {
      alert("111");
      var localFile = this.$refs.uploadFile.files[0];
      console.log(localFile);
    }
  },
  watch: {
    //监听userList  实现不刷新页面的数据更新
    userList: {
      handler(val) {
        this.userList = val;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.setInfo {
  width: 100%;
  height: 100%;

  header {
    padding: 0.2rem 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-bottom: 0.2rem;

    h5 {
      font-weight: bolder;
    }

    i {
      font-size: 0.6rem;
    }
  }

  .wxq-content {
    background: white;
    width: 100%;
    flex: 1;

    div {
      padding: 0.2rem 0.2rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.01rem solid #eee;

      p {
        color: #bebebe;
        display: flex;
        align-items: center;

        ime-mode: {
          margin-left: 0.1rem;
        }
      }
    }

    i {
      font-size: 0.48rem;
    }

    div:nth-of-type(1) {
      font-size: 0.27rem;
      align-items: center;

      img {
        width: 0.74rem;
        height: 0.74rem;
        margin-right: 0.19rem;
        border-radius: 50%;
      }
    }

    div:last-of-type {
      border: none;
      margin-bottom: 0.2rem;
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
    width: 6rem;
    background-color: white;
    border-radius: 0.1rem;
    padding: 0.2rem 0.2rem;

    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 0.3rem;

      li {
        position: relative;
        width: 49%;
        border: 0.01rem solid #eee;
        border-radius: 0.4rem;
        color: #ccc;
        font-weight: 200;
      }

      input {
        padding: 0.16rem;
        width: 100%;
        opacity: 0;
      }
      li:last-of-type {
        background: #00ced1;
        color: white;
      }
      span {
        position: absolute;
        top: 0.2rem;
        left: 1rem;
      }
    }
  }
}
</style>