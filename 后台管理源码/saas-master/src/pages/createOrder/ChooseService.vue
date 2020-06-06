<template>
    <div id="gm_service_choose_service">
      <!-- 顶部header-->
        <div class="full_header">
          <div class="full_header_container">
              <div class="header_left">
                  <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                  <p class="header_title">选择服务项目</p>
              </div>
              <div class="header_right">
                <div class="tabs">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="发型师" name="first"></el-tab-pane>
                    <el-tab-pane label="美容师" name="second"></el-tab-pane>
                    <el-tab-pane label="助理" name="third"></el-tab-pane>
                  </el-tabs>
                </div>
              </div>
          </div>
        </div>
        <!-- container -->
        <div class="full_container">
            <!--  筛选 -->
            <div class="search_input">
              <el-autocomplete
                class="inline-input"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="输入首字母可以查询"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
            <div class="service_container">
               <!-- 服务项目列表 -->
                <div class="service_list">
                  <div class="service_item" v-for='key in 10'>
                    <div class="service_img">
                      <img src="@/assets/ser_large.png">
                    </div>
                    <div class="service_msg">
                        <p class="name">日式剪裁-OL短发</p>
                        <p class="price">￥198.00</p>
                    </div>
                  </div>
                </div>
                <!-- 开单模块 -->
                    <div class="order_area">
                      <el-collapse-transition>
                        <div class="order_main" v-show="showOrder">
                          <!-- 开单信息 -->
                          <div class="order_msg">
                            <p>
                                <label>开单人：</label>
                                <el-select v-model='person'>
                                  <el-option label="小李" value="1"></el-option>
                                  <el-option label="小红" value="2"></el-option>
                                </el-select>
                            </p>
                            <p>
                              <label>可约时间：</label>
                              <el-date-picker
                                v-model="time"
                                type="datetime"
                                placeholder="选择时间">
                              </el-date-picker>
                            </p>
                            <p>
                              <label>订单编号：</label>
                              <el-input v-model="orderNo" readonly="readonly"></el-input>
                            </p>
                          </div>
                          <!-- 客户信息 -->
                          <div class="client_msg">
                            <div class="title">客户信息</div>
                            <p>
                                <label>选择客户：</label>
                                <el-autocomplete
                                  class="inline-input"
                                  v-model="state"
                                  :fetch-suggestions="querySearch"
                                  placeholder="搜索客户姓名/手机号/会员编号"
                                  :trigger-on-focus="false"
                                  @select="handleSelect"
                                ></el-autocomplete>
                            </p>
                            <p v-show="showClient">
                              <label></label>
                              <el-input v-model="name" autocomplete="off" placeholder="姓名" class="input_aside"></el-input>
                              <el-select v-model="sex" autocomplete="off" placeholder="性别" class="input_aside">
                                  <el-option label="男" value="0"></el-option>
                                  <el-option label="女" value="1"></el-option>
                              </el-select>
                            </p>
                            <p v-show="showClient">
                              <label></label>
                              <el-input v-model="phone" autocomplete="off" placeholder="手机号" class="input_btn_aside"></el-input>
                              <el-button>确定</el-button>
                            </p>
                            <p>
                              <label></label>
                              <el-button>新增<i class="el-icon-circle-plus-outline" style="margin-left:14px;"></i></el-button>
                            </p>
                          </div>
                          <!-- 已选服务 -->
                          <div class="choose_service">
                            <div class="choose_header">
                              <div class="title">已选服务(2)</div>
                              <div class="clear">清空</div>
                            </div>
                            <!-- 服务列表 -->
                            <div class="choose_container">
                                <div class="choose_item">
                                  <!-- 信息 -->
                                  <div class="choose_item_msg">
                                    <img src="@/assets/ser_logo.png">
                                    <div class="item_info">
                                      <p class="item_name">
                                        <span>高级烫染+洗吹洗护</span>
                                      </p>
                                      <p class="item_price">
                                        <span class="price">197元</span>
                                        <span class="count">数量：1</span>
                                      </p>
                                    </div>
                                    <i class="el-icon-delete"></i>
                                  </div>
                                  <!-- 人 -->
                                  <div class="choose_item_person">
                                        <div>
                                          <span>tony</span>
                                          <i class="el-icon-edit-outline"></i>
                                        </div>
                                        <div>
                                          <span>选择助理</span>
                                          <i class="el-icon-plus"></i>
                                        </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <!-- 按钮 -->
                          <div class="order_btns">
                            <span class="white">总金额: 1800元</span>
                            <span class="blue">存入待付单</span>
                            <span class="red" @click="showPayment">付款</span>
                          </div>
                          <!-- 待付款订单 -->
                          <div class="wait_order">
                            <p>待付款订单（16）</p>
                            <img src="@/assets/shangla.png" @click="showOrder = !showOrder">
                          </div>
                        </div>
                      </el-collapse-transition>
                      <el-collapse-transition>
                        <div class="order_wait_list"  v-show="!showOrder">
                            <div class="search_order">
                              <el-input placeholder="顾客姓名/手机号/商品名" class="search_input"></el-input>
                              <img src="@/assets/xiala.png" @click="showOrder = !showOrder">
                            </div>
                            <!-- 列表 -->
                            <div class="wait_items">
                              <div class="wait_item" v-for="key in 3">
                                <!-- 顾客信息 -->
                                <div class="wait_client_info">
                                    <div class="client_img">
                                      <img src="@/assets/hair_icon.png" class="img_header">
                                      <img src="@/assets/male_tip.png" class="img_tip">
                                    </div>
                                    <div class="client_wait_msg">
                                      <p>Peter</p>
                                      <p>1586248874</p>
                                    </div>
                                    <div class="client_time">2018-11-10 20:30</div>
                                </div>
                                <!-- 服务信息 -->
                                <div class="choose_item_msg">
                                  <img src="@/assets/ser_logo.png">
                                  <div class="item_info">
                                    <p class="item_name">
                                      <span>高级烫染+洗吹洗护</span>
                                    </p>
                                    <p class="item_price">
                                      <span class="price">197元</span>
                                      <span class="count">数量：1</span>
                                    </p>
                                  </div>
                                  <i class="el-icon-delete"></i>
                                </div>
                                <!-- 总金额 -->
                                <div class="amount">
                                  <span class="amount_price">总金额：1790元</span>
                                  <span class="get_amount">收款</span>
                                </div>
                              </div>
                            </div>
                        </div>
                      </el-collapse-transition>
                    </div>

            </div>
        </div>
        <!-- 付款弹框 -->
        <el-dialog title="" :visible.sync="paymentDialogVisible" class="payment_dialog">
            <v-collection></v-collection>
        </el-dialog>
    </div>
