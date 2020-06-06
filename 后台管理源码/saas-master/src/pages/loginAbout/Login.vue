<template>
    <div id="gm_login_page">
      <v-header :header='header'></v-header>
      <div class="login_area">
            <div class="login_div">
              <p class="login_title">欢迎登录</p>
              <!-- 登录表单 -->
              <el-form>
                  <el-form-item>
                    <el-input v-model="user.username"  placeholder='请输入手机号码' clearable></el-input>
                    <el-input  type="password" v-model="user.password" placeholder='请输入登录密码' clearable></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="loginIn" type="warning">登录</el-button>
                  </el-form-item>
              </el-form>
              <div class="check_route">
                <p>没有及美账号？<span @click="toRegister">立即注册</span></p>
                <span @click="toRetrievePass">忘记密码？</span>
              </div>
            </div>
      </div>
      <v-footer></v-footer>
      <!-- <div class="login_area">
            <div class="login_title">登录</div>
            <div class="login_area">
              <el-input placeholder="请输入手机号码"  v-model="user"></el-input>
              <el-input placeholder="请输入登录密码" type="password" v-model="password"></el-input>
              <p @click="clearCookie('user')">忘记密码？</p>
              <el-button type="primary" @click="loginIn">登录</el-button>
              <p>没有账号，注册免费使用<i class="el-icon-arrow-right"></i></p>


              <el-input placeholder="请输入内容" v-model="code">
                <el-button type="primary" slot="append" v-show="showBtn" @click="getCode">获取验证码</el-button>
                <el-button v-show="!showBtn" slot="append">{{count}}s</el-button>
              </el-input>
            </div>
      </div> -->
    </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
import Footer from '@/compontents/loginCommon/LoginFooter.vue'
export default {
  name:'GmLoginPage',
  components: {
    'v-header': Header,
    'v-footer': Footer
  },
  data () {
    return {
      header:{
        title:'用户登录',
        isphone:true
      },
      user:{
        username:'',
        password:''
      },
      // 验证码
      code:'',
      count:'',
      showBtn:true,
      timer:null
    }
  },
  mounted(){
    // this.getCookie("user");
  },
  methods: {
    // 跳转到注册页面
    toRegister(){
      this.$router.push('/register')
    },
    // 跳转到忘记密码页面
    toRetrievePass(){
      this.$router.push('/retrieve-pass')
    },
    // 登录成功跳转chooseshop页面
    loginIn(){
      this.$router.push('/choose-shop')
    }
    // loginIn(){
    //   this.setCookie('user','232',0.5);
    // },
    // // 设置cookie，存cookie, 有过期时间
    // setCookie (cname,cvalue,exdays){
    //   let d = new Date();
    //   d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //   window.document.cookie = cname + "=" + cvalue + ";path=/;expires=" + d.toGMTString();
    // },
    // // 获取cookie
    // getCookie (cname){
    //   let v = window.document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
    //   console.log(v);
    //   if(v&&v[2]){
    //     this.user = v[2]
    //   }
    // },
    // // 删除cookie
    // clearCookie(cname){
    //   this.setCookie(cname, "", -1);
    // },
  }
}
</script>

<style lang="scss" scoped>
    #gm_login_page{
        width: 100%;
        height: 100%;
        .login_area{
          background: url('../../assets/logo_back.png') no-repeat;
          background-position: center;
          background-size: 100%;
           display: flex;
           justify-content: flex-end;
          .login_div{
            margin-right: 3rem;
          }
        }
    }
</style>



