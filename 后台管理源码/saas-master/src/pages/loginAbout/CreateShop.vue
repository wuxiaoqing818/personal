<template>
    <div id="gm_choose_shop">
        <v-header :header='header'></v-header>
        <div class="full_container">
          <div class="create_category_area">
            <div class="create_title">
              <img src="@/assets/create_category_icon.png">
              <span>第二步：创建门店</span>
            </div>
            <!-- 新建品牌表单 -->
            <div class="form_area">
              <el-form :model="shop" :rules="rules" ref="categoryForm" label-width="223px">
                <el-form-item label="门店名称:" prop="name">
                    <el-input v-model="shop.name" placeholder="请输入门店名称"></el-input>
                </el-form-item>
                <el-form-item label="门店形象照:" prop="img">
                    <el-upload
                      class="upload-demo"
                      drag
                      action=""
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">建议上传640*360像素图片</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label='客服电话:' prop="phone">
                    <el-input v-model="shop.phone" placeholder="请输入客服咨询电话"></el-input>
                </el-form-item>
                <!--地址 -->
                <el-form-item label="品牌地址:" prop="address">
                  <el-cascader
                    placeholder="请选择省市区"
                    :options="options"
                    v-model="shop.address">
                  </el-cascader>
                </el-form-item>
                <el-form-item  prop="detail">
                    <el-input v-model="shop.detail" placeholder="请输入详细地址"></el-input>
                </el-form-item>
                <!-- 地图 -->
                <el-form-item>
                  <v-map v-on:getMapValue='getMapValue' ref="mapSet"></v-map>
                </el-form-item>
                <!-- end -->
                <el-form-item label="营业时间" required>
                      <!-- 选择可约时间 弹窗 -->
                        <el-popover
                        placement="bottom-start"
                        trigger="click"
                        v-model="visible">
                          <div class="weekday_popover">
                            <el-checkbox-group v-model="shop.checkboxGroup" size="large">
                              <el-checkbox label="1" border>
                                周一</el-checkbox><el-checkbox label="2" border>
                                周二</el-checkbox><el-checkbox label="3" border>
                                周三</el-checkbox><el-checkbox label="4" border>
                                周四</el-checkbox><el-checkbox label="5" border>
                                周五</el-checkbox><el-checkbox label="6" border>
                                周六</el-checkbox><el-checkbox label="7" border>
                                周日</el-checkbox>
                            </el-checkbox-group>
                            <el-button type="primary">确定</el-button>
                          </div>
                          <el-input v-model="shop.weekDay" readonly="readonly" placeholder="请选择营业时间" slot="reference"></el-input>
                        </el-popover>
                        <!-- end -->
                </el-form-item>
                <el-form-item  label="">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="shop.startTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30'
                    }">
                  </el-time-select>
                  —
                  <el-time-select
                    placeholder="结束时间"
                    v-model="shop.endTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30',
                      minTime: shop.startTime
                    }">
                  </el-time-select>
                </el-form-item>
                <el-form-item label="门店简介:">
                  <el-input v-model="shop.desc" type="textarea" :rows="4" :maxlength="500" placeholder="请输入门店简介（不超过500字）"></el-input>
                </el-form-item>
                <el-form-item label="门店相册:">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :limit='5'
                    :file-list="shop.fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="shop.dialogImageUrl" alt="">
                  </el-dialog>
                  <p class="tip">支持jpg,png格式，大小不超过1M，最多上传5张</p>
                </el-form-item>
                <!--购买时长 -->
                <el-radio-group v-model="shop.buyTime">
                  <el-form-item label="占用时长:">
                      <el-radio label="0">免费试用</el-radio>
                  </el-form-item>
                  <el-form-item label="">
                        <el-radio label="1">立即购买</el-radio>
                        <el-select v-model="shop.ver" style="width:100px;margin-left:10px;">
                          <el-option label="旗舰版" value="s"></el-option>
                          <el-option label="普通版" value="b"></el-option>
                        </el-select>
                        <el-select v-model="shop.year" style="width:100px;margin-left:10px;">
                          <el-option label="一年" value="s"></el-option>
                          <el-option label="三年" value="b"></el-option>
                        </el-select>
                        <span style="margin-left:10px;color:#e22c37;">¥300.00</span>
                        <p style="margin-left:100px;color:#409EFF;cursor:pointer;">比较版本与价格</p>
                  </el-form-item>
                </el-radio-group>
                <!-- 创建按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('categoryForm')">确认提交</el-button>
                    <el-button>保存入库</el-button>
                    <el-button @click="toStepOne">上一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import Header from '@/compontents/loginCommon/LoginHeader.vue'
import GaoMap from '@/compontents/loginCommon/GaoMap.vue'
import { setTimeout } from 'timers';
export default {
  name:'GmChooseShop',
  components: {
    'v-header': Header,
    'v-map': GaoMap
  },
  data () {
    return {
      options:regionData,
      checkOption:[],
      header:{
        title:'创建门店',
        isphone: false
      },
      visible:false,
      dialogVisible: false,
      shop:{
        name:'',
        imageUrl:'',
        imageBackUrl:'',
        desc:'',
        checkboxGroup:[],
        weekDay:'',
        startTime:'',
        endTime:'',
        dialogImageUrl: '',
        fileList:[
          {name: 'food.jpeg', url: require('@/assets/dong_logo.png')}
        ],
        img:'',
        address:[],
        detail:'',
        phone:'',
        time:'',
        buyTime:'0',
        ver:'s',
        year:'b'
      },
      rules:{
        name:[{required:true, message:'请输入主体品牌名称',trigger:'blur'}],
        industry:[{required:true, message:'请选择所属行业',trigger:'blur'}],
        img:[{required:true, message:'请上传品牌图片',trigger:'blur'}],
        address:[{required:true, message:'请选择省市区',trigger:'blur'}],
        detail:[{required:true, message:'请输入详细地址',trigger:'blur'}],
        phone:[{required:true, message:'请输入客服咨询电话',trigger:'blur'}],
        time:[{required:true, message:'请选择营业时间',trigger:'blur'}]
      },
      mapInfo:{},
    }
  },
  mounted(){
  },
  methods: {
    toStepOne(){
      this.$router.push('/create-category')
    },
    // 退出登录
    loginOut(){
      this.$router.push('/login')
    },
    // handleChange(value){
    //   console.log(value);
    // },
    // 获取地图组件传值
    getMapValue(mapInfo){
        this.mapInfo = mapInfo
        // 赋值给category
        this.shop.detail = this.mapInfo.detail
        console.log(this.mapInfo)
    },
    // 调用地图组件中的 设置当前行政区
    setMapCity(cityValue){
      let that = this
      that.$refs.mapSet.gotoCity(cityValue)
    },
    // 提交表单验证
    submitForm(formName) {
      this.$router.push('/choose-shop')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.shop.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
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

.weekday_popover{
  max-width:400px;
  margin:20px;
  .el-checkbox{
    // margin-bottom:10px;
    margin:0 10px 10px 0;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered{
    margin-left:0;
  }
  .el-checkbox.is-bordered .el-checkbox__inner{
    display:none;
  }
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