</template>

<script>
import Collection from '@/compontents/collectionModule/Collection.vue'
export default {
  name:'GmServiceChooseService',
  components:Collection,
  components: {
    'v-collection': Collection
  },
  data(){
    return{
      paymentDialogVisible:false,
      showOrder:true,
      activeName:'first',
      state:'',
      serviceList:[],
      showClient:false,
      person:'1',
      time:'',
      name:'',
      sex:'',
      phone:'',
      orderNo:'D4234535345324',
    }
  },
  mounted(){
    this.serviceList = this.loadAll();
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 输入自动检索
    handleSelect(item) {
      console.log(item);
      // this.state = item
    },
    querySearch(queryString, cb) {
      var serviceList = this.serviceList;
      var results = queryString ? serviceList.filter(this.createFilter(queryString)) : serviceList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (service) => {
        return (service.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "111", "address": "111" },
        { "value": "212", "address": "222" },
        { "value": "323", "address": "333" },
        { "value": "444", "address": "444" },
        { "value": "5444", "address": "555-101" }
      ];
    },
    //付款
    showPayment(){
      this.paymentDialogVisible = true
    }
  }
}
</script>

<style lang="scss">
  #gm_service_choose_service .order_area{
    .el-input{
      width: 268px;
    }
    .input_aside.el-input{
      width: 132px;
    }
    .input_aside .el-input{
      width: 132px;
    }
    .input_btn_aside.el-input{
      width: 194px;
    }
  }
</style>

