<template>
    <div id="gm_staff_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/staff/staff-list'>员工列表</router-link>
            <router-link tag="span" to='#1'>业绩与薪酬</router-link>
            <router-link tag="span" to='#2'>考勤管理</router-link>
            <router-link tag="span" to='#3'>作品动态</router-link>
            <router-link tag="span" to='#4'>学习管理</router-link>
            <router-link tag="span" to='#5'>企业通知</router-link>
          </div>
          <div class="add_appo">
            <button type="primary" @click="toStaffAdd">添加员工<img src="@/assets/add_icon.png"></button>
          </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import "@/assets/css/base.scss"
export default {
  name:'GmStaffIndex',
  data() {
    return {
    }
  },
  mounted(){

  },
  methods: {
    toStaffAdd(){
      this.$router.push('/staff-add')
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


