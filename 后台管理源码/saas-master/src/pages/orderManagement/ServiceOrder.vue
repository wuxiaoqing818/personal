<template>
  <div id="gm_service_order" class="margin_main">
    <!-- 列表筛选条件 -->
    <div class="service_list_condition">
      <!-- 左侧筛选 -->
      <div class="condition_left">
        <div class="label_area">
          <label class="margin_label_no">到店时间：</label>
          <el-radio-group v-model="arrivalTime">
            <el-radio-button label="today" style="margin-left:0;">今日</el-radio-button>
            <el-radio-button label="tomorrow" style="margin-left:0;">明天</el-radio-button>
            <el-radio-button label="week" style="margin-left:0;">本周</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="label_area">
          <label class="margin_label_no">付款方式：</label>
          <el-select v-model="payway">
              <el-option label="全部" value=""></el-option>
              <el-option label="微信" value="WeChat"></el-option>
              <el-option label="支付宝" value="Alipay"></el-option>
              <el-option label="现金" value="Cash"></el-option>
          </el-select>
          <label>门店：</label>
          <el-select v-model="shop">
              <el-option label="全部" value=""></el-option>
              <el-option label="总部" value="a"></el-option>
              <el-option label="滨江店" value="b"></el-option>
          </el-select>
        </div>
      </div>
      <!-- 右侧搜索 -->
      <div class="condition_right">
        <el-input placeholder="请输入订单号" class="con_phone"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <!-- 列表数据 -->
    <div class="service_container container_normal">
        <el-tabs type="card">
          <el-tab-pane v-for="item in orderStatus" :label="item.value" v-model="item.code"></el-tab-pane>
        </el-tabs>
        <div class="table_container">
          <table cellspacing="0" cellpadding="0"  class="table">
              <tr class="thead">
                <th class="align_left">服务项目</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
                <th>实收款</th>
                <th>客户</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tbody v-for="order in tableData">
                <tr class="tr2">
                  <td colspan="8" class="tdAll align_left">
                    <span class="time">{{order.ordertime}}</span>
                    <span>订单号：{{order.orderNo}}</span>
                    <span class="td_remark over">备注：{{order.remark}}</span>
                  </td>
                </tr>
                <tr class="trlist"  v-for="(item,index) in order.orderItemList">
                  <td class="tr_msg">
                    <img :src="item.img">
                    <div class="serviceMsg">
                      <p>{{item.serviceName}}</p>
                      <p class="servicer">{{item.servicer}}&nbsp;&nbsp;{{item.serviceShop}}</p>
                    </div>
                  </td>
                  <td class="border_left_no">
                    {{item.price}}元
                  </td>
                  <td class="border_left_no">
                    {{item.count}}
                  </td>
                  <td class="border_left_no">
                    {{item.totalPrice}}元
                  </td>
                  <td>
                    <p>{{item.realTotal}}元</p>
                    <p class="top15">{{item.payway}}</p>
                  </td>
                  <td>
                    <p>{{item.clientName}}</p>
                    <p class="top15">{{item.clientPhone}}</p>
                  </td>
                  <td v-show="index == 0" :rowspan="order.orderItemList.length">
                    <p class="color_green" v-if='order.orderStatus == "FINISH"'>{{order.orderStatus | orderStatusName}}</p>
                    <p class="color_grey" v-else-if='order.orderStatus == "CANCEl"'>{{order.orderStatus | orderStatusName}}</p>
                    <p class="color_yellow" v-else>{{order.orderStatus | orderStatusName}}</p>
                    <p class="top15 cursor" @click="toDetail">订单详情</p>
                  </td>
                  <td class="border_right" v-show="index == 0" :rowspan="order.orderItemList.length">
                    <p class="color_blue cursor" @click="addNewRemark">备注</p>
                    <p class="top15 cursor red_tip" @click="commontReplay">评论回复<img src="@/assets/h_notread.png"></p>
                  </td>
                </tr>
                <tr class="tr_btns" v-show="order.orderStatus == 'REFUND'">
                  <td colspan="8">
                      <el-button @click="refuseRefund">拒绝退款</el-button>
                      <el-button @click="updateRefund">修改退款</el-button>
                      <el-button type="warning">退款</el-button>
                  </td>
                </tr>
                <tr class="tr_btns" v-show="order.orderStatus == 'WAIT_PAY'">
                  <td colspan="8">
                      <el-button @click="addNewRemark">备注</el-button>
                      <el-button @click="cancelOrder">取消订单</el-button>
                      <el-button type="primary">收款</el-button>
                  </td>
                </tr>
                <tr class="interval_tr"></tr>
              </tbody>
          </table>
        </div>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count='5'
          prev-text='上一页'
          next-text='下一页'
          layout="total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
    </div>

    <!-- 备注弹框 -->
    <el-dialog
      title="备注"
      :visible.sync="remarkDialogVisible"
      width="30%"
      center>
      <el-input type="textarea" placeholder="请输入备注内容(不超过150字)" maxlength='150' rows='5'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="remarkDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消订单弹框 -->
    <el-dialog title="取消订单" :visible.sync="dialogVisibleCancel" center>
      <el-form :model="cancelForm" ref="cancelForm">
        <el-form-item label="选择取消理由:" :label-width="formLabelWidth">
          <el-select v-model="cancelForm.reason" placeholder="请选择取消理由">
            <el-option label="临时有事来不了" value="1"></el-option>
            <el-option label="不想去了" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加备注:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="cancelForm.desc" placeholder="请输入备注内容(不超过150字)" maxlength="150" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCancel = false">点错了</el-button>
        <el-button type="primary" @click="dialogVisibleCancel = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 拒绝退款弹框 -->
    <el-dialog title="拒绝退款" :visible.sync="dialogVisibleRefuse" center>
      <el-form :model="refuseForm" ref="refuseForm">
        <el-form-item label="选择拒绝理由:" :label-width="formLabelWidth">
          <el-select v-model="refuseForm.reason" placeholder="请选择拒绝理由">
            <el-option label="临时有事来不了" value="1"></el-option>
            <el-option label="不想去了" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="给客户留言:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="refuseForm.desc" placeholder="请输入给客户的留言(不超过150字)" maxlength="150" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRefuse = false">取消</el-button>
        <el-button type="primary" @click="dialogVisibleRefuse = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改退款弹框 -->
    <el-dialog title="修改退款" :visible.sync="dialogVisibleUpdate" center>
      <el-form :model="updateForm" ref="updateForm">
        <el-form-item label="申请退款金额:"  :label-width="formLabelWidth">
            <span>200元</span>
        </el-form-item>
        <el-form-item label="同意退款金额:" :label-width="formLabelWidth">
            <el-input v-model="updateForm.price" placeholder="填写金额数字"></el-input>
        </el-form-item>
        <el-form-item label="给客户留言:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="updateForm.desc" placeholder="请输入给客户的留言(不超过150字)" maxlength="150" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdate = false">取消</el-button>
        <el-button type="paimary" @click="dialogVisibleUpdate = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 评价弹框 -->
    <!-- 评价有三种状态 1.未评价 2.超时评价 3.正常评价 -->
    <el-dialog title="评价回复" :visible.sync="dialogVisibleEvaluate" center>
      <el-form ref="evaluateForm">
        <el-form-item label="订单商品:" :label-width="formLabelWidth">
            <div class="evaluate_order_goods" v-for="item in evaData.itemList">
              <img :src="item.img">
              <div class="evaluate_good_msg">
                <p>{{item.name}}</p>
                <p>{{item.person}}&nbsp;&nbsp;{{item.shop}}</p>
              </div>
            </div>
        </el-form-item>
        <el-form-item label="订单编号:" :label-width="formLabelWidth">
            <el-input v-model="evaData.orderNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="总体评分:" :label-width="formLabelWidth">
            <!-- <el-rate
              v-model="evaData.grade"
              :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate> -->
            <el-rate
              v-model="evaData.grade"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              disabled
              show-score
              text-color="#E6A23C"
              score-template="{value}分">
            </el-rate>
        </el-form-item>
        <!-- 评论正文状态 -->
        <el-form-item  label="评论正文:" :label-width="formLabelWidth" v-if='evaData.evaStatus == "NORMAL"'>
            <div class="comment_area">
                <p>{{evaData.comment.content}}</p>
                <p>{{evaData.comment.time}}</p>
                <p>
                  <img v-for='item in evaData.comment.imgList' :src="item.img">
                </p>
            </div>
        </el-form-item>
        <el-form-item  label="评论正文:" :label-width="formLabelWidth" v-if='evaData.evaStatus == "WAIT"'>
            <span>暂时未收到评价</span>
        </el-form-item>
        <el-form-item  label="评论正文:" :label-width="formLabelWidth" v-if='evaData.evaStatus == "TIMEOUT"'>
            <span>客户超时未评价，系统默认5星好评</span>
        </el-form-item>

        <el-form-item  label="商家回复:" :label-width="formLabelWidth" v-if='evaData.evaStatus == "NORMAL"'>
            <div class="comment_area">
                <p>{{evaData.comment.content}}</p>
                <p>{{evaData.comment.time}}</p>
            </div>
        </el-form-item>
        <el-form-item  label="给客户回复:" :label-width="formLabelWidth" placeholder="" v-if='evaData.evaStatus == "NORMAL"'>
            <el-input type="textarea" v-model="commont" placeholder="请输入给客户的留言(不超过150字)" maxlength="150" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEvaluate = false">取消</el-button>
        <el-button type="primary" @click="dialogVisibleEvaluate = false" v-if='evaData.evaStatus !== "NORMAL"'>邀请客户评价</el-button>
        <el-button type="primary" @click="dialogVisibleEvaluate = false" v-else>确认回复</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import '@/assets/css/base.scss'
