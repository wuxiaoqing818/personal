<template>
  <div id="gm_shop_basic_info">
    <el-radio-group v-model="showMsg">
      <el-radio-button label="1">品牌信息</el-radio-button>
      <el-radio-button label="0">品牌认证</el-radio-button>
    </el-radio-group>
    <!-- 品牌信息 -->
    <div class="brand_info" v-show='showMsg === "1"'>
      <el-form :modal='brandForm'>
        <el-form-item label="品牌名称:" :label-width="formLabelWidth">
          <el-input placeholder="请输入品牌名称" v-model="brandForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属行业:" :label-width="formLabelWidth">
          <el-input placeholder="请输入所属行业" v-model="brandForm.trade" readonly></el-input>
          <span class="tip">如需修改所属行业，请联系及美客服</span>
        </el-form-item>
        <el-form-item label="Slogan:" :label-width="formLabelWidth">
          <el-input placeholder="请输入Slogan" v-model="brandForm.slogan"></el-input>
        </el-form-item>
        <el-form-item label="Logo:" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="brandForm.imageUrl" :src="brandForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="tip">支持jpg，png格式，建议像素200*200px，大小不超过300kb</p>
        </el-form-item>
        <el-form-item label="形象背景:" :label-width="formLabelWidth">
            <el-upload
              class="avatar-back-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleBackAvatarSuccess"
              :before-upload="beforeBackAvatarUpload">
              <img v-if="brandForm.imageBackUrl" :src="brandForm.imageBackUrl" class="avatar-back">
              <i v-else class="el-icon-plus avatar-back-uploader-icon"></i>
            </el-upload>
            <p class="tip">支持jpg，png格式，建议像素640*320px，大小不超过1M</p>
        </el-form-item>
        <el-form-item label="客服电话:" :label-width="formLabelWidth">
          <el-input placeholder="请输入客服电话" v-model="brandForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="品牌简介:" :label-width="formLabelWidth">
          <el-input type="textarea"  :rows="5" :maxlength='500' placeholder="请输入品牌简介（不超过500字）" v-model="brandForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 品牌认证 -->
    <div class="brand_certification" v-show='showMsg === "0"'>
        <el-form :modal='certForm'>
          <el-form-item label="品牌名称:"  :label-width="formLabelWidth">
            <span>苑苑美容美发</span>
          </el-form-item>
          <el-form-item label="所属行业:"  :label-width="formLabelWidth">
            <span>美容美发综合店</span>
          </el-form-item>
          <el-form-item label="认证状态:"  :label-width="formLabelWidth">
              <el-steps :space="240" :active="activeStep" align-center>
                <el-step
                  v-for="(item, index) in steps"
                  :key="index"
                  :title="item.title"
                  :description='item.description'
                  icon=" "
                  >
                  <i class="step_icon" slot="icon"></i>
                </el-step>
              </el-steps>
          </el-form-item>
          <el-form-item label="营业执照:"  :label-width="formLabelWidth">
            <div class="img_upload_area">
                <div class="img_upload">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccessCer"
                      :before-upload="beforeAvatarUploadCer">
                      <img v-if="certForm.imageUrl" :src="certForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p>预览</p>
                    <p class="tip">支持jpg，png格式，大小不超过1M</p>
                </div>
                <div class="img_temp">
                  <img src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/51.jpg">
                  <p>参考图样</p>
                </div>
            </div>
          </el-form-item>
           <el-form-item label="商标证书:"  :label-width="formLabelWidth">
            <div class="img_upload_area">
                <div class="img_upload">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccessCerLogo"
                      :before-upload="beforeAvatarUploadCerLogo">
                      <img v-if="certForm.imageUrlLogo" :src="certForm.imageUrlLogo" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p>预览</p>
                    <p class="tip">支持jpg，png格式，大小不超过1M</p>
                </div>
                <div class="img_temp">
                  <img src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/51.jpg">
                  <p>参考图样</p>
                </div>
            </div>
          </el-form-item>
          <el-form-item label="行业资质:"  :label-width="formLabelWidth">
              <div class="img_upload_list_area">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :limit="8"
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="certForm.dialogImageUrl" alt="">
                  </el-dialog>
                  <p class="tip">在此提交行业资质文件，可上传最多8个文件。</p>
                  <p class="tip">支持jpg，png格式，大小不超过1M</p>
              </div>
          </el-form-item>
          <el-form-item label="备注说明:"  :label-width="formLabelWidth">
            <el-input type="textarea" v-model="certForm.remark" :rows="5" :maxlength="200" placeholder="请输入备注信息（不超过200字）"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
              <el-button type="primary">确认提交</el-button>
              <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'GmShopBasicInfo',
  data(){
    return{
      showMsg:'1',
      formLabelWidth:'120px',
      dialogVisible:false,
      brandForm:{
        name:'',
        trade:'美容美发',
        slogan:'',
        imageUrl:'',
        imageBackUrl:'',
        phone:'',
        desc:''
      },
      activeStep:2,
      steps:[
        {title:'提交资料',description:'2018-11-22 10:40:20'},
        {title:'审核中',description:'2018-11-22 10:40:20'},
        {title:'审核完成',description:''},
      ],
      certForm:{
        imageUrl:'',
        imageUrlLogo:'',
        dialogImageUrl:'',
        remark:''
      },
      fileList:[
        {
          name: 'food2.jpeg',
          url: 'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/51.jpg'
        }
      ]
    }
  },
  mounted(){

  },
  methods:{
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
    // 品牌认证
    // 营业执照
    handleAvatarSuccessCer(res, file) {
      this.certForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUploadCer(file) {
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
    // 商标证书
    handleAvatarSuccessCerLogo(res, file) {
      this.certForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUploadCerLogo(file) {
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
    // 行业资质
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.certForm.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss">
#gm_shop_basic_info .el-step__title.is-finish{
  color:#333333;
}
#gm_shop_basic_info .el-step__head.is-finish{
  color:#67C23A;
  border-color: #67C23A;
  .step_icon{
    background-color: #67C23A;
  }
}
#gm_shop_basic_info .el-step__icon.is-icon{
  width:14px;
}
#gm_shop_basic_info .el-step.is-horizontal .el-step__line{
  top:17px;
}
#gm_shop_basic_info .el-step__title{
  font-size: 14px;
}
#gm_shop_basic_info .el-step__title.is-process{
  font-weight: normal;
}
#gm_shop_basic_info .el-step__line{
  background-color: #EBEBEB;
}
#gm_shop_basic_info .el-step__description.is-finish{
  color:#333333;
}
// upload 单个文件上传样式
  .avatar-uploader .el-upload {
    border: 1px dashed #EBEBEA;
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
  .avatar{
    width: 148px;
    height: 148px;
    display: block;
  }

  .avatar-back-uploader .el-upload {
    border: 1px dashed #EBEBEA;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-back-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-back-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 296px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar-back{
    width: 296px;
    height: 148px;
    display: block;
  }
</style>

<style lang="scss" scoped>
  #gm_shop_basic_info{
    padding:20px;
  }
  .brand_info,.brand_certification{
    margin-top: 30px;
  }
  .tip{
    color: #9B9B9B;
    font-size:14px;
  }
  .step_icon{
    width:14px;
    height:14px;
    border-radius: 50%;
    display:inline-block;
    background: #F3F4F8;
  }
  .img_upload_area{
    border:1px solid rgba(235, 235, 234, 1);
    border-radius:4px;
    padding:30px;
    max-width:600px;
    display: flex;
    .img_upload{flex:1.5;}
    .img_temp{
      flex:1;
      img{
        width: 148px;
        height: 148px;
      }
    }
  }
  .img_upload_list_area{
    border:1px solid rgba(235, 235, 234, 1);
    border-radius:4px;
    padding:30px;
    max-width:600px;
  }
</style>

