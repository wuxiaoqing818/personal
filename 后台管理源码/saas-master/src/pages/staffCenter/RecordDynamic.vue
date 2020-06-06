<template>
  <div id="gm_record_dynamic">
    <div class="dynamic_step">
      <el-steps
        direction="vertical"
        finish-status="wait"
        :active="activeStep"
        >
        <el-step
          v-for="(item, index) in steps"
          :key="index"
          icon=" "
          @click.native="jump(index)">
          <i class="step_icon" slot="icon" :class="index === activeStep ? 'active':'' "></i>
        </el-step>
        <el-step icon=" ">
          <i class="step_icon" slot="icon" style="display:none;"></i>
        </el-step>
      </el-steps>

    </div>
    <div class="list_area">
      <div class="dynamic_list">
          <div class="dynamic_item" v-for='(item,index) in steps'>
            <p class="dynamic_item_content">{{item.content}}</p>
            <p class="dynamic_item_time">{{item.time}}</p>
            <div class="dynamic_info">
              <span>项目：{{item.name}}</span>
              <span class="info_price">消费：{{item.price}}元</span>
              <i class="el-icon-delete"></i>
            </div>
            <div class="dynamic_img_list">
              <img  v-for='img in item.imgList'  :src="img">
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'GmRecordDynamic',
  data(){
    return{
        activeStep:0,
        steps:[
          {
            title:'1',content:'这是你们说的公主切吗？诺，给你。',time:'2018-12-30 20:30',
            name:'日式裁剪OL风格；资生堂染发；染发',price:'1680',
            imgList:[require('@/assets/dong_logo.png'),
            require('@/assets/dong_logo.png'),]
          },
          {
            title:'2',content:'这是你们说的公主切吗？诺，给你。这是你们说的公主切吗？诺，给你。',time:'2018-12-30 20:30',
            name:'日式裁剪OL风格；资生堂染发；染发',price:'1680',
            imgList:[require('@/assets/dong_logo.png'),
            require('@/assets/dong_logo.png'),
            require('@/assets/dong_logo.png'),]
          }
        ]
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>


<style lang="scss">
#gm_record_dynamic{
  .el-step__line{
    background-color:#F3F4F8;
  }
  .el-step__icon{
    height: auto;
  }
}
</style>

<style lang="scss" scoped>
  #gm_record_dynamic{
    background-color:#fff;
    padding:90px 0 50px 115px;
    display: flex;
  }
  .step_icon{
    width:14px;
    height:14px;
    border-radius: 50%;
    display:inline-block;
    background: #F3F4F8;
  }
  .active{
    background-color:#4AA8FF;
  }
  .list_area{
     flex:1;
     margin-left:70px;
  }
  .dynamic_list{
    max-width:910px;
    .dynamic_item{
      padding:32px 260px 32px 80px;
      box-shadow: 0px 3px 16px 0px rgba(85, 85, 85, 0.06);
      color:#3A3A3A;
      margin-bottom:30px;
      .dynamic_item_content{
        font-size:16px;
      }
      .dynamic_item_time{
        color:#9B9B9B;
        padding:10px 0;
      }
      .dynamic_info{
        font-size:14px;
        padding:15px 0;
        display:flex;
        .info_price{
          padding-left:40px;
          flex:1;
        }
        i{color:#E84C55;cursor:pointer;}
      }
      .dynamic_img_list{
        img{width:110px;height:110px;padding-right:4px;}
      }
    }
  }
</style>