<style lang="scss" scoped>
 .search_input{
   margin:0 0 20px 10px;
 }
 .service_container{
   display: flex;
   .service_list{
     flex: 1
   }
   .order_area{
    width:454px;

    .order_main{
      box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
      border-radius:6px;
      background: #fff;
    }
    label{
      display:inline-block;
      width: 100px;
      text-align: right;
    }
    .order_msg{
      padding-top:20px;
      p{
        margin-bottom:10px;
        font-size:14px;
        color:#3A3A3A;
      }
    }
    .client_msg{
      font-size:14px;
      .title{
        font-size:16px;
        color:#3A3A3A;
        margin:10px 0 10px 30px;
      }
      p{margin-top:10px;}
    }
    .choose_service{
      margin-top:20px;
      .choose_header{
        display: flex;
        padding-bottom:22px;
        .title{
          flex:1;
          margin-left:30px;
        }
        .clear{
          color:#E6333F;
          margin-right:22px;
        }
      }
      .choose_item{
        border:1px solid #EEEEEE;
        margin: 10px 36px 0 30px;
        .choose_item_person{
          display:flex;
          div{
            flex:1;
            padding:18px 8px 18px 20px;
            border-top:1px solid rgba(238, 238, 237, 1);
            display: flex;
            span{
              flex:1;
              color:#A5A5A5;
              font-size:14px;
            }
            i{color: #4AA8FF;cursor:pointer;}
          }
          div+div{
            border-left:1px solid rgba(238, 238, 237, 1);
          }
        }
      }

    }
   }
   .order_btns{
    margin-top:27px;
    display: flex;
    justify-content:center;
    align-items:center;
    font-size:18px;
    height:76px;
    span{display:inline-block;height: 100%;text-align:center;height:76px;line-height:76px;}
    .white{
      flex:1;
      box-sizing:border-box;
      border-top:1px solid rgba(238, 238, 238, 1);
      border-bottom:1px solid rgba(238, 238, 238, 1);
    }
    .blue{
      background-color:#4AA8FF;
      color:#fff;
      width:142px;
      cursor:pointer;
    }
    .red{
      background-color:#E6333F;
      color:#fff;
      width:111px;
      cursor:pointer;
    }
  }
    .wait_order{
      padding:30px 25px 35px 29px;
      font-size:18px;
      color:#3A3A3A;
      display:flex;
      p{flex:1;}
      img{width:13px;height:10px;margin-top:4px;cursor:pointer;}
    }
 }
 .service_item{
   display:inline-block;
   margin:0 10px 20px 10px;
   cursor:pointer;
   .service_img{
     img{
        width:220px;
        height:206px;
        border-radius:6px 6px 0px 0px;
      }
   }
   .service_msg{
    padding:15px;
    width:190px;
    height:44px;
    background:#fff;
    box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
    border-radius:0px 0px 6px 6px;
    .name{
      font-size:16px;
      color:#3A3A3A;
      font-weight:500;
    }
    .price{
      color:#E22C37;
      font-weight:500;
      font-size:14px;
      margin-top:5px;
    }
   }
 }
 .order_wait_list{
   padding-bottom:50px;
   .wait_item{
     margin:20px 36px 0 30px;
     border:1px solid #EEEEED;
   }
   background:#fff;
   .search_order{
     height: 40px;
     padding:28px 25px 22px 29px;
     border-bottom:1px solid rgba(238, 238, 238, 1);
     .search_input{}
     img{width:13px;height:10px;margin-top:4px;cursor:pointer;float: right;margin-top:15px;}
   }
   .wait_client_info{
     height: 50px;
     display:flex;
     align-items:center;
     border-bottom:1px solid #EEEEED;
     .client_img{
       position: relative;
       padding-left:17px;
       margin-right:15px;
       .img_header{
          width:30px;
          height:30px;
          border-radius:50%;
       }
       .img_tip{
         width:14px;
         height:14px;
         position: absolute;
         left:37px;
         top:0;
       }
     }
     .client_wait_msg{
       flex:1;
       font-size:14px;
       color:#6B6D71;

     }
     .client_time{
       font-size:14px;
       color:#9B9B9B;
       margin-right:15px;
     }
   }
   .amount{
     height: 50px;
     display: flex;
     font-size:14px;
     .amount_price{
       text-align:center;
       line-height:50px;
       flex:1;
       color:#333333;
       height: 50px;
       border-top:1px solid #EEEEED;
     }
     .get_amount{
       text-align:center;
       line-height:50px;
       width:118px;
       background-color:#E6333F;
       color:#fff;
       height:50px;
       cursor:pointer;
     }
   }
 }
 .choose_item_msg{
  display: flex;
  padding:29px 27px 27px 20px;
  i{color:#E84C55;font-size:14px;cursor:pointer;}
  img{width:64px;height: 62px;margin-right:17px;}
  .item_info{
    flex:1;
    display:flex;
    flex-direction:column;
    font-size:14px;
    .item_name{
      flex:1;
      color:#3A3A3A;
    }
    .item_price{
      .price{color:#E6333F;margin-right:30px;}
      .count{color:#9B9B9B;}
    }
  }
}
</style>


