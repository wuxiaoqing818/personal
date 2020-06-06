<template>
    <div id="gm_customer_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/customer/customer-list'>客户列表</router-link>
            <router-link tag="span" to='#1'>生日问候</router-link>
            <router-link tag="span" to='#2'>流失预警</router-link>
            <router-link tag="span" to='#3'>投诉管理</router-link>
            <router-link tag="span" to='#4'>客户分析</router-link>
            <router-link tag="span" to='#5'>客户导入</router-link>
          </div>
          <div class="add_appo">
            <button type="primary" @click="addNewCustomer">添加会员<img src="@/assets/add_icon.png"></button>
          </div>
        </div>
        <router-view></router-view>
        <!-- 新增客户 弹框  -->
        <el-dialog title="新增客户" :visible.sync="dialogFormVisible" center class="add_dialog">
          <div class="add_area">
              <el-form :model="form" class="add_customer_form" :rules="rules" ref="addCustomerForm">
                <el-form-item label="客户姓名:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="off" placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="备注名:" :label-width="formLabelWidth">
                  <el-input v-model="form.nickname" autocomplete="off" placeholder="请输入客户备注昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="form.phone" autocomplete="off" placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="微信号:" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off" placeholder="请输入客户微信号"></el-input>
                </el-form-item>
                <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="女" value="1"></el-option>
                    <el-option label="男" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日:" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="form.birth"
                      type="datetime"
                      placeholder="请选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="归属门店:" :label-width="formLabelWidth" prop="shop">
                  <el-select v-model="form.shop" placeholder="请选择门店">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务者:" :label-width="formLabelWidth">
                  <el-select v-model="form.servicer" placeholder="请选择门店">
                    <el-option label="tony" value="1"></el-option>
                    <el-option label="mary" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会员编号:" :label-width="formLabelWidth">
                  <el-input v-model="form.number" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item>
                  <span>会员编号自动生成，不可修改</span>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" class="desc_item">
                    <el-input type="textarea" v-model="form.desc" maxlength="150" :rows="4" placeholder="请输入备注信息(不超过150字)"></el-input>
                </el-form-item>
              </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('addCustomerForm')">确定</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import "@/assets/css/base.scss"
export default {
  name:'GmCustomerIndex',
  data() {
    return {
      dialogFormVisible: false,
      form:{
        phone:'',
        name:'',
        nickname:'',
        weixin:'',
        sex:'',
        birth:'',
        shop:'',
        servicer:'',
        number:'ZJ79273827328',
        desc:''
      },
      formLabelWidth:'100px',
      rules:{
        phone:[{required:true, message:'请输入客户手机号码',trigger:'blur'}],
        name:[{required:true, message:'请输入客户姓名',trigger:'blur'}],
        shop:[{required:true, message:'请选择门店',trigger:'blur'}],
        sex:[{required:true, message:'请选择日期',trigger:'blur'}]
      },
    }
  },
  mounted(){

  },
  methods: {
    addNewCustomer(){
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss">
  #gm_customer_index .add_area .el-date-editor.el-input,{
    width: 100%;
  }
  #gm_customer_index .add_area .el-form-item{
    width: 49%;
    display: inline-block;
  }
  #gm_customer_index .add_area .el-form-item.desc_item{
    width: 100%;
    .el-textarea{
      max-width: 100% !important;
    }
  }
  #gm_customer_index .add_dialog.el-dialog{
    min-width: 800px;
  }
</style>

<style lang="scss" scoped>
    #gm_customer_index{
    }
</style>


