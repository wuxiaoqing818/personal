 <template>
     <div id="gm_index">
         <el-container>
           <el-aside>
             <!-- 品牌/门店信息 -->
             <div class="nav_msg">
                 <img src="@/assets/h_logo.png">
                 <div class="nav_name">
                   <p class="over">苑苑美容美发连锁</p>
                   <p class="nav_tips">
                     <span class="tip_addr">滨江宝龙城店</span>
                     <i class="el-icon-arrow-right"></i>
                   </p>
                 </div>
             </div>
             <!-- 页面链接 nav -->
             <el-menu background-color="#16191C"
                      text-color="#fff"
                      active-background-color="#0C0F11"
                      active-text-color="#fff"
                      style="border:none;"
                      :default-active='currentMenu'
                      :router="true">
               <el-menu-item index="/console">
                 <i class="el-icon-expand-dianyingziyuan"></i>
                 <span slot="title">操作台</span>
                 <span class="notRead"><img src="@/assets/h_notread.png"></span>
               </el-menu-item>
               <el-menu-item index="/appo">
                 <i class="el-icon-expand-yuyue"></i>
                 <span slot="title">预约管理</span>
               </el-menu-item>
               <el-menu-item index="/order">
                 <i class="el-icon-expand-dingdan"></i>
                 <span slot="title">订单管理</span>
               </el-menu-item>
               <el-menu-item index="/customer">
                 <i class="el-icon-expand-yuangongzhanghao"></i>
                 <span slot="title">客户中心</span>
               </el-menu-item>
               <el-menu-item index="/staff">
                 <i class="el-icon-expand-yuangong"></i>
                 <span slot="title">员工中心</span>
               </el-menu-item>
               <el-menu-item index="/2">
                 <i class="el-icon-expand-laba" style="font-size:16px;"></i>
                 <span slot="title">营销中心</span>
               </el-menu-item>
               <el-menu-item index="/goods">
                 <i class="el-icon-expand-shangpinguanli" style="font-size:16px;"></i>
                 <span slot="title">商品管理</span>
               </el-menu-item>
               <el-menu-item index="8">
                 <i class="el-icon-expand-kucun1"></i>
                 <span slot="title">库存管理</span>
               </el-menu-item>
               <el-menu-item index="9">
                 <i class="el-icon-expand-diqiucopy"></i>
                 <span slot="title">供应市场</span>
               </el-menu-item>
               <el-menu-item index="10">
                 <i class="el-icon-expand-shuju"></i>
                 <span slot="title">数据统计</span>
               </el-menu-item>
               <el-menu-item index="/shop">
                 <i class="el-icon-expand-dianpu"></i>
                 <span slot="title">店铺管理</span>
               </el-menu-item>
               <el-menu-item index="/setting">
                 <i class="el-icon-expand-android-settings"></i>
                 <span slot="title">设置</span>
               </el-menu-item>
             </el-menu>
           </el-aside>
           <!-- 主页面 -->
           <el-container>
             <!-- 顶部登录信息 -->
             <!-- <el-header>
                 <div class="head_left">
                   <img src="@/assets/h_img.png">
                 </div>
                 <div class="head_right">
                     <el-badge is-dot class="item"><img class='icon_img' src="@/assets/h_notice.png"></el-badge>
                     <img class="head_img" src="@/assets/h_head.png">
                     <span>用户名</span>
                     <i class="el-icon-arrow-down"></i>
                 </div>
             </el-header> -->
             <el-main>
               <router-view></router-view>
             </el-main>
           </el-container>
         </el-container>
     </div>
 </template>

 <script>
//  import './assets/icon/iconfont.css'
 export default {
   name:"GmIndex",
   data(){
     return{
       currentMenu:'/console'
     }
   },
   created(){
     this.getUrl()
   },
   methods:{
    //  获取当前route，保持左侧高亮
     getUrl(){
       let that = this
       let currentUrl = that.$route.path
       that.currentMenu = '/'+currentUrl.split('/')[1]
     }
   }
 }
 </script>
 <style lang="scss" scoped>
   #gm_index {
     width:100%;
     height:100%;
     .el-container{
       height: 100%;
       .el-aside{
         width: 200px !important;
         height: 100%;
         background: #16191C;
         color: #fff;
         font-size: 16px;
         position: fixed;
         left: 0;
         top: 0;
         bottom: 0;
         z-index: 1002;
       }
       .el-main{
         padding: 0;
         margin-left:200px;
         padding-bottom: 0;
       }
       .el-menu-item{
         height: 56px;
         font-size: 16px;
         .notRead{
           float: right;
           img{
             width: 8px;
             height: 8px;
           }
         }
       }
      //  .el-header{
      //    height: 84px !important;
      //    padding:24px 40px 24px 20px;
      //    display: flex;
      //    flex-direction: row;


      //    .head_left{
      //      flex:1;
      //      line-height: 36px;
      //      img{
      //        width: 14px;
      //        height: 14px;
      //      }

      //    }
      //    .head_right{
      //      .head_img{
      //        width: 36px;
      //        vertical-align: middle;
      //        margin-right: 11px;
      //      }
      //      .icon_img{
      //        width: 20px;
      //        height: 20px;
      //        vertical-align: middle;
      //      }
      //      .item{
      //        margin-right: 60px;
      //      }
      //      span{
      //        display: inline-block;
      //        font-size: 16px;
      //        margin-right: 14px;
      //      }
      //      i{
      //        display: inline-block;

      //      }
      //    }
      //  }
       .el-main{
         height: 100%;
       }
     }
   }
   .el-menu-item i{
     color: #fff;
   }
   .el-menu-item.is-active i{
     color: #E22C37;
   }
   .nav_msg{
     display: flex;
     flex-direction: row;
     height: 110px;
     width: 200px;

     img{
       padding: 32px 6px 32px 11px;
       width: 46px;
       height: 46px;
     }
     .nav_name{
       width: 125px;
       padding: 32px 11px 32px 0;
       font-size: 14px;
       flex: 1;
       .nav_tips{
         padding-top: 4px;
         font-size: 12px;
         .tip_addr{
           cursor: pointer;
           height:20px;
           display: inline-block;
           line-height: 20px;
           text-align: center;
           width:90px;
           background:rgba(226,44,55,1);
         }
         i{cursor: pointer;padding-left:14px;font-size: 16px;font-weight: 600;display: inline-block;margin-top: 3px;}
       }
     }

   }
 </style>


  <style lang="scss">
   #gm_index .el-menu-item.is-active{
     background-color:#0C0F11 !important;
   }
 </style>


