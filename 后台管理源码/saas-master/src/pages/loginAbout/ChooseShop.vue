<template>
    <div id="gm_choose_shop">
        <v-header :header='header'></v-header>
        <div class="full_container">
          <div class="container_area">
            <div class="head_con">
              <div class="per_header">
                <div class="head_left">
                  <img src="@/assets/dong_logo.png" class="fixed_img">
                  <div class="per_msg">
                    <p>宋冬野</p>
                    <p>13543234567</p>
                    <p>
                      <span @click="toPersonalCenter">个人中心</span>
                      <span @click="loginOut">退出</span>
                    </p>
                  </div>
                </div>
                <div class="head_right">
                  <el-button type="primary" @click="toCreateCategory">创建店铺</el-button>
                </div>
              </div>
              <!-- 没有店铺时展示图片图片 -->
              <div class="no_shop" v-show="shopList.length==0">
                <img src="@/assets/no_shop_pic.png">
                <p>还没有店铺，赶快创建一家~</p>
              </div>
            </div>
            <div class="shop_div">
                <div class="shop_item" v-for="item in shopList">
                  <img src="@/assets/shop_logo.png">
                  <div class="shop_name">
                    <h3>{{item.name}}</h3>
                    <p>角色：{{item.chac}}</p>
                  </div>
                  <p class="btn" @click="toIndex">管理</p>
                </div>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
import Header from '@/compontents/loginCommon/LoginHeader.vue'
export default {
  name:'GmChooseShop',
  components: {
    'v-header': Header
  },
  data () {
    return {
      header:{
        title:'我的店铺',
        isphone: false
      },
      shopList:[
        {name:'苑苑美容美发连锁店',chac:'创建者'},
        {name:'苑苑美容美发杭州店',chac:'创建者'}
      ]
    }
  },
  mounted(){

  },
  methods: {
    // 退出登录
    loginOut(){
      this.$router.push('/')
    },
    // 去新建品牌页面
    toCreateCategory(){
      this.$router.push('/create-category')
    },
    // 去首页
    toIndex(){
      this.$router.push('/index')
    },
    toPersonalCenter(){
      this.$router.push('/personal-center')
    }
  }
}
</script>

<style lang="scss" scoped>
     .head_con{
       padding: 40px 0 40px 40px;
       box-shadow:0px 3px 16px 0px rgba(85,85,85,0.06);
       border-radius:6px;
       background: #fff;
     }
    .per_header{

      display: flex;
      .head_left{
        flex:1;
        display: flex;
        .per_msg{
          padding-top:10px;
          p{font-size:18px;}
          span{
            color: #E6333F;
            font-size:14px;
            margin-right:10px;
            padding-top: 10px;
            display:inline-block;
            cursor:pointer;
          }
        }
      }
      .fixed_img{
        width: 92px;
        height:92px;
        border-radius: 50%;
        margin-right:20px;
      }
      .head_right{
        padding-right:200px;
        margin-top:10px;
      }
    }
    .no_shop{
      // margin: 0 auto;
      margin-top: 60px;
      text-align: center;
      img{
        width:501px;
        height: 223px;
      }
      p{
        color:#9B9B9B;
        font-size:20px;
        padding-top: 20px;
        padding-bottom: 200px;
      }
    }
    .shop_div{
         margin-top:20px;
          .shop_item{
            float: left;
            width: 444px;
            height: 132px;
            margin-right: 20px;
            margin-bottom: 20px;
            background-color: #fff;
            box-shadow:0px 3px 16px 0px rgba(85,85,85,0.06);
            border-radius:6px;
            display: flex;
            flex-direction: row;
            img{
              width: 46px;
              height: 46px;
              margin: 43px 26px 0 40px;
            }
            .shop_name{
              flex: 1;
              margin-top: 39px;
              h3{
                font-size: 20px;
                color: #333;
                font-weight: 400;
              }
              p{
                font-size:14px;
                color:#9B9B9B;
                margin-top:5px;
              }
            }
            .btn{
              width: 60px;
              height: 26px;
              border-radius:13px;
              margin:40px 42px 0 20px;
              background: #FFE8E8;
              font-size:14px;
              color: #E22C37;
              text-align: center;
              cursor: pointer;
              line-height: 26px;
            }
            .btn_default{
              color: #5482FE;
              background-color: #C8D6FB;
            }
          }
       }
</style>



