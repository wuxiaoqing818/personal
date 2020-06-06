<template>
  <div id="gm_appo_time" class="margin_main">
      <div class="appo_header_container">
          <!-- 状态列表 -->
          <div class="header_status">
            <ul>
              <li v-for="item in orderStatus"><span :class="item.code"></span>{{item.value}}</li>
            </ul>
          </div>
          <!-- 时间切换 以及 手艺人列表 -->
          <div class="header_craftsman">
            <!-- 选择时间 -->
            <div class="date_change">
              <v-date-check></v-date-check>
            </div>
            <!-- 手艺人列表 -->
            <div class="craftsman_list" id="craftsmanList">
              <ul>
                <li class="craftsman_item" v-for="key in 2">
                  <div class='flex_div'>
                    <img src="@/assets/hair_icon.png"></img>
                    <div class="item_msg">
                      <p><span class="item_name over">Peter</span><span class="item_tip">推荐</span></p>
                      <h6>13%</h6>
                    </div>
                  </div>
                </li><li class="no_item">
                  <div class='flex_div'>
                    <img src="@/assets/no_distrub_head_icon.png"></img>
                    <p>未分配</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <!-- 预约分布表格 -->
      <div class="appo_tab_container">
        <div class="left_header_bar">
          <div class="left_container" id="leftContainer">
              <!-- 时间 -->
              <div class="left-header-cell time" v-for="item in timeArr">
                <div class="main-text time-text">{{new Date(item).format('hh:mm')}}</div>
              </div>
          </div>
        </div>
        <!-- 右边 -->
        <div class="right_panel" id="rightPanel">
          <div class="content_container">
            <div class="content-row" v-for="(item,key) in timeArr" :data-time='item' :class='item == curLineTime?"now_line":""'>
              <div class="content-cell" v-for="num in 3" :data-time='item'>
                    <!-- 数据 -->
                    <div class="data_area">
                      <div class="data_content" v-for="num in 1">
                          <p class="data_status WAITING"></p>
                          <div class="data_img">
                            <img src="@/assets/head_icon.png" class="img_head">
                            <img src='@/assets/female_tip.png' class="img_tip">
                            <!-- <img src='@/assets/male_tip.png'> -->
                          </div>
                          <div class="data_msg">
                            <p><span class="data_name over">林小美</span>
                            <span class="data_level"><img src="@/assets/vip_icon.png"><i>3</i></span></p>
                            <h6>13456754567</h6>
                          </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import DateCheck from '@/compontents/appoModule/DateCheck.vue'
