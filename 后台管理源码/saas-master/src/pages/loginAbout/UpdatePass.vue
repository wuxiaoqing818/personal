<template>
  <div id="gm_update_pass">
     <v-header :header='header'></v-header>
     <div class="full_container">
        <div class="update_area">
            <!-- 修改密码 首页 -->
            <div class="update_form_area">
              <p class="login_title">修改密码</p>
              <div class="form-item">
                  <input type="text" id="oddPass" placeholder=" " v-model="updateForm.oddPass">
                  <label for="oddPass" data-label="请输入旧密码"></label>
                  <span v-show="updateForm.oddPass !== ''" @click="clearInput"><img src="@/assets/close.png"></span>
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
                      <input :type="typeFlag == true?'password':'text'" id="newPass" placeholder=" " v-model="updateForm.newPass">
                      <label for="newPass" data-label="请输入新的密码"></label>
                      <span @click="changeTypeFlag"><img :src="typeFlag == true?require('@/assets/yanjingclose.png'):require('@/assets/yanjing.png')"></span>
                  </div>
              </el-tooltip>
              <div class="form-item">
                  <input :type="typeFlagRe == true?'password':'text'" id="reNewPass" placeholder=" ">
                  <label for="reNewPass" data-label="请确认新的密码"></label>
                  <span @click="changeTypeFlagRe"><img :src="typeFlagRe == true?require('@/assets/yanjingclose.png'):require('@/assets/yanjing.png')"></span>
              </div>
              <div class="login_btn">
                <el-button type="warning">确认修改</el-button>
                <el-button @click="back">返回</el-button>
              </div>
              <div class="check_route">
                <p></p>
                <span @click="toRetrievePass">忘记密码？</span>
              </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
export default {
  name:'GmUpdatePass',
  components: {
    'v-header': Header
  },
  data () {
    return {
      header:{
        title:'修改密码',
        isphone: false,
      },
      updateForm:{
        oddPass:'',
        newPass:''
      },
      typeFlag:true,
      typeFlagRe:true
    }
  },
  mounted(){

  },
  methods:{
    toRetrievePass(){
      this.$router.push('/retrieve-pass')
    },
    back(){
      this.$router.go(-1)
    },
    clearInput(){
      this.updateForm.oddPass = ''
    },
    changeTypeFlag(){
      this.typeFlag = !this.typeFlag
    },
    changeTypeFlagRe(){
      this.typeFlagRe = !this.typeFlagRe
    }
  }
}
</script>
<style lang="scss">
  .login_area{
    .el-input__inner{
      height: 66px;
      border:none;
      border-bottom:1px solid #EBEBEB;
      border-radius: 0;
      font-size:16px;
      box-sizing: border-box;
    }
  }
  .login_btn{
    margin-top:40px;
    text-align:center;
    .el-button{
      width: 160px;
    }
  }
</style>

<style lang="scss" scoped>
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


.form-item {
    position: relative;
}
.form-item span{
  display:inline-block;
  position: absolute;
  top:23px;
  right:5px;
  cursor:pointer;
  img{
    width:14px;
    height: 14px;
  }
}
.form-item input {
    display: block;
    width: 100%;
    height: 66px;
    font-size: 16px;
    line-height: 66px;
    color: #333;
    background-color: transparent;
    background-image: none;
    border: none;
    border-bottom: 1px solid #EBEBEB;
    text-indent:15px;
}
.form-item input:focus,
.form-item input:active {
    outline: none;
    box-shadow: none;
}
.form-item input:focus ~ label:before {
    font-size: 12px;
    bottom: 50px;
    color: #9B9B9B;
}
.form-item input:focus ~ label:after {
    background-repeat: no-repeat;
    background-size: 1000% 1000%;
    background-image: radial-gradient(circle, #E22C37 10%, rgba(0, 0, 0, 0) 11%) !important;
}
.form-item input:not(:placeholder-shown) ~ label:before {
    font-size: 12px;
    bottom: 50px;
}
.form-item label:before {
    content: attr(data-label);
    display: block;
    position: absolute;
    color:#9B9B9B;
    left: 15px;
    bottom: 25px;
    transition: all .15s ease-in-out;
}
.form-item label:after {
    content: '';
    position: absolute;
    display: inline-flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transition: all 0.4s ease-in-out;
    background-position: 50%;
    background-size: 200% 200%;
}
</style>


