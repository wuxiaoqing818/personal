<template>
    <div id="gm_service_choose_person">
        <!-- 顶部header-->
        <div class="full_header">
          <div class="full_header_container">
              <div class="header_left">
                  <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                  <p class="header_title">选择开单人</p>
              </div>
              <div class="header_right">
                <div class="tabs">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="发型师" name="first"></el-tab-pane>
                    <el-tab-pane label="美容师" name="second"></el-tab-pane>
                    <el-tab-pane label="助理" name="third"></el-tab-pane>
                  </el-tabs>
                </div>
                <div class="check_screen">
                   <el-checkbox v-model="checked">只显示30分钟内有空</el-checkbox>
                </div>
              </div>
          </div>
        </div>
        <!-- container -->
        <div class="full_container">
            <div class="person_item" @click='toChooseService' v-for="key in 10">
              <div class="person_img">
                <img src="@/assets/person_logo.png">
              </div>
              <div class="person_msg">
                  <p class="name">河铉雨</p>
                  <p class="duty">发型总监</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'GmServiceChoosePerson',
  data(){
    return{
      activeName:'first',
      checked:false
    }
  },
  mounted(){

  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toChooseService(){
      this.$router.push('/choose-service')
    }
  }
}
</script>

<style lang="scss">
  // .header_right .tabs{
  //   margin-left:13%;
  // }
  // .header_right .tabs .el-tabs__nav.is-top{
  //   height: 80px;
  //   line-height: 80px;
  //   font-size:16px;
  // }
  // .header_right .tabs .el-tabs__content{
  //   display: none;
  // }
  // .header_right .tabs .el-tabs__header{
  //   margin:0;
  // }
  // .header_right .tabs .el-tabs__nav-wrap::after{
  //   height:0;
  // }
  // .header_right .tabs .el-tabs__item{
  //   font-size:16px;
  // }
</style>


<style lang="scss" scoped>
  .header_right{
    display: flex;
    .tabs{
      flex: 1;
    }
    .check_screen{
      margin-right: 20px;
      line-height: 80px;
    }
  }
  .person_item{
    cursor:pointer;
    display: inline-block;
    margin:0px 10px 20px 10px;
    width:220px;
    box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
    .person_img{
      img{
        width:220px;
        height:252px;
        border-radius:6px 6px 0px 0px;
      }

    }
    .person_msg{
      width:220px;
      height:62px;
      background:#fff;
      border-radius:0px 0px 6px 6px;
      display: flex;
      align-items:center;
      font-weight:500;
      .name{
        flex:1;
        margin-left:12px;
        font-size:16px;
        color:rgba(58,58,58,1);
      }
      .duty{
        margin-right:12px;
        font-size:14px;
        color:#A5A5A5;
      }
    }
  }
</style>

