<template>
  <div id="gm_staff_add">
    <!-- 顶部header-->
      <div class="full_header">
        <div class="full_header_container">
            <div class="header_left">
                <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                <p class="header_title">新增员工</p>
            </div>
            <div class="header_right">
            </div>
        </div>
      </div>
      <!-- container -->
      <div class="full_container">
        <div class="form_area">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="ruleForm.code" readonly></el-input>
            </el-form-item>
            <el-form-item label="门店昵称" prop='nickname'>
              <el-input v-model="ruleForm.nickname" placeholder="请输入员工店内昵称"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="登录手机" prop='phone'>
              <el-input v-model="ruleForm.phone" placeholder="请输入登录手机号"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="初始密码" prop="psw" style="display:block;">
              <el-input  v-model="ruleForm.psw" placeholder="请输入初始密码"></el-input>
            </el-form-item>
            <el-form-item label="隶属门店" prop="shop">
              <el-select v-model="ruleForm.shop" placeholder="请选择隶属门店">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择角色" prop="character">
              <el-select v-model="ruleForm.character" placeholder="请选择角色">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择权限" prop="type" style="display:block;width:100%;max-width:800px;">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="手艺人权限" name="type"></el-checkbox>
                <el-checkbox label="员工权限" name="type"></el-checkbox>
                <el-checkbox label="店长权限" name="type"></el-checkbox>
                <el-checkbox label="财务权限" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="职务级别" prop="level">
              <el-select v-model="ruleForm.level" placeholder="请选择职务级别">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="剪发价" prop='price'>
              <el-input v-model="ruleForm.price" placeholder="请输入剪发价格"></el-input>
            </el-form-item>
            <el-form-item label="备注头像" prop='photo' style="display:block">
              <el-upload
                v-model="ruleForm.photo"
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="关联服务" style="display:block;">
              <el-radio-group v-model="ruleForm.service">
                <el-radio label="all">所有服务</el-radio>
                <el-radio label="part">指定服务</el-radio>
              </el-radio-group>
              <!-- 指定 服务列表 模块-->
              <div class="select_service_area" v-show='ruleForm.service == "part"'>
                  <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps">
                </el-tree>
              </div>
              <!-- end -->
            </el-form-item>
            <!-- 更多资料 -->
            <el-form-item label="祖籍籍贯">
              <el-select v-model="ruleForm.province" placeholder="请选择省" style="width:39.5%;max-width:178px;">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
              <el-select v-model="ruleForm.city" placeholder="请选择市" style="width:39.5%;max-width:178px;">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <el-select v-model="ruleForm.marry" placeholder="请选择婚姻状况">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="血型">
              <el-select v-model="ruleForm.blood" placeholder="请选择血型">
                <el-option label="A" value="1"></el-option>
                <el-option label="B" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="ruleForm.edu" placeholder="请选择学历">
                <el-option label="A" value="1"></el-option>
                <el-option label="B" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!--  -->
            <el-form-item label="入职时间" style="display:block;">
              <el-date-picker type="date" placeholder="请选择入职时间" v-model="ruleForm.time" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="desc" style="display:block;">
              <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入备注(最多150字)" maxlength="150" rows="5"></el-input>
            </el-form-item>
            <el-form-item label="排班管理" style="display:block;">
              <el-button>排班管理</el-button>
              <span v-show="hasClass">&nbsp;&nbsp;新的手艺人会按照默认排班进行排班</span>
              <span v-show="!hasClass" style="color:#E22C37;">&nbsp;&nbsp;您的默认排班信息不完整，请及时补充</span>
            </el-form-item>
            <el-form-item style="display:block;">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'GmStaffAdd',
  data(){
    return{
       hasClass:true,
       ruleForm: {
          name: '',
          code:'s250250',
          sex:'',
          phone:'',
          birth: '',
          character:'',
          shop:'',
          level:'',
          type: [],
          price:'',
          photo:'',
          service:'all',
          province:'',
          city:'',
          marry:'',
          blood:'',
          edu:'',
          time:'',
          desc: ''
       },
       rules: {
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入员工店内昵称', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择员工性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入登录手机号', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '请输入初始密码', trigger: 'blur' }
          ],
          character: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          shop: [
            { required: true, message: '请选择隶属门店', trigger: 'change' }
          ],
          level: [
            { required: true, message: '请选择职务级别', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入剪发价格', trigger: 'blur' }
          ],
          photo:[
            { required: true, message: '请上传头像', trigger: 'change' }
          ],
          type:[
            { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
          ]
       },
       data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1'
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
       }],
       defaultProps: {
          children: 'children',
          label: 'label'
       }
    }
  },
  mounted(){

  },
  methods:{
    back(){
      this.$router.go(-1);
    },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss">
#gm_staff_add .full_container .form_area .el-form-item{
    width:49%;
    display: inline-block;
    max-width:550px;
}
#gm_staff_add .full_container .el-input__inner,#gm_staff_add .full_container .el-select,#gm_staff_add .full_container .el-textarea{
  max-width:360px !important;
}
</style>

<style lang="scss" scoped>
.full_container{
  background: #fff;
  .form_area{
    padding:48px 0 180px 40px;
  }
  .select_service_area{
    margin-left:100px;
    border:1px solid #eeeeeb;
    padding:10px;
  }
}
</style>


