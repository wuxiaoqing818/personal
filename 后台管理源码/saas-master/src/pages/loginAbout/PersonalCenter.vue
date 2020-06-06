<template>
  <div id="gm_personal_center">
    <v-header :header='header'></v-header>
    <div class="full_container">
        <div class="container_area">
          <!-- 顶部操作 -->
          <div class="per_header">
            <div class="head_left">
              <img src="@/assets/dong_logo.png" class="fixed_img">
              <div class="per_msg">
                <p>宋冬野</p>
                <p>13543234567</p>
                <p>
                  <span @click="toUpdatePass">修改密码</span>
                  <span @click="logout">退出</span>
                </p>
              </div>
            </div>
            <div class="head_right">
              <el-button @click="toChooseShop">我的店铺</el-button>
              <el-button type="primary">创建店铺</el-button>
            </div>
          </div>
          <!-- 表单 -->
          <div class="per_form">
            <el-form :model="perForm"  label-width="80px">
              <el-form-item label="姓名:">
                <el-input v-model="perForm.name" placeholder="请输入姓名"></el-input>
                <span class="tip">仅可修改一次</span>
              </el-form-item>
              <el-form-item label="昵称:">
                <el-input v-model="perForm.nickname" placeholder="请输入昵称"></el-input>
                <span class="tip">仅可修改一次</span>
              </el-form-item>
              <el-form-item label="性别:">
                <el-select v-model="perForm.sex" placeholder="请选择">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日:">
                <el-date-picker
                  style="width:100%;max-width:400px;"
                  v-model="perForm.birth"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="登录手机:">
                <el-input v-model="perForm.phone" placeholder="请输入手机号"></el-input>
                <span class="tip">如需修改，请联系客服</span>
              </el-form-item>
              <el-form-item label="头像:">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="perForm.imageUrl" :src="perForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="tip">支持jpg，png格式，建议像素640*640px，大小不超过1M</span>
              </el-form-item>
              <el-form-item label="个人简介:">
                <el-input type="textarea" :rows="4" :maxlength="150" placeholder="请输入个人简介（不超过150字）" v-model="perForm.info"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
export default {
  name:'GmPersonalCenter',
  components: {
    'v-header': Header
  },
  data () {
    return {
      header:{
        title:'个人中心',
        isphone: false,
      },
      perForm:{
        name:'',
        nickname:'',
        sex:'1',
        birth:'',
        phone:'',
        imageUrl:'',
        info:''
      }
    }
  },
  mounted(){

  },
  methods: {
    toChooseShop(){
      this.$router.push('/choose-shop')
    },
    logout(){
      this.$router.push('/')
    },
    toUpdatePass(){
      this.$router.push('/update-pass')
    },
    handleAvatarSuccess(res, file) {
      this.perForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg;image/png';
      const isLt2M = file.size / 1024 /1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1M!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style lang="scss">
#gm_personal_center {.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }}
</style>

<style lang="scss" scoped>
  .full_container{
    background: #fff;
    .container_area{
      padding:80px 0 100px 160px;
    }
  }
  .per_header{
    display: flex;
    .head_left{
      flex:1;
      display: flex;
      .per_msg{
        padding-top:10px;
        p{font-size:18px;}
        span{
          color: #E6333F;
          font-size:14px;
          margin-right:10px;
          padding-top: 10px;
          display:inline-block;
          cursor:pointer;
        }
      }
    }
    .fixed_img{
      width: 92px;
      height:92px;
      border-radius: 50%;
      margin-right:20px;
    }
    .head_right{
      padding-right:200px;
      margin-top:10px;
    }
  }
  .per_form{
    margin-top:30px;
    .tip{
      color: #9B9B9B;
      font-size:14px;
      padding-left:10px;
    }
  }
</style>


