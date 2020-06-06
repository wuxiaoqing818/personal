<template>
    <div id="gm_service_detail">
       <!-- 顶部header-->
        <div class="full_header">
          <div class="full_header_container">
              <div class="header_left">
                  <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                  <p class="header_title">订单详情</p>
              </div>
              <div class="header_right">
              </div>
          </div>
        </div>
        <!-- container -->
        <div class="full_container">
            <!-- 订单详情 -->
            <div class="order_detail">
              <div class="area_title">订单详情</div>
              <div class="order_status">{{order.status | orderStatusName}}</div>
              <div class="order_msg">
                <p>
                  <span>订单编号：{{order.orderNo}}</span>
                  <span>开单时间：{{order.time}}</span>
                  <span>开单门店：{{order.shop}}</span>
                </p>
                <p>
                  <span>开单人：{{order.servicer}}</span>
                  <span>是否约单：{{order.isOrder ? "是":"否"}}</span>
                  <span>是否指定手艺人：{{order.isChooseServicer ? "是":"否"}}</span>
                </p>

                <!-- 取消状态 -->
                <p v-if='order.status=="CANCEL"'>
                  <span>取消时间：{{order.time}}</span>
                  <span>取消理由：客户未消费</span>
                  <span>取消人：小丽（前台）</span>
                </p>
                <p v-if='order.status=="CANCEL"'>取消备注：{{order.hairdresser}}</p>
                <!-- 取消状态 end -->

                <p v-if='order.status!=="CANCEL" && order.status!=="WAIT_PAY"'>
                  <span>付款时间：{{order.time}}</span>
                  <span>付款来源：线上支付</span>
                  <span>付款方式：支付宝</span>
                </p>
                <p v-if='order.status!=="CANCEL" && order.status!=="WAIT_PAY"'>
                  <span>获赠积分：20</span>
                  <span>获得成长值：4</span>
                </p>

                <p>发型师备注：{{order.hairdresser}}</p>
                <p>前台备注：{{order.reception}}</p>
                <div class="add_remark">
                  <el-button @click="addNewRemark">添加备注</el-button>
                </div>
              </div>
            </div>
            <!-- 消费客户 -->
            <div class="consume_client">
                 <div class="area_title">消费客户</div>
                 <div class="client_area">
                    <!-- 会员客户 -->
                    <div class="client_item">
                      <img src="@/assets/head_icon.png">
                      <div class="client_msg">
                        <p>
                          <span>林小美</span>
                          <!-- 待付款状态 -->
                          <i v-if='order.status=="WAIT_PAY"' class="el-icon-edit-outline color_blue"></i>
                          <i v-if='order.status=="WAIT_PAY"' class="el-icon-delete color_red"></i>
                          <!-- end -->
                        </p>
                        <p>手机号：18423974895</p>
                      </div>
                    </div>
                    <!-- 散客 -->
                    <div class="client_item">
                      <img src="@/assets/client_default.png">
                      <div class="client_msg">
                        <p>
                          <span>散客</span>
                          <!-- 待付款状态 -->
                          <i v-if='order.status=="WAIT_PAY"' class="el-icon-edit-outline color_blue"></i>
                          <i v-if='order.status=="WAIT_PAY"' class="el-icon-delete color_red"></i>
                          <!-- end -->
                        </p>
                      </div>
                    </div>
                    <!-- 按钮 -->
                    <!-- 待付款状态 -->
                    <div class="add_client" v-if='order.status=="WAIT_PAY"'>
                      <el-button>新增<i class="el-icon-circle-plus-outline" style="margin-left:14px;"></i></el-button>
                    </div>
                    <!-- 待付款状态 end-->
                 </div>
            </div>
            <!-- 评价记录 已评价 -->
            <div class="evaluate_record" v-if="order.status=='EVALUATE'">
                 <div class="area_title">评价记录</div>
                 <!-- 评价框 -->
                 <div class="evaluate_area">
                    <el-form ref="evaluateForm">
                      <el-form-item label="总体评分:" :label-width="formLabelWidth">
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
                      <el-form-item  label="评论正文:" :label-width="formLabelWidth">
                          <div class="comment_area">
                              <p>{{evaData.comment.content}}</p>
                              <p>{{evaData.comment.time}}</p>
                              <p>
                                <img v-for='item in evaData.comment.imgList' :src="item.img">
                              </p>
                          </div>
                      </el-form-item>

                      <el-form-item  label="商家回复:" :label-width="formLabelWidth">
                          <div class="comment_area">
                              <p>{{evaData.comment.content}}</p>
                              <p>{{evaData.comment.time}}</p>
                          </div>
                      </el-form-item>
                      <el-form-item  label="给客户回复:" :label-width="formLabelWidth">
                          <el-input type="textarea" v-model="commont" placeholder="请输入给客户的留言(不超过150字)" maxlength="150" :rows="4" style="max-width:600px;"></el-input>
                          <el-button type="primary" style="margin-left:50px;">回复</el-button>
                      </el-form-item>
                    </el-form>
                 </div>
            </div>
            <!-- 退款记录 -->
            <div class="refund_record" v-if="order.status=='REFUND' || order.status=='REFUND_FIN'">
              <div class="area_title">退款记录</div>
              <!-- table -->
              <div class="refund_table">
                <el-table :data="refundData"
                stripe>
                  <el-table-column
                    prop='payNo'
                    label="退款编号">
                  </el-table-column>
                  <el-table-column
                    prop='time'
                    label="申请时间">
                  </el-table-column>
                  <el-table-column
                    label="申请退款金额">
                    <template slot-scope="scope">¥{{scope.row.total}}</template>
                  </el-table-column>
                  <el-table-column
                    label="退款理由">
                    <template slot-scope="scope">
                      {{scope.row.reason}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="核准退款金额">
                    <template slot-scope="scope">
                      <span>¥{{scope.row.realTotal}}</span>
                      <i v-if='order.status == "REFUND"' class="el-icon-edit-outline color_blue"></i>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="people"
                    label="核准人">
                  </el-table-column>
                  <!-- 退款中 状态 -->
                  <el-table-column
                    align="center"
                    label="操作"
                    v-if='order.status == "REFUND"'>
                    <template slot-scope="scope">
                      <span class="color_blue">回复客户</span>
                    </template>
                  </el-table-column>
                  <!-- 退款中 end -->
                  <!-- 退款完成 状态 -->
                  <el-table-column
                    prop="time"
                    label='退款时间'
                    v-if='order.status == "REFUND_FIN"'>
                  </el-table-column>
                  <!-- 退款中 end -->
                </el-table>
              </div>
              <!-- 按钮 -->
              <!-- 退款中 状态 -->
              <div class="item_btns" v-if="order.status == 'REFUND'">
                <el-button @click="refuseRefund">拒绝退款</el-button>
                <el-button @click="updateRefund">修改退款</el-button>
                <el-button type="primary">退款</el-button>
              </div>
              <!-- 退款中 end -->
            </div>
            <!-- 订单明细 -->
            <div class="order_items">
                <div class="area_title">订单明细</div>
                <!-- 明细 table -->
                <div class="items_table">
                    <el-table
                      :data="tableData"
                      stripe>
                      <el-table-column
                        label="服务项目"
                        width="300">
                        <template slot-scope="scope">
                          <div class='item_service'>
                            <img :src="scope.row.img">
                            <div class="service_msg">
                              <p class="ser_name">{{scope.row.name}}</p>
                              <p>
                                <span>{{scope.row.shop}}</span>
                                <!-- 待付款状态 -->
                                <i v-if='order.status=="WAIT_PAY"' class="el-icon-edit-outline color_blue"></i>
                                <i v-if='order.status=="WAIT_PAY"' class="el-icon-delete color_red"></i>
                                <!-- 待付款状态 end-->
                              </p>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="发型师"
                        align='center'>
                        <template slot-scope="scope">
                          <span>{{scope.row.seriver}}</span>
                          <i v-if='order.status!=="CANCEL"' class="el-icon-edit-outline color_blue"></i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="助理"
                        align='center'>
                        <template slot-scope="scope">
                          <span>{{scope.row.assistant}}</span>
                          <i v-if='order.status!=="CANCEL"' class="el-icon-edit-outline color_blue"></i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="助理"
                        align='center'>
                        <template slot-scope="scope">
                          <span>{{scope.row.assistant}}</span>
                          <i v-if='order.status!=="CANCEL"' class="el-icon-edit-outline color_blue"></i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="单价"
                        align='center'>
                        <template slot-scope="scope">
                          <span>{{scope.row.price}}元</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop='count'
                        label="数量"
                        align='center'>
                      </el-table-column>
                      <el-table-column
                        label="金额"
                        align='center'>
                        <template slot-scope="scope">
                          <span>{{scope.row.total}}元</span>
                        </template>
                      </el-table-column>
                    </el-table>
                </div>
                <!-- 价格 -->
                <div class="price_discount_total">
                  <p><span>合计：</span><i>29032元</i></p>
                  <p><span>会员折后价：</span><i>290元</i></p>
                  <p><span>红包优惠：</span><i class="color_price">-20元</i></p>
                  <p><span>优惠券优惠：</span><i class="color_price">-20元</i></p>
                  <p><span>积分抵扣：</span><i class="color_price">-20元</i></p>

                  <!-- 待付款状态  -->
                  <p class="real_price" v-if='order.status=="WAIT_PAY"'><span>应付款：</span><i class="color_price">230元</i></p>
                  <!-- end -->

                  <p class="real_price" v-if='order.status!=="WAIT_PAY"'><span>实付款：</span><i class="color_price">230元</i></p>


                </div>
                <!-- 按钮 -->
                <!-- 待付款状态 -->
                <div class="item_btns" v-if='order.status=="WAIT_PAY"'>
                  <el-button @click="cancelOrder">取消订单</el-button>
                  <el-button type="primary">收款</el-button>
                </div>
                <!-- 待付款状态 end -->

                <!-- 已完成状态 -->
                <div class="item_btns" v-if='order.status=="FINISH"'>
                  <el-button>修改手艺人</el-button>
                  <el-button type="paimary">邀请评价</el-button>
                </div>
                <!-- 已完成状态 end -->

                <!-- 退款中状态 -->
                <div class="item_btns" v-if='order.status=="REFUND" || order.status=="REFUND_FIN" || order.status=="EVALUATE"'>
                  <el-button>修改手艺人</el-button>
                </div>
                <!-- 退款中状态 end -->


            </div>
            <!-- 交易流水  待付款和已取消没有-->
            <div class="running_account" v-if='order.status!=="WAIT_PAY" && order.status!=="CANCEL"'>
              <div class="area_title">交易流水</div>
              <!-- table -->
              <div class="account_table">
                <el-table
                  :data="accountData"
                  stripe>
                  <el-table-column
                    prop='payNo'
                    label="支付流水号">
                  </el-table-column>
                  <el-table-column
                    prop='origin'
                    label="付款来源">
                  </el-table-column>
                  <el-table-column
                    prop='payWay'
                    label="付款方式">
                  </el-table-column>
                  <el-table-column
                    label="实收金额">
                    <template slot-scope="scope">¥{{scope.row.total}}</template>
                  </el-table-column>
                  <el-table-column
                    prop='otherNo'
                    label="第三方支付订单号">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 退款交易流水  退款完成-->
            <div class="refund_running_account" v-if='order.status=="REFUND_FIN"'>
              <div class="area_title">退款交易流水</div>
              <!-- table -->
              <div class="account_table">
                <el-table
                  :data="accountData"
                  stripe>
                  <el-table-column
                    prop='payNo'
                    label="退款流水号">
                  </el-table-column>
                  <el-table-column
                    prop='origin'
                    label="退款来源">
                  </el-table-column>
                  <el-table-column
                    prop='payWay'
                    label="退款方式">
                  </el-table-column>
                  <el-table-column
                    label="退款金额">
                    <template slot-scope="scope">¥{{scope.row.total}}</template>
                  </el-table-column>
                  <el-table-column
                    prop='otherNo'
                    label="第三方支付退款编号">
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </div>
        <!-- 弹窗 -->
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
            <el-button type="primary" @click="dialogVisibleUpdate = false">确 定</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
  name:'GmServiceDetail',
  data(){
    return{
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
        formLabelWidth:'120px',
        commont:'',
        order:{
          // status:'WAIT_PAY',
          // status:'CANCEL',
          // status:'FINISH',
          // status:"REFUND",
          // status:'REFUND_FIN',
          status:'EVALUATE',
          orderNo:'J32490328759872498579283',
          time:'2018-12-23 12:23:21',
          shop:'杭州 滨江宝龙城店',
          servicer:'tony',
          isOrder:1,
          isChooseServicer:1,
          hairdresser:'客户很重要，记得服务好',
          reception:'哈哈哈'
        },
        tableData:[{
          name:'高级烫染+洗吹洗护',
          shop:'杭州滨江店',
          img:require('@/assets/ser_logo.png'),
          seriver:'tony',
          assistant:"小红",
          price:'233',
          count:1,
          total:'233'
        }],
        accountData:[{
          payNo:'Z787987098787',
          origin:'前台收款',
          payWay:'支付宝',
          total:'377.89',
          otherNo:'ZSD9127e87397928391'
        }],
        refundData:[{
          payNo:'Z787987098787',
          time:'2018-12-10 12:22:22',
          total:'377.89',
          realTotal:'300.89',
          reason:'发型师态度不好',
          people:'小红'
        }],
        evaData:{
          evaStatus:'NORMAL',//WAIT未回复 TIMEOUT超时 NORMAL
          orderNo:'j3294823041029138',
          grade:3,
          itemList:[{
            img:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/29.jpg?1',
            name:'高级烫染+造型定制',
            person:'tony',
            shop:'杭州滨江店'
          },{
            img:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/29.jpg?3',
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
    }
  },
  filters: {
    orderStatusName:function(val){
      switch(val){
        case 'WAIT_PAY':
        return "待付款"
        break;
        case 'EVALUATE':
        return "已评价"
        break;
        case 'FINISH':
        return "已完成"
        break;
        case 'REFUND':
        return "退款中"
        break;
        case 'REFUND_FIN':
        return "退款完成"
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
    back(){
      this.$router.go(-1);
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
  }
}
</script>

<style lang="scss">
  #gm_service_detail .el-table__body-wrapper {
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  #gm_service_detail .el-rate{
    line-height:2.5;
  }
</style>

<style lang="scss" scoped>
    .color_blue{
      color:#4AA8FF;
      cursor: pointer;
    }
    .color_red{
      color:#E84C55;
      cursor: pointer;
    }
    .color_price{
      color:#E6333F;
    }
    .area_title{
      font-size:20px;
      margin-bottom: 40px;
    }
    .full_container>div{
      background: #fff;
      padding: 40px 20px 40px 40px;
      box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
      border-radius:6px;
      margin-bottom: 20px;
    }
    .order_detail{
      .order_status{
        font-size:18px;
        color: #E6A23C;
        margin-bottom: 5px;
      }
      .order_msg{
        p{
          display: flex;
          padding-top: 18px;
          color: #3A3A3A;
          font-size: 14px;
          span{
            flex: 1;
            max-width: 400px;
          }
        }
        .add_remark{
          text-align: right;
        }
      }
    }
    .consume_client{
      .client_area{
        display: flex;
      }
      .client_item{
        flex: 1;
        // max-width: 450px;
        display: flex;
        img{
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .client_msg{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          color:rgba(58,58,58,1);
          p{
            span{
              display: inline-block;
              margin-right: 15px;
            }
            i{
              cursor: pointer;
              font-size: 14px;
            }
          }
        }
      }
    }
    .order_items{
      .items_table{
        .item_service{
          display: flex;
          img{
            width:64px;
            height:62px;
            margin-right: 15px;
          }
          .service_msg{
            display: flex;
            flex-direction: column;
            .ser_name{
              flex: 1;
            }
          }
        }
      }
      .price_discount_total{
        margin-top:40px;
        padding-right:45px;
        p{
          padding:5px 0;
          font-size:14px;
          color:#3A3A3A;
          text-align:right;
          span{
            text-align:left;
            width:100px;
            display: inline-block;
          }
          i{
            font-style:normal;
            min-width:80px;
            display: inline-block;
          }
        }
        .real_price{
          i{font-size:22px;}
        }
      }
    }
    .evaluate_area{
      img{
        width: 46px;
        height: 44px;
        margin: 9px;
      }
    }
    .item_btns{
        text-align:right;
        margin-right:40px;
        margin-top:20px;
      }
</style>


