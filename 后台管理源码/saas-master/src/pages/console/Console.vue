<template>
    <div id="gm_console">
      <div class="header">
          <div class="head_left">
            <!-- <img src="@/assets/h_img.png"> -->
          </div>
          <div class="head_right">
              <span class="item">
                <img class='icon_img' src="@/assets/h_notice.png">
                <span class="msg_count">23</span>
              </span>
              <img class="head_img" src="@/assets/h_head.png">
              <span>用户名</span>
              <el-popover
              class="console_popover"
              placement="bottom-end"
              v-model="visible">
              <!-- 用户信息 -->
              <div class="user_msg">
                <p class="popver_title">12387678987</p>
                <div class="user_oper">
                  <p @click="toUpdatePass"><img src='@/assets/changepsw_icon.png'><span>修改密码</span></p>
                  <p  @click="toPerCen"><img src='@/assets/personal_center_icon.png'><span>个人中心</span></p>
                </div>
              </div>
              <div class="user_subscibe">
                <p class="popver_title">订阅</p>
                <p class="user_edition">普通版<span>350天后到期</span></p>
                <p class="subscibe_oper"><span>续费</span><span>升级</span></p>
              </div>
              <div class="user_help">
                <p class="popver_title">需要帮助？</p>
                <p class="user_phone">客服热线:400-400-8833</span></p>
                <div class="help_manage">
                  <img src="@/assets/h_head.png">
                  <div>
                    <p>专属客户经理</p>
                    <p>19523423800</p>
                  </div>
                </div>
              </div>
              <div class="user_btn">
                <p>商家社区</p>
                <p class="logout" @click="logout">退出</p>
              </div>
              <!-- <el-button slot="reference">删除</el-button> -->
              <i class="el-icon-arrow-down" slot="reference"></i>
            </el-popover>
          </div>
      </div>
       <!-- 今日实时 -->
      <div class="con_title">
        <img src="@/assets/h_today_cur.png">
        <span>今日实时</span>
      </div>
      <div class="today_data">
          <ul>
            <li>
              <img src="@/assets/h_today_income.png">
              <div>
                <p>3400.89</p>
                <span>营业收入(元)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_order.png">
              <div>
                <p>145</p>
                <span>订单数(个)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_subscribe.png">
              <div>
                <p>145</p>
                <span>预约数(次)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_member.png">
              <div>
                <p>15</p>
                <span>新增会员(个)</span>
              </div>
            </li>
          </ul>
          <ul class="second">
            <li>
              <img src="@/assets/h_today_labour.png">
              <div>
                <p>3400.89</p>
                <span>劳动业绩(元)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_card.png">
              <div>
                <p>3400.89</p>
                <span>充卡业绩(元)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_cardpayfirst.png">
              <div>
                <p>3400.89</p>
                <span>卡金消耗(元)</span>
              </div>
            </li>
            <li>
              <img src="@/assets/h_today_cardpay.png">
              <div>
                <p>34</p>
                <span>次卡消耗(次)</span>
              </div>
            </li>
          </ul>
      </div>
      <!-- 快捷操作 -->
      <div class="con_title">
        <img src="@/assets/h_quick_oper.png">
        <span>快捷操作</span>
      </div>
      <div class="quick_operation">
        <ul>
          <li>
            <img src="@/assets/h_quick_order.png">
            <p>快速开单</p>
          </li>
          <li>
            <img src="@/assets/h_add_subscribe.png">
            <p>新增预约</p>
          </li>
          <li>
            <img src="@/assets/h_add_member.png">
            <p>新增会员</p>
          </li>
          <li>
            <img src="@/assets/h_waitpay_order.png">
            <p>待付款订单</p>
          </li>
          <li class="flex_row">
            <img src="@/assets/h_waitpay_serive.png">
            <p>待付款服务</p>
          </li>
        </ul>
      </div>
      <!-- 图表 -->
      <div class="today_chart">
        <!-- 今日收款 -->
        <div class="today_collection">
            <div class="coll_title">
              <p class="title">今日收款</p>
              <p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in collectionList"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                </el-select>
              </p>
            </div>
             <!-- 比例图 -->
             <div class="pie_area">
                <div id="con_pie" style="width:100%;height:100%;"></div>
             </div>
              <div class="legend">
                <ul>
                  <li><span class="legend1"></span>商品收入</li>
                  <li><span class="legend2"></span>美发收入</li>
                  <li><span class="legend3"></span>服务收入</li>
                </ul>
              </div>
        </div>
        <!-- 趋势图 -->
        <div class="today_tendency_chart">
            <div class="coll_title">
              <p class="title">趋势图<span>10.01-10.30 {{value2}}趋势图</span></p>
              <div>
                <el-select v-model="value2" placeholder="请选择">
                    <el-option
                      v-for="item in tendencyList"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                </el-select>
              </div>
            </div>
            <!-- 折线图 -->
            <div class="line_area">
              <div id="con_line" style="width:100%;height:100%;"></div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/graphic')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
