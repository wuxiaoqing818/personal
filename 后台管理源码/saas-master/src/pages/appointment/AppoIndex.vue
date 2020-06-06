<template>
    <div id="gm_appo_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/appo/appo-time'>预约时间表</router-link>
            <router-link tag="span" to='/appo/appo-list'>预约客户列表</router-link>
          </div>
          <div class="add_appo">
            <!-- <button type="primary" @click="dialogFormVisible = true">快速预约<img src="@/assets/add_icon.png"></button> -->
            <button type="primary" @click="toAppoAdd">快速预约<img src="@/assets/add_icon.png"></button>
          </div>
        </div>
        <router-view></router-view>
        <el-dialog title="快速预约" :visible.sync="dialogFormVisible" center>
          <el-form :model="form" class="quick_order_form" :rules="rules" ref="quickOrderForm">
            <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="form.phone" autocomplete="off" placeholder="请输入用户手机号码"></el-input>
            </el-form-item>
            <el-form-item label="到店人:" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入到店人姓名"></el-input>
            </el-form-item>
            <el-form-item label="预约门店:" :label-width="formLabelWidth" prop="shop">
              <el-select v-model="form.shop" placeholder="请选择门店">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
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
            <el-form-item label="到店时间:" :label-width="formLabelWidth" prop="date">
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
            <el-form-item label="备注:" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="submitForm('quickOrderForm')">立即预约</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import "@/assets/css/base.scss"
export default {
  name:'GmAppoIndex',
  data() {
    return {
      dialogFormVisible:false,
      form:{
        phone:'',
        name:'',
        shop:'',
        date:'',
        time:'',
        desc:'',
        service:[
          {name:'',person:''}
        ]
      },
      formLabelWidth:'150px',
      rules:{
        phone:[{required:true, message:'请输入用户手机号码',trigger:'blur'}],
        name:[{required:true, message:'请输入到店人姓名',trigger:'blur'}],
        shop:[{required:true, message:'请选择门店',trigger:'blur'}],
        date:[{required:true, message:'请选择日期',trigger:'blur'}],
        time:[{required:true, message:'请选择时间',trigger:'blur'}],
        service:[{required:true, message:'请选择服务',trigger:'blur'}]
      },
    };
  },
  mounted(){

  },
  methods: {
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
    // toAppoAdd
    toAppoAdd(){
      this.$router.push('/appo-add')
    }
  }
}
</script>
<style lang="scss">
  #gm_appo_index .el-date-editor.el-input{
    width: 49%;
    max-width:196px;
  }
</style>

<style lang="scss" scoped>
    #gm_appo_index{
        // margin-left: 20px;
        // margin-right: 40px;
        .service_item i{
          font-size:18px;
          color:#E22C37;
          margin-left:20px;
        }
        .service_item+.service_item{
          margin-top:10px;
        }
    }
</style>


