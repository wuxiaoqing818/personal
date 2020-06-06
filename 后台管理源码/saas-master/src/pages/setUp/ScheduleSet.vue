<template>
  <div id="gm_schedule_set">
    <!-- 筛选条件 -->
    <div class="select_condition">
      <div class="label_area_single">
        <label>选择门店：</label>
        <el-select v-model="shop">
            <el-option label="全部" value=""></el-option>
            <el-option label="庆春店" value="a"></el-option>
            <el-option label="宝龙店" value="b"></el-option>
        </el-select>
      </div>
    </div>
    <!-- 排班表 -->
    <div class="appo_header_container">
       <!-- 单双周切换 手艺人列表 -->
       <div class="header_craftsman">
          <div class="week_change">
            <el-select v-model="week">
              <el-option label="单周" value="odd"></el-option>
              <el-option label="双周" value="double"></el-option>
            </el-select>
            <p>可切换为{{week=="odd"?"双周":"单周"}}</p>
          </div>
          <!-- 手艺人列表 -->
            <div class="craftsman_list" id="craftsmanList">
              <ul>
                <li class="craftsman_item" v-for="key in 2">
                  <div class='flex_div'>
                    <img src="@/assets/hair_icon.png"></img>
                    <span class="item_name over">Peter</span>
                  </div>
                </li><li class="no_item">
                   <div class='flex_div'>
                     <img src="@/assets/add_new_icon.png" class="img_no_item"></img>
                     <p>新增手艺人</p>
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
              <div class="main-text time-text">{{item.value}}</div>
            </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right_panel" id="rightPanel">
        <div class="content_container">
          <div class="content-row" v-for="(item,key) in timeArr" :data-time='item'>
            <div class="content-cell" v-for="num in item.classArr" :data-time='item'>
                  <!-- 数据 -->
                  <div class="data_area"  v-show='num.status=="1"'>
                    {{num.value}}
                    <i class="el-icon-edit-outline edit_class" @click="chooseClass"></i>
                  </div>
                  <div class="data_area"  v-show='num.status=="0"'>
                    <span class="add_class" @click="chooseClass"><i class="el-icon-circle-plus-outline"></i>添加班次</span>
                  </div>
                  <div class="data_area"  v-show='num.status=="2"'>
                    <span class="holiday_class">轮休</span>
                  </div>
                  <div class="data_area"  v-show='num.status=="3"'>
                    <span class="no_class">无班次</span>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择班次 弹窗 -->
    <el-dialog title="选择班次" :visible.sync="dialogVisible">
        <div class="choose_class">
          <!-- 左侧 -->
          <div class="tab_left">
            <ul>
              <li v-for="(item,index) in classList" :class="{checked:index == num}" @click="tab(index)">
                <span>{{item.name}}</span>
              </li>
              <!-- 新增班次 -->
              <li :class="{checked: num === -1}" @click="tab(-1)">
                <span>新增班次<i class="el-icon-circle-plus-outline" style="padding-left:5px;"></i></span>
              </li>
            </ul>
          </div>
          <!-- 右侧 -->
          <div class="detail_area">
              <el-form :model="classForm">
                <el-form-item label="班次名称:" :label-width="formLabelWidth">
                    <el-input v-model="classForm.name"></el-input>
                </el-form-item>
                <el-form-item label="班次时间:" :label-width="formLabelWidth">
                    <el-time-select
                      placeholder="起始时间"
                      v-model="classForm.startTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30'
                      }">
                    </el-time-select>
                    —
                    <el-time-select
                      placeholder="结束时间"
                      v-model="classForm.endTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                        minTime: classForm.startTime
                      }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="休息时间:" :label-width="formLabelWidth">
                    <div class="break_item" v-for="(item,key) in classForm.breakList" style="margin-bottom:10px;">
                        <el-time-select
                          placeholder="起始时间"
                          v-model="item.start"
                          :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '23:30'
                          }">
                        </el-time-select>
                        —
                        <el-time-select
                          placeholder="结束时间"
                          v-model="item.end"
                          :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '23:30',
                            minTime: item.start
                          }">
                        </el-time-select>
                        <i class="el-icon-delete delete_icon" @click="removeTime(key)"></i>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width='formLabelWidth'>
                  <el-button @click="addNewTime">新增<i class="el-icon-circle-plus-outline" style="padding-left:5px;"></i></el-button>
                </el-form-item>
                <el-form-item  label="" :label-width='formLabelWidth'>
                  <el-button type="primary">确定</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
          </div>
        </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name:'GmScheduleSet',
  data(){
    return{
      shop:'',
      week:'odd',
      timeArr:[
        // status 1班次 0待添加 2轮休 3无班次
        {code:'1',value:'周一',
          classArr:[
            {status:'1',value:'默认班次'},
            {status:'1',value:'早班'}
          ]
        },
        {code:'2',value:'周二',
          classArr:[
            {status:'0',value:''},
            {status:'2',value:''}
          ]
        },
        {code:'3',value:'周三',
          classArr:[
            {status:'0',value:''},
            {status:'1',value:'晚班'}
          ]
        },
        {code:'4',value:'周四',
          classArr:[
            {status:'1',value:'默认班次'},
            {status:'3',value:''}
          ]
        },
        {code:'5',value:'周五',
          classArr:[
            {status:'1',value:'默认班次'},
            {status:'1',value:'默认班次'}
          ]
        },
        {code:'6',value:'周六',
          classArr:[
            {status:'1',value:'默认班次'},
            {status:'1',value:'默认班次'}
          ]
        },
        {code:'7',value:'周日',
          classArr:[
            {status:'1',value:'默认班次'},
            {status:'3',value:''}
          ]
        }
      ],
      dialogVisible:false,
      formLabelWidth:'120px',
      num:0,
      classList:[
        {
          name:'默认班次',
        },
        {
          name:'早班',
        },
        {
          name:'晚班',
        }
      ],
      classForm:{
        name:'',
        startTime:'',
        endTime:'',
        breakList:[
          {start:'',end:''}
        ]
      }
    }
  },
  mounted(){
    // 滚动条事件
    let element = document.getElementById('rightPanel');
    element.onscroll=function(e){
        document.getElementById('craftsmanList').style.left = '-'+element.scrollLeft+'px';
        document.getElementById('leftContainer').style.top = '-'+element.scrollTop+'px';
    }
  },
  methods:{
    chooseClass(){
      this.dialogVisible = true
    },
    tab(index) {
      this.num = index;
    },
    // 新增时间
    addNewTime(){
      this.classForm.breakList.push({
          start:'',end:''
      })
    },
    // 删除时间
    removeTime(key){
      console.log(key)
      this.classForm.breakList.splice(key, 1);
    },
  }
}
</script>
<style lang="scss">
.week_change{
  width:176px;
  height:97px;
  text-align:center;
  .el-select{
    margin-top: 10px;
    width: 80px;
    .el-input--suffix .el-input__inner{
      border: none;
      font-size: 16px;
      color: #E22C37;
    }
  }
  p{
    color: #9B9B9B;
    font-size:14px;
  }
}
#gm_schedule_set .el-dialog__body{
  padding:0;
}
</style>

