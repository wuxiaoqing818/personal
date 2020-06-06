<template>
    <div id="gm_choose_shop">
        <v-header :header='header'></v-header>
        <div class="full_container">
          <div class="create_category_area">
            <div class="create_title">
              <img src="@/assets/create_category_icon.png">
              <span>第一步：创建品牌信息</span>
            </div>
            <!-- 新建品牌表单 -->
            <div class="form_area">
              <el-form :model="category" :rules="rules" ref="categoryForm" label-width="2.23rem">
                <el-form-item label="品牌名称:" prop="name">
                    <el-input v-model="category.name" placeholder="请输入品牌名称，不超过8个字符"></el-input>
                </el-form-item>
                <el-form-item label="所属行业:" prop="industry">
                    <el-select v-model="category.industry" placeholder="请选择所属行业">
                      <el-option label="美容" value="s"></el-option>
                      <el-option label="美发" value="b"></el-option>
                    </el-select>
                    <span class="tip">一旦创建，不可修改</span>
                </el-form-item>
                <el-form-item label="品牌口号:">
                  <el-input v-model="category.slogon" placeholder="请输入品牌宣传口号，不超过12个字符"></el-input>
                </el-form-item>
                <el-form-item label="品牌Logo:">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="category.imageUrl" :src="category.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p class="tip">支持jpg，png格式，建议像素200*200px，大小不超过300kb</p>
                </el-form-item>
                <el-form-item label="形象背景:">
                  <el-upload
                    class="avatar-back-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleBackAvatarSuccess"
                    :before-upload="beforeBackAvatarUpload">
                    <img v-if="category.imageBackUrl" :src="category.imageBackUrl" class="avatar-back">
                    <i v-else class="el-icon-plus avatar-back-uploader-icon"></i>
                  </el-upload>
                  <p class="tip">支持jpg，png格式，建议像素640*320px，大小不超过1M</p>
                </el-form-item>
                <el-form-item label='客服电话:' prop="phone">
                    <el-input v-model="category.phone" placeholder="请输入品牌客服咨询电话"></el-input>
                </el-form-item>
                <el-form-item label="品牌简介">
                  <el-input v-model="category.desc" type="textarea" :rows="4" :maxlength="500" placeholder="请输入品牌简介（不超过500字）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('categoryForm')">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
import { setTimeout } from 'timers';
export default {
  name:'GmChooseShop',
  components: {
    'v-header': Header
  },
  data () {
    return {
      header:{
        title:'创建门店',
        isphone: false
      },
      category:{
        name:'',
        industry:'',
        slogon:'',
        imageUrl:'',
        imageBackUrl:'',
        desc:'',
      },
      rules:{
        name:[{required:true, message:'请输入主体品牌名称',trigger:'blur'}],
        industry:[{required:true, message:'请选择所属行业',trigger:'blur'}],
        phone:[{required:true, message:'请输入客服咨询电话',trigger:'blur'}]
      },
    }
  },
  mounted(){
  },
  methods: {
    // 退出登录
    loginOut(){
      this.$router.push('/login')
    },
    // handleChange(value){
    //   console.log(value);
    // },
    // 提交表单验证
    submitForm(formName) {
      this.$router.push('/create-shop')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$router.push('/create-shop')
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
    handleAvatarSuccess(res, file) {
      this.brandForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg;image/png';
      const isLt2M = file.size / 1024 < 300;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 300kb!');
      }
      return isJPG && isLt2M;
    },
    handleBackAvatarSuccess(res, file) {
      this.brandForm.imageBackUrl = URL.createObjectURL(file.raw);
    },
    beforeBackAvatarUpload(file) {
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
  #gm_choose_shop .el-upload__tip{
    color: #9B9B9B;
    font-size: 14px;
  }
  #gm_choose_shop .el-range-editor.el-input__inner,#gm_choose_shop .el-select{
    width: 100%;
  }
  .el-cascader-menus .el-popper{
    position: fixed !important;
  }
</style>

<style lang="scss" scoped>
  .tip{
    color:#9B9B9B;
    font-size:14px;
  }
   #gm_choose_shop {
     .el-cascader{
       width:100%;
     }
     .full_container{
       display: flex;
       flex-direction: column;
       background-color: #F4F5F9;
     }
     .create_category_area{
       flex: 1;
       background-color: #fff;
       .create_title{
         margin: 58px 0 0 85px;
         img{
           width: 55px;
           height: 55px;
           vertical-align: middle;
         }
         span{
          font-size:20px;
         }
       }
       .form_area{
         width: 60%
       }
     }

    }
</style>