// legend 不起作用
// import '../../../node_modules/echarts/lib/component/legend'
require('echarts/lib/component/legend')

export default {
  name:'GmConsole',
  data () {
    return {
      visible:false,
      value:'金额结构',
      collectionList:[{id:1,value:'金额结构'}],
      value2:'劳动业绩',
      tendencyList:[{id:1,value:'劳动业绩'},{id:2,value:'卡金余额'},{id:3,value:'会客客数'}]
    }
  },
  mounted(){
    this.drawPie()
    this.drawLine()
    window.addEventListener('resize', function () {

    })
  },
  methods: {
      // 饼图
      drawPie(){
          let conPie = echarts.init(document.getElementById('con_pie'));
          let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {d}%"
            },
            graphic: {
                elements: [{
                    type: 'text',
                    style: {
                        text:'23425元',
                        color:'#333',
                        fontSize:'30',
                        fontWeight:'400'
                    },
                    left: 'center',
                    top: 'center'
                }]
            },
            legend: {
                name:'aaa',
                show: true,
                orient: 'horizontal',
                icon: 'circle',
                data:['商品收入','美发收入','服务收入'],
                zlevel:2,
                textStyle:{
                  color:'#707070',
                  fontSize:'20'
                }
            },
            series: [
                {
                    name:'aaa',
                    type:'pie',
                    symbolSize:1,
                    color:['#4EDBAC','#6B95FF','#FFC606'],
                    radius: ['82%', '90%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: '400',
                                color:'#333333'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'335元'},
                        {value:310, name:'310元'},
                        {value:234, name:'234元'}
                    ]
                }
            ]
          };
          conPie.setOption(option);
          // 自适应
          window.addEventListener('resize', function () {
            setTimeout(function(){
              conPie.resize()
            },300)
          })
      },
      // 折线图
      drawLine(){
          let conLine = echarts.init(document.getElementById('con_line'));
          let option ={
            tooltip: {
                trigger: 'axis',
                backgroundColor:'#4ADAAB',
                padding:10,
                position:'top',
                textStyle:{
                    color:'#fff',
                    fontSize:'20',
                    fontWeight:'400'
                },
                axisPointer: {
                    // type: 'cross',
                    label: {
                        backgroundColor: '#4ADAAB'
                    }
                },
                formatter:"{c}元"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                data: [8820, 12932,13456, 9031, 9334, 13290, 13302, 14320, 9334, 10343, 12980,20000, 8739, 16987,14320, 9334, 10343, 12980,10000, 8739, 16987],
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: '#4ADAAB'
                    }
                },
                smooth:true,
                lineStyle: {
                    normal: {
                        color: '#4ADAAB',
                        width: 4,
                        shadowColor: 'rgba(74,218,171,1)',
                        shadowBlur: 100,
                        shadowOffsetY: 30,
                    }
                }
            }]
          };
          conLine.setOption(option);
          // 自适应
          window.addEventListener('resize', function () {
             setTimeout(function(){
              conLine.resize()
            },300)
          })
      },
      logout(){
        this.$router.push('/')
      },
      // 去到 个人中心
      toPerCen(){
        this.$router.push('/personal-center')
      },
      toUpdatePass(){
        this.$router.push('/update-pass')
      }
  }
}
</script>