<style lang="scss" scoped>
  .select_condition{
    padding-left: 20px;
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
  #gm_schedule_set{
    // margin-bottom:;
        padding-bottom: 20px;
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
                  .img_no_item{
                    width: 28px;
                    height: 28px;
                    margin:39px 12px 31px 30px;
                    border-radius: 50%;
                    display: inline-block;
                  }
                  .item_name{
                    flex:1;
                    display:flex;
                    align-items:center;
                  }
                }
              }
              .no_item{
                cursor:pointer;
                border-right: 1px solid #EBEBEB;
                p{padding-top: 40px;}
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
        .add_class{
          i{padding-right:5px;}
          color:#409EFF;
          cursor:pointer;
        }
        .holiday_class,.no_class{
          display:inline-block;
          width:98px;
          height:40px;
          border-radius:4px;
          text-align:center;
          line-height:40px;
        }
        .holiday_class{
          background:#FFF0DD;
          color:#E6A23C;
        }
        .no_class{
          background:#FDDFE6;
          color:#F56C6C;
        }
        .edit_class{
          color:#409EFF;
          font-size:16px;
          cursor:pointer;
          vertical-align:middle;
        }
  }
  .choose_class{
    display:flex;
  }
  .tab_left{
    border-top:1px solid #E8E8E8;
    // border-right:1px solid #E8E8E8;
    box-sizing:border-box;
    ul{
      li{
        width:124px;
        height:48px;
        border-bottom:1px solid #E8E8E8;
        text-align:center;
        line-height:48px;
        cursor:pointer;

      }
      .checked{
        color:#fff;
        background:#409EFF;
      }
    }
  }
  .detail_area{
    flex:1;
    border-top:1px solid #E8E8E8;
    border-left:1px solid #E8E8E8;
    padding:20px 20px 30px 0;
    .delete_icon{
      color:#E22C37;
      font-size:18px;
      cursor:pointer;
      padding-left:5px;
    }
  }
</style>

