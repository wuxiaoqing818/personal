<template>
  <div id="gm_appo_add">
      <!-- 顶部header-->
      <div class="full_header">
        <div class="full_header_container">
            <div class="header_left">
                <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                <p class="header_title">新增预约</p>
            </div>
            <div class="header_right">

            </div>
        </div>
      </div>
      <!-- container -->
      <div class="full_container">
          <div class="form_container">
            <el-form :model="form" class="quick_order_form" :rules="rules" ref="quickOrderForm">
              <el-form-item label="预约门店:" :label-width="formLabelWidth" prop="shop">
                <el-select v-model="form.shop" placeholder="请选择门店">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 选择客户区域 -->
              <el-form-item label="选择客户:" :label-width="formLabelWidth" prop="client">
                <el-input v-model="form.client" autocomplete="off" placeholder="搜索客户姓名/手机号"></el-input>
              </el-form-item>

              <!-- 点击新增显示新增客户 -->
              <el-form-item label="" :label-width="formLabelWidth" v-show="isShowNewClient">
                <el-input v-model="form.name" autocomplete="off" placeholder="姓名" class="input_aside"></el-input>
                <el-select v-model="form.sex" autocomplete="off" placeholder="性别" class="input_aside">
                     <el-option label="男" value="0"></el-option>
                     <el-option label="女" value="1"></el-option>
                </el-select>
                <el-input v-model="form.phone" autocomplete="off" placeholder="手机号"></el-input>
              </el-form-item>
              <!-- end -->

              <el-form-item label="" :label-width="formLabelWidth">
                  <el-button @click="addNewClient">新增<i class="el-icon-circle-plus-outline" style="margin-left:14px;"></i></el-button>
              </el-form-item>
              <!-- end -->
              <el-form-item label="预约到店时间:" :label-width="formLabelWidth" prop="date">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
                <el-time-select
                  v-model="form.time"
                  :picker-options="{
                    start: '10:00',
                    step: '00:30',
                    end: '22:00'
                  }"
                  placeholder="请选择时间">
                </el-time-select>
              </el-form-item>
              <!-- <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" autocomplete="off" placeholder="请输入用户手机号码"></el-input>
              </el-form-item>
              <el-form-item label="到店人:" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入到店人姓名"></el-input>
              </el-form-item> -->

              <el-form-item label="服务和手艺人:" :label-width="formLabelWidth" prop="service">
                <!-- 动态添加 -->
                <div class="service_item" v-for="(item,key) in form.service">
                  <el-select v-model="item.name" placeholder="请选择服务">
                    <el-option label="服务1" value="s1"></el-option>
                    <el-option label="服务2" value="s2"></el-option>
                  </el-select>
                  <el-select v-model="item.person" placeholder="请选择手艺人">
                    <el-option label="小红" value="p1"></el-option>
                    <el-option label="小明" value="p2"></el-option>
                  </el-select>
                  <i class="el-icon-delete" @click="removeService(key)"></i>
                </div>
                <!-- end -->
              </el-form-item>
              <!-- 新增 -->
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button @click="addNewService">添加</el-button>
              </el-form-item>
              <!-- end -->
              <el-form-item label="预约金:" :label-width="formLabelWidth" prop="price">
                <span>{{form.price}}元</span>
                <span v-if="form.isPay" class="is_pay">已支付</span>
                <span v-if="!form.isPay" class="not_pay">未支付</span>
              </el-form-item>
              <el-form-item label="备注:" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="">
                <el-button type="primary" @click="submitForm('quickOrderForm')">立即预约</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'GmAppoAdd',
    data(){
      return{
        isShowNewClient:false,
        form:{
          phone:'',
          name:'',
          shop:'',
          date:'',
          time:'',
          desc:'',
          client:'',
          service:[
            {name:'',person:''}
          ],
          price:'50',
          isPay:1
        },
        formLabelWidth:'150px',
        rules:{
          phone:[{required:true, message:'请输入用户手机号码',trigger:'blur'}],
          name:[{required:true, message:'请输入到店人姓名',trigger:'blur'}],
          shop:[{required:true, message:'请选择门店',trigger:'blur'}],
          date:[{required:true, message:'请选择日期',trigger:'blur'}],
          time:[{required:true, message:'请选择时间',trigger:'blur'}],
          service:[{required:true, message:'请选择服务',trigger:'blur'}],
          price:[{required:true, message:'',trigger:'blur'}],
          client:[{required:true, message:'请选择客户信息',trigger:'blur'}],
        },
      }
    },
    mounted(){

    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      // 新增服务
      addNewService(){
        this.form.service.push({
            name:'' ,
            person:''
        })
      },
      // 删除服务
      removeService(key){
        console.log(key)
        this.form.service.splice(key, 1);
      },
      addNewClient(){
        this.isShowNewClient = true
      },
      // 提交表单验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

<style lang="scss">
  #gm_appo_add .el-date-editor.el-input{
      width:49.8%;
      max-width:198px;
  }
</style>

<style lang="scss" scoped>
    .full_container{
      background:#fff;
    }
    .form_container{
      max-width: 800px;
      margin: 0 auto;
      padding: 80px 0;
    }
    .is_pay{
      margin-left:20px;
      color:#67C23A;
    }
    .not_pay{
      margin-left:20px;
      color:#e22c37;
    }
   #app #gm_appo_add .input_aside{
      width:49.8%;
      max-width:198px;
      margin-bottom:10px;
    }
</style>

