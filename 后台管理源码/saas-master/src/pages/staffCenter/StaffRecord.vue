<template>
  <div id="gm_staff_record">
    <!-- 顶部header-->
      <div class="full_header">
        <div class="full_header_container">
            <div class="header_left">
                <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                <p class="header_title">员工档案</p>
            </div>
            <div class="header_right">
               <div class="appo_submenu" style="text-align:right;margin-right:200px;">
                  <div class="tabs">
                    <router-link tag="span" to='/staff/record-introduce'>个人中心</router-link>
                    <router-link tag="span" to='/staff/record-service'>相关服务</router-link>
                    <router-link tag="span" to='/staff/record-dynamic'>作品动态</router-link>
                    <router-link tag="span" to='/staff/record-rate' style="margin-right:250px;">服务评价</router-link>
                  </div>
               </div>
            </div>
        </div>
      </div>
      <!-- container -->
      <div class="full_container">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name:'GmStaffRecord',
  data(){
    return{

    }
  },
  mounted(){

  },
  methods:{
    back(){
      this.$router.push('/staff')
    },
  }
}
</script>

<style lang="scss" scoped>

</style>