export default {
  name:'GmAppoTime',
  components:DateCheck,
  components: {
    'v-date-check': DateCheck
  },
  data(){
    return {
      orderStatus: [
        {code:'WAITING',value:'待服务'},
        {code:'START',value:'已开单'},
        {code:'FINISH',value:'已完成'},
        {code:'NO_DISTRIBUTION',value:'未分配'},
        {code:'TIMEOUT',value:'已超时'},
        {code:'OCCUPY',value:'占用'}
      ],
      // 时间段
      startOpenTime: "2018-11-12 10:00:00",
      endOpenTime:'2018-11-12 22:00:00',
      intervalTime:'30',
      timeArr:[],
      curLineTime:''
    }
  },
  mounted(){
    this.getTimeArr(this.startOpenTime,this.endOpenTime,this.intervalTime);

    // 滚动条事件
    let element = document.getElementById('rightPanel');
    element.onscroll=function(e){
        document.getElementById('craftsmanList').style.left = '-'+element.scrollLeft+'px';
        document.getElementById('leftContainer').style.top = '-'+element.scrollTop+'px';
    }
  },
  methods:{
    // 根据今日开业时间段 时间间隔 获取时间段数组
    getTimeArr(start,end,interval){
      let startT = new Date(start).getTime();
      let endT = new Date(end).getTime();
      let intervalT = interval * 60 *1000;
      let timeLength = (new Date(endT) - new Date(startT))/intervalT;
      for(var i =0;i<=timeLength;i++){
        this.timeArr.push(new Date(startT + i*intervalT).format('yyyy-MM-dd hh:mm:ss'))
      }
      this.getCurLine()
    },
    // 判断当前时间 最接近时间段中哪一个
    getCurLine(){
      let nowTime = new Date().getTime();
      let thisI = 0;
      for(var i=0;i<=this.timeArr.length;i++){
        let prevTime = new Date(this.timeArr[i]).getTime();
        let nextTime = new Date(this.timeArr[i+1]).getTime();
        if(nowTime>prevTime && nowTime<=nextTime){
          this.curLineTime = this.timeArr[i+1]
          thisI = i-1;
        }
      }
      console.log(this.curLineTime)
      console.log(thisI*98)
      // 滚动到指定位置
      $('#rightPanel').animate({scrollTop: thisI*98}, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
      .WAITING{
        background-color: #409EFF;
      }
      .START{
        background-color: #67C23A;
      }
      .FINISH{
        background-color: #D09AFD;
      }
      .NO_DISTRIBUTION{
        background-color: #E6A23C;
      }
      .TIMEOUT{
        background-color: #E22C37;
      }
      .OCCUPY{
        background-color: #C4C7CD;
      }
      .now_line{
        border-top:2px solid #E22C37;
      }
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
      .content-cell::-webkit-scrollbar {
          // display: none;
            width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 3px;
      }
      .content-cell::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          // -webkit-box-shadow: inset 0 0 5px rgba(190, 185, 185, 0.06);
          background: rgba(80, 78, 78, 0.2);
      }
      .content-cell::-webkit-scrollbar-track {/*滚动条里面轨道*/
          // -webkit-box-shadow: inset 0 0 5px rgba(185, 182, 182, 0.06);
          border-radius: 0;
          background: rgba(121, 119, 119, 0.1);
      }
      #gm_appo_time{
        padding-bottom: 0;
        position: relative;
        .appo_header_container{
          position: relative;
          width: 100%;
          background: #fff;
          .header_status{
            height: 60px;
            display: flex;
            justify-content: flex-end;
            ul{
              margin-right: 90px;
              li{
                display: inline-block;
                font-size: 14px;
                margin-left: 20px;
                line-height: 60px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                span{
                  width:10px;
                  height:10px;
                  display: inline-block;
                  margin-right: 10px;
                  border-radius:50%;
                }
              }
            }
          }
          .header_craftsman{
            overflow: hidden;
            box-sizing: border-box;
            border:1px solid #EBEBEB;
            border-left: none;
            border-right: none;
            @extend .flex_row;
            .date_change{
              @extend .flex_row_center;
              // width: 176px;
              background: #fff;
              padding: 12px 10px;
              z-index: 202;
            }
            .craftsman_list{
              position: relative;
              // overflow: hidden;
              flex: 1;
              ul{
                display: block;
                height: 100%;
                white-space:nowrap;
                li{
                  display: inline-block;
                  width: 200px;
                  border-left: 1px solid #EBEBEB;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  .flex_div{
                    @extend .flex_row;
                  }

                  img{
                    width: 36px;
                    height: 36px;
                    margin:31px 12px 31px 30px;
                    border-radius: 50%;
                    display: inline-block;
                  }
                }
              }
              .craftsman_item{
                  .item_msg{
                    flex: 1;
                    p{
                      @extend .flex_row;
                      margin-top:25px;
                      .item_name{
                        flex: 1;
                      }
                      .item_tip{
                        display: inline-block;
                        text-align: center;
                        font-size:14px;
                        width:39px;
                        height:22px;
                        background:#FFEBCE;
                        color: #E29735;
                        border-radius:4px;
                        margin-right: 16px;
                      }
                    }
                    h6{
                      font-size:14px;
                      color: #9B9B9B;
                      font-weight: 400;
                      margin-top: 5px;
                    }
                  }
              }
              .no_item{
                border-right: 1px solid #EBEBEB;
                p{
                  padding-top: 35px;

                }
              }
            }
          }
        }
        .appo_tab_container{
          position: relative;
          display: flex;
          .left_header_bar{
                display: inline-block;
                width: 176px;
                height: calc(100vh - 280px);
                overflow: hidden;
                position: relative;
                background: #fff;
          }
          .left_container{
                position: absolute;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
          }
          .time{
                width: 176px;
                height: 98px;
                @extend .flex_column_center;
                color: #9B9B9B;
          }
          .right_panel{
            box-sizing: border-box;
            width: calc(100% - 176px);
            max-height: calc(100vh  - 280px);
            display: inline-block;
            vertical-align: top;
            overflow: auto;
            border:1px solid #EBEBEB;
            border-top: none;
          }
          .content_container{
            @extend .flex_column;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            background-color: #F4F5F9;
          }
          .content-row{
            @extend .flex_row;
          }
          .content-cell {
              -ms-flex-negative: 0;
              flex-shrink: 0;
              width: 200px;
              height: 98px !important;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              @extend .flex_column_center;
              border:1px solid #EBEBEB;
              border-left: none;
              border-top: none;
              overflow: auto;
              .data_area{
                // width: 100%;
                max-height: 100%;
                // overflow: auto;
              }
              .data_content+.data_content{
                margin-top: 2px;
              }
              .data_content{
                width:176px;
                height:44px;
                background:#fff;
                box-shadow:0px 3px 16px 0px rgba(85,85,85,0.06);
                border-radius:0px 6px 6px 0px;
                @extend .flex_row;

                .data_status{
                  width: 8px;
                  height: 100%;
                }
                .data_img{
                  position: relative;
                  .img_head{
                    width: 30px;
                    height: 30px;
                    margin:7px 0 7px 8px;
                    border-radius: 50%;
                    display: inline-block;
                  }
                  .img_tip{
                    width: 14px;
                    height: 14px;
                    position:absolute;
                    top: 7px;
                    right: -9px;
                  }
                }
                .data_msg{
                  margin-left: 18px;
                  p{margin-top: 2px;}
                  h6{
                    font-size:14px;
                    color: #9B9B9B;
                    font-weight: 400;
                  }
                  .data_level{
                    position: relative;
                    margin-top: 1px;
                    vertical-align: middle;
                    display: inline-block;
                    img{
                      width: 27px;
                      height: 16px;
                    }
                    i{
                      position: absolute;
                      right: 4px;
                      top: 3px;
                      color: #fff;
                      font-size: 8px;
                      font-style: normal;
                    }
                  }
                }
              }
          }
        }
      }
</style>
