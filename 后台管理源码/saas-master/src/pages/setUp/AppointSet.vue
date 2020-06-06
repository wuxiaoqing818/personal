<template>
   <div id='gm_appoint_set' class="margin_main">
      <div class="el-tabs el-tabs--card el-tabs--top">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
                <router-link tag="div" class="el-tabs__item is-top" to="/setting/appoint-set/qiuck-set">
                  快捷设置</router-link><router-link tag="div" class="el-tabs__item is-top" to='/setting/appoint-set/schedule-set'>
                  排班设置</router-link><router-link tag="div" class="el-tabs__item is-top" to='#22'>
                  高级设置</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
   </div>
</template>

<script>
export default {
  name:'GmAppointSet',
  data(){
    return{
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
  #gm_appoint_set{
    background-color:#fff;
  }
</style>