export default {
  name:'GmServiceOrder',
  data(){
    return {
      formLabelWidth:'120px',
      remarkDialogVisible:false,
      dialogVisibleCancel:false,
      cancelForm:{
        reason:'',
        desc:''
      },
      dialogVisibleRefuse:false,
      refuseForm:{
        reason:'',
        desc:''
      },
      dialogVisibleUpdate:false,
      updateForm:{
        price:'',
        desc:''
      },
      dialogVisibleEvaluate:false,
      commont:'',
      arrivalTime:'today',
      timeValue:'',
      payway:'',
      shop:'',
      totalCount:100,
      currentPage:1,
      pageSize:10,
      orderStatus: [
        {code:'',value:'全部'},
        {code:'WAIT_PAY',value:'待付款'},
        {code:'FINISH',value:'已完成'},
        {code:'WAIT_EVALUATE',value:'待评价'},
        {code:'CANCEL',value:'已取消'},
        {code:'REFUND',value:'退款/售后'}
      ],
      evaData:{
        evaStatus:'NORMAL',//WAIT未回复 TIMEOUT超时 NORMAL
        orderNo:'j3294823041029138',
        grade:3,
        itemList:[{
          img:require('@/assets/ser_logo.png'),
          name:'高级烫染+造型定制',
          person:'tony',
          shop:'杭州滨江店'
        },{
          img:require('@/assets/ser_logo.png'),
          name:'高级烫染+造型定制',
          person:'tony',
          shop:'杭州滨江店'
        }],
        comment:{
          content:'tony我也不知道说什么tony我也不知道说什么tony我也不知道说什么',
          time:'2018/11/11',
          imgList:[{img:require('@/assets/ser_logo.png')},
          {img:require('@/assets/ser_logo.png')},
          {img:require('@/assets/ser_logo.png')}]
        }
      },
      tableData:[{
        id:1,
        ordertime:'2018/10/11 05:00:10',
        orderNo:'J120312847892375723840193',
        orderStatus:'WAIT_PAY',
        orderItemList:[{
          img:require('@/assets/ser_logo.png'),
          serviceName:'高级烫染+洗吹洗护',
          serviceShop:'杭州滨江店',
          servicer:'tony',
          price:'299',
          count:1,
          totalPrice:'299',
          realTotal:'200',
          payway:'微信支付',
          clientName:'mary',
          clientPhone:'12345678909'
        },{
          img:require('@/assets/ser_logo.png'),
          serviceName:'高级烫染+洗吹洗护',
          serviceShop:'杭州滨江店',
          servicer:'tonyan',
          price:'199',
          count:2,
          totalPrice:'398',
          realTotal:'350',
          payway:'微信支付',
          clientName:'maryaa',
          clientPhone:'12345678909'
        }],
        remark:'设身处地开始吃大餐电视机厂地产'
      },{
        id:1,
        ordertime:'2018/10/11 05:00:10',
        orderNo:'J120312847892375723840193',
        orderStatus:'FINISH',
        orderItemList:[{
          img:require('@/assets/ser_logo.png'),
          serviceName:'高级烫染+洗吹洗护',
          serviceShop:'杭州滨江店',
          servicer:'tony',
          price:'299',
          count:1,
          totalPrice:'299',
          realTotal:'200',
          payway:'微信支付',
          clientName:'mary',
          clientPhone:'12345678909'
        }],
        remark:'设身处'
      },{
        id:1,
        ordertime:'2018/10/11 05:00:10',
        orderNo:'J120312847892375723840193',
        orderStatus:'REFUND',
        orderItemList:[{
          img:require('@/assets/ser_logo.png'),
          serviceName:'高级烫染+洗吹洗护',
          serviceShop:'杭州滨江店',
          servicer:'tony',
          price:'299',
          count:1,
          totalPrice:'299',
          realTotal:'200',
          payway:'微信支付',
          clientName:'mary',
          clientPhone:'12345678909'
        }],
        remark:'设身处'
      }]
    }
  },
  filters: {
    orderStatusName:function(val){
      switch(val){
        case 'WAIT_PAY':
        return "待付款"
        break;
        case 'WAIT_EVALUATE':
        return "待评价"
        break;
        case 'FINISH':
        return "已完成"
        break;
        case 'REFUND':
        return "退款中"
        break;
        case 'CANCEL':
        return "已取消"
        break;
      }
    }
  },
  mounted(){

  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 添加备注
    addNewRemark(){
      this.remarkDialogVisible = true
    },
    // 取消订单
    cancelOrder(){
      this.dialogVisibleCancel = true
    },
    // 拒绝退款
    refuseRefund(){
      this.dialogVisibleRefuse = true
    },
    // 修改退款
    updateRefund(){
      this.dialogVisibleUpdate = true
    },
    // 评论回复
    commontReplay(){
      this.dialogVisibleEvaluate = true
    },
    // 去订单详情页
    toDetail(){
      this.$router.push('/service-detail')
    }
  }
}
</script>
<style lang="scss">
#gm_service_order {
  .el-rate__icon{
    font-size: 22px;
  }
  .el-rate{
    line-height: 2.5;
  }
}
</style>

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
.service_list_condition{
    @extend .flex_row;
    label{font-size: 14px;}
    .condition_left{
      flex:1;
    }
    .condition_right{
      .con_phone{
        width:180px;
      }
    }
}
// .service_container{
//     border:1px solid rgba(235, 235, 234, 1);
//     border-radius:0px 0px 6px 6px;
//     background-color:#fff;
//     margin-top:20px;
// }
.border_left{
  border-left: 1px solid #EBEBEB;
}
.border_right{
  border-right: 1px solid #EBEBEB !important;
}
.border_left_no{
  border-left: none !important;
}
.align_left{
  text-align:left !important;
}
.top15{
  margin-top:15px;
}
.color_yellow{
  color: #E6A23C;
}
.color_green{
  color: #67C23A;
}
.color_grey{
  color: #9B9B9B;
}
.color_blue{
  color: #409EFF;
}
.cursor{
  cursor:pointer;
}
.table_container{
  .interval_tr{
    height: 20px;
  }
  margin:0 20px;
  table{
    width:100% ;
    color: #333333;
    .thead{
      height: 52px;
    }
    th{
      font-size:14px;
      font-weight:400;
    }
    td{
      text-align:center;
      font-size:14px;
      font-weight:400;
    }
    .tr2{
      height:32px;
      background:rgba(250,250,250,1);
      border: 1px solid #EBEBEB;
      color: #9B9B9B;
      .time{
        margin-left: 17px;
        margin-right:50px;
      }
      .tdAll{
        border:1px solid #EBEBEB;
      }
      .td_remark{
        float: right;
        max-width: 400px;
        margin-right: 10px;
        display: inline-block;
      }
    }
    .trlist{
      td{
        border:1px solid #EBEBEB;
        border-top: none;
        border-right: none;
      }
      .tr_msg{
        text-align: left;
        @extend .flex_row;
        img{
          width:64px;
          height:62px;
          padding: 29px 17px 26px 22px;
        }
        .serviceMsg{
          flex: 1;
          margin-top: 34px;
          .servicer{
            margin-top: 18px;
            color: #606266;
          }
        }
      }
    }
    .tr_btns{
      height:74px;
      td{
        text-align: right;
        padding-right: 23px;
        border:1px solid #EBEBEB;
        border-top: none;
        .el-button{
          width: 98px;
        }
      }
    }
  }
  .red_tip{
    position: relative;
    img{
      position: absolute;
      width:8px;
      height:8px;
      margin-left: -4px;
    }
  }
}
.evaluate_order_goods{
  @extend .flex_row;
  max-width:400px;
  height:62px;
  background:rgba(244,246,249,1);
  border:1px solid rgba(235, 235, 234, 1);
  border-radius:4px;
  color: #9B9B9B;
  font-weight: 14px;
  margin-bottom: 5px;
  img{
    width: 46px;
    height: 44px;
    margin: 9px;
  }
  .evaluate_good_msg{
    flex: 1;
    p{height: 25px;}
  }
}
.comment_area{
  max-width:360px;
  border:1px solid #E8E8E8;
  padding:20px;
  p{
    line-height:22px;
    color:#9B9B9B;
    img{
      width:46px;
      height: 44px;
      margin-right:8px;
    }
  }
}
</style>



