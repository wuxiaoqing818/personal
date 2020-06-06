<template>
    <div id="gm_register">
        <v-header :header='header'></v-header>
        <div class="full_container">
            <div class="update_area">
                <!-- 修改密码 首页 -->
               <div class="update_form_area">
                  <p class="login_title">欢迎注册</p>
                  <div class="form-item">
                      <input type="text" placeholder=" " v-model="user.username">
                      <label data-label="请输入手机号码"></label>
                      <span v-show="user.username !== ''" @click="clearInput"><img src="@/assets/close.png"></span>
                  </div>
                  <div class="form-item">
                      <input type="text" placeholder=" " v-model="user.code">
                      <label data-label="请输入验证码"></label>
                       <!-- 获取验证码按钮 -->
                      <span v-show="showBtn" @click="getCode" class="code_position">获取验证码</span>
                      <span v-show="!showBtn" class="code_position">{{count}}s</span>
                  </div>
                  <el-tooltip class="item" effect="light" placement="right">
                    <div slot="content">
                      <ul>
                        <li>6-20位数字、字母、标点符号组合（不可有空格）</li>
                        <li>至少包括数字、字母、标点中的两种</li>
                        <li>字母区分大小写</li>
                      </ul>
                    </div>
                    <div class="form-item">
                        <input :type="typeFlag == true?'password':'text'" placeholder=" " v-model="user.password">
                        <label data-label="请设置登录密码"></label>
                        <span @click="changeTypeFlag"><img :src="typeFlag == true?require('@/assets/yanjingclose.png'):require('@/assets/yanjing.png')"></span>
                    </div>
                  </el-tooltip>
                  <p class="deal_area">
                    <el-checkbox v-model="checkDeal"></el-checkbox>
                    我已阅读并同意<span>《及美用户服务协议》</span>
                  </p>
                  <div class="login_btn">
                    <el-button type="warning" v-if="checkDeal">同意协议并注册</el-button>
                    <el-button type="info" v-if="!checkDeal" disabled>同意协议并注册</el-button>
                  </div>
                  <div class="check_route">
                    <p>已有账号？<span @click="toLogin">去登录></span></p>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
export default {
  name:'GmRegister',
  components: {
    'v-header': Header
  },
  data () {
    return {
      header:{
        title:'用户注册',
        isphone:false
      },
      user:{
        username:'',
        password:'',
        code:'',
      },
      count:'',
      showBtn:true,
      timer:'',
      typeFlag:true,
      checkDeal:false
    }
  },
  mounted(){

  },
  methods: {
    // 返回登录页面
    toLogin(){
      this.$router.push('/')
    },
    // 获取验证码
    getCode(){
       const timeCount = 60;
       if(!this.timer){
         this.count = timeCount
         this.showBtn = false
         //设置倒计时
         this.timer = setInterval(()=>{
           if(this.count>0&&this.count<=timeCount){
             this.count--;
           }else{
             this.showBtn = true
             clearInterval(this.timer);
             this.timer = null;
           }
         },1000)
       }
    },
    clearInput(){
      this.user.username = ''
    },
    changeTypeFlag(){
      this.typeFlag = !this.typeFlag
    }
  }
}
</script>

<style lang="scss">
#gm_register .login_btn{
  .el-button{
    width:100%;
  }
}
</style>

<style lang="scss" scoped>
    #gm_register{
       .check_route{
              p{display:flex;justify-content: flex-end;}
            }
    }
    .full_container{
      background: #fff;
      .update_area{
        padding: 60px 0;
        display:flex;
        justify-content: center;
      }
    }
      .update_form_area{
        width:352px;
        // height:424px;
        padding: 40px 40px 100px 40px;
        .login_title{
          font-size: 20px;
          color: #333;
          margin-bottom:40px;
          padding-left:15px;
        }
        .check_route{
          display:flex;
          flex-direction:row;
          margin-top:0.3rem;
          font-size:0.14rem;
          color:#9B9B9B;
          p{
            flex:1;
          }
          span{
            cursor: pointer;
            color:#E22C37;
          }
        }
      }
      .code_position{
        display:inline-block;
        width:110px;
        height:42px;
        text-align:center;
        line-height:42px;
        background: #FFE8E8;
        font-size:16px;
        font-weight:400;
        color: #E22C37;
        position: absolute;
        right: 10px;
        top: 15px;
        cursor: pointer;
      }
      .deal_area{
        margin-top: 25px;
        color: #9B9B9B;
        font-size: 14px;
        span{color:#E22C37;cursor:pointer;}
      }
      .login_btn{
        margin-top: 30px;
      }
</style>