<style lang="scss" scoped>
.flex_row{
  display: flex;
  flex-direction: row;
}
.flex_column{
  display: flex;
  flex-direction: column;
}
.flex_column_center{
  @extend .flex_column;
  justify-content: center;
  align-items: center;
}
.flex_row_center{
   @extend .flex_row;
  justify-content: center;
  align-items: center;
}
  #gm_console{
    .header{
         padding:14px 40px 14px 20px;
         display: flex;
         flex-direction: row;


         .head_left{
           flex:1;
           line-height: 36px;
           img{
             width: 14px;
             height: 14px;
           }

         }
         .head_right{
           .head_img{
             width: 36px;
             vertical-align: middle;
             margin-right: 11px;
           }
           .icon_img{
             width: 20px;
             height: 20px;
             vertical-align: middle;
           }
           .item{
             position: relative;
             margin-right: 60px;
             .msg_count{
               position: absolute;
               top: -7px;
               left: 10px;
               width:22px;
               height:18px;
               background:rgba(226,44,55,1);
               border-radius:9px;
               color: #fff;
               text-align: center;
               font-size:14px;
             }
           }
           span{
             display: inline-block;
             font-size: 16px;
             margin-right: 14px;
           }
           i{
             display: inline-block;

           }
         }
       }
    padding-right: 20px;
    .con_title{
      margin-left: 6px;
      font-weight:400;
      font-size: 20px;
      img{
        width: 55px;
        height: 55px;
        vertical-align: middle;
      }
    }
    .today_data{
      ul{
        margin-bottom: 10px;
        @extend .flex_row;
        margin-left: 20px;
        li{
          height: 120px;
          flex:1;
          margin-right: 1%;
          background: #fff;
          box-shadow: 0px 3px 16px 0px rgba(85, 85, 85, 0.06);
          border-radius: 6px;
          @extend .flex_row_center;
          img{
            width: 75px;
            height: 75px;
            padding-left: 5%;
            padding-right: 3%;
          }
          div{
            flex: 1;
            p{
              font-size: 28px;
              font-weight:400;
            }
            span{
              font-size: 16px;
              color: #606266;
            }
          }
        }
      }
    }
    .quick_operation{
      margin-left: 20px;
      ul{
        margin-bottom: 10px;
        @extend .flex_row;
        li{
          box-shadow: 0px 3px 16px 0px rgba(85, 85, 85, 0.06);
          border-radius: 6px;
          height: 184px;
          background-color: #FFFFFF;
          flex: 1;
          margin-right: 10px;
          @extend .flex_column_center;
          img{
            width: 56px;
            height: 56px;
          }
          p{
            font-size:20px;
            padding-top: 14px;
          }
        }
      }
    }
    .today_chart{
      margin: 40px 10px 20px 20px;
      @extend .flex_row;
      .today_collection{
        border-radius: 6px;
        box-shadow: 0px 3px 16px 0px rgba(85, 85, 85, 0.06);

        flex: 1;
        background: #fff;
        // width: 400px;
        height: 482px;
        .coll_title{
          margin-top: 30px;
          @extend .flex_row_center;
          p{
            text-align: center;
            flex: 1;
          }
          .title{
            font-size: 22px;
          }
        }
        .pie_area{
          margin-left: 20%;
          margin-top: 10%;

          width: 60%;
          height: 60%;
        }
        // 自定义lengend
        .legend{
          ul{
            width: 80%;
            margin-left: 10%;
            @extend .flex_row;
            li{
              flex: 1;
              font-size: 14px;
              text-align: center;
              span{
                display: inline-block;
                width:10px;
                height:10px;
                margin-right: 10px;
                border-radius:50%;
              }
              .legend1{
                  background:#4EDBAC;
              }
              .legend2{
                  background:#6B95FF;
              }
              .legend3{
                  background:#FFC606;
              }
            }
          }
        }
      }
      .today_tendency_chart{
          border-radius: 6px;
          box-shadow: 0px 3px 16px 0px rgba(85, 85, 85, 0.06);
          flex: 2;
          background: #fff;
          @extend .flex_column;
          height: 482px;
          margin-left:20px;
          .coll_title{
            margin: 30px 20px 0 40px;
            @extend .flex_row;
            p{
              flex: 1;
              font-size: 22px;
              line-height: 43px;
              span{
                color: #9B9B9B;
                font-size: 14px;
                padding-left: 20px;
                vertical-align: middle;
              }
            }
          }
          .line_area{
            flex: 1;
          }
    }

   }
  }

</style>
<style lang="scss">
   .el-popover{
      padding:0 !important;
    }
  #gm_console .el-select .el-input .el-select__caret{
    color: #E22C37 !important;
    font-size: 24px;
  }
  #gm_console .el-input__inner{
    width: 125px;
    border-radius: 20px;
  }
  .popver_title{
      color:#9B9B9B;
      font-size: 14px;
      margin-top:10px;
    }
    .user_msg{
      width:245px;
      height:88px;
      padding-left:17px;
      padding-top:5px;
      border-bottom:1px solid rgba(235, 235, 235, 1);
      .user_oper{
        margin-top:20px;
        display:flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        font-size:14px;
        p{
          cursor:pointer;
          flex:1;
          img{width:14px;height: 14px;margin-right:12px;vertical-align:middle;}
          span{vertical-align:middle;}
        }
      }
    }
    .user_subscibe{
      height: 100px;
       padding-left:17px;
      border-bottom:1px solid rgba(235, 235, 235, 1);
        .user_edition{
          margin:15px 0;
          span{
            margin-left:4px;
          }
        }
        .subscibe_oper{
          span{
            color:#E22C37;
            margin-right:32px;
            cursor:pointer;
          }
        }
    }
    .user_help{
      padding-top:5px;
      padding-left:17px;
      height: 138px;
      border-bottom:1px solid rgba(235, 235, 235, 1);
      .user_phone{
        margin:15px 0 20px 0;
      }
      .help_manage{
        display:flex;
        flex-direction:row;
        font-size:14px;
        img{
          width:36px;
          height:36px;
          display:inline-block;
          border-radius:50%;
          margin-right:15px;
        }
      }
    }
    .user_btn{
      display:flex;
      flex-direction:row;
      p{
        flex:1;
        text-align:center;
        line-height:44px;
        height:44px;
        cursor:pointer;
      }
      .logout{
        color:#C4C7CD;
        border-left:1px solid #EBEBEB;
      }
    }
</style>
