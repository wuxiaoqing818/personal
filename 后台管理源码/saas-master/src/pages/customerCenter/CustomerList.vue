<template>
  <div id="gm_customer_list" class="margin_main">
    <!-- 筛选条件 -->
    <div class="customer_list_condition">
        <div class="tag_list">
          <div class="radio_group">
            <div class="radio_group_common">
                <el-radio-group v-model="tag">
                  <el-radio-button label="a" style="margin-left:20px;">重点客户</el-radio-button>
                  <el-radio-button label="b">高净值客户</el-radio-button>
                  <el-radio-button label="c">自定义标签</el-radio-button>
                </el-radio-group>
            </div>
          </div>
          <!-- 展示筛选详情 -->
          <div class="condition_show" @click="showTag = !showTag">详细筛选<i class="el-icon-arrow-down"></i></div>
        </div>
        <!-- 详细筛选条件 -->
        <el-collapse-transition>
          <div v-show="showTag" style="margin-left:10px;">
             <div class="label_area_single">
                <label>归属门店：</label>
                <el-select v-model="shop">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="庆春店" value="a"></el-option>
                    <el-option label="宝龙店" value="b"></el-option>
                </el-select>
             </div>
             <div class="label_area_single">
                <label>服务者：</label>
                <el-select v-model="servicer">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="一一" value="a"></el-option>
                    <el-option label="二二" value="b"></el-option>
                </el-select>
             </div>
             <div class="label_area_single">
                <label>客户身份：</label>
                <el-select v-model="client">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="一一" value="a"></el-option>
                    <el-option label="二二" value="b"></el-option>
                </el-select>
             </div>
             <div class="label_area_single">
              <label>客户来源：</label>
              <el-select v-model="origin">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="一一" value="a"></el-option>
                  <el-option label="二二" value="b"></el-option>
              </el-select>
             </div>
             <div class="label_area_single">
              <label>上次消费：</label>
              <el-select v-model="lastTime">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1月内" value="a"></el-option>
                  <el-option label="3月内" value="b"></el-option>
              </el-select>
             </div>
             <div class="label_area_single">
              <label>消费周期：</label>
              <el-select v-model="cycle">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1月内" value="a"></el-option>
                  <el-option label="2月内" value="b"></el-option>
              </el-select>
             </div>
             <div class="label_area_single">
              <label>消费次数：</label>
              <el-select v-model="number">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="3次内" value="a"></el-option>
                  <el-option label="5次内" value="b"></el-option>
              </el-select>
             </div>
             <div class="label_area_single">
              <label>累计金额：</label>
              <el-select v-model="total">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1000以内" value="a"></el-option>
                  <el-option label="2000以内" value="b"></el-option>
              </el-select>
             </div>
              <div class="label_area_single">
                <label>客价单：</label>
                <el-select v-model="price">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="1000以内" value="a"></el-option>
                    <el-option label="2000以内" value="b"></el-option>
                </el-select>
             </div>
              <div class="label_area_single">
              <label>会员卡余额：</label>
              <el-select v-model="card">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1000以内" value="a"></el-option>
                  <el-option label="2000以内" value="b"></el-option>
              </el-select>
             </div>
              <div class="label_area_single">
              <label>积分：</label>
              <el-select v-model="point">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1000以内" value="a"></el-option>
                  <el-option label="2000以内" value="b"></el-option>
              </el-select>
             </div>
              <div class="label_area_single">
              <label>成长值：</label>
              <el-select v-model="grow">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="1000以内" value="a"></el-option>
                  <el-option label="2000以内" value="b"></el-option>
              </el-select>
             </div>
          </div>
        </el-collapse-transition>
    </div>
    <!-- 客户列表 -->
    <div class="customer_container container_normal">
        <el-tabs type="card">
          <el-tab-pane v-for="item in selectStatus" :label="item.value" v-model="item.code"></el-tab-pane>
        </el-tabs>
        <!-- 按钮以及全选 -->
        <div class="oper_btns">
          <el-checkbox class="all_check" v-model="checkAllFlag"  @change="checkAll">全选</el-checkbox>
          <el-button class="oper_btn" @click="makeTag">打标签</el-button>
          <el-button class="oper_btn" @click="sendMessage">发短信</el-button>
          <el-button class="oper_btn" @click="updateServicer">更改服务者</el-button>
        </div>
        <!-- table list -->
        <el-checkbox-group v-model="checkArr" @change="handleChecked">
         <el-table
          :data="tableData"
          tooltip-effect="dark"
          stripe
          style="width: 100%">
          <el-table-column
            width="180"
            align='center'
            label="客户信息">
            <template slot-scope="scope">
              <div class="client_area">
                <el-checkbox :key="scope.row.id" :label="scope.row.id" class="check_single"></el-checkbox>
                <div class="client_msg">
                  <div class="client_img">
                    <img :src="scope.row.img">
                    <img class="sex_icon" v-if='scope.row.sex == 1' src="@/assets/female_tip.png">
                    <img class="sex_icon" v-else src="@/assets/male_tip.png">
                  </div>
                  <div class="client_info">
                    <p>{{scope.row.name}}</p>
                    <p>{{scope.row.phone}}</p>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="timeIn"
            align='center'
            label="录入时间">
          </el-table-column>
          <el-table-column
            prop="identity"
            align='center'
            label="客户身份">
          </el-table-column>
          <el-table-column
            prop="firstTime"
            align='center'
            width="120"
            label="首次消费时间">
          </el-table-column>
          <el-table-column
            align='center'
            label="累计消费">
            <template slot-scope="scope">
              {{scope.row.totalCount}}次/{{scope.row.totalPrice}}元
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="本年消费">
            <template slot-scope="scope">
              {{scope.row.curyearCount}}次/{{scope.row.curyearPrice}}元
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            width="70"
            label="客单价">
            <template slot-scope="scope">
              {{scope.row.price}}元
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="会员卡余额">
            <template slot-scope="scope">
              {{scope.row.balance}}元
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="shop"
            label="归属门店">
          </el-table-column>
          <el-table-column
            align='center'
            width="80"
            prop="servicer"
            label="服务者">
          </el-table-column>
          <el-table-column
            align='center'
            label="备注"
            >
            <template slot-scope='scope'>
              <span>{{scope.row.remark}}</span>
              <i class="el-icon-edit-outline color_blue cursor" style="font-size:20px;" @click="updateRemark(scope.row.remark)"></i>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="操作">
            <template slot-scope="scope">
              <span class="color_blue cursor">详情</span>
              <span class="color_green cursor">开单</span>
            </template>
          </el-table-column>
         </el-table>
        </el-checkbox-group>
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
    <!-- 修改备注 弹框 -->
    <el-dialog
      title="修改备注"
      center
      :visible.sync="dialogVisibleUpdateRemark"
      width="30%">
       <el-input type="textarea" v-model="commont" maxlength="150" :rows="4"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdateRemark = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleUpdateRemark = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更改服务者 弹框 -->
    <el-dialog
      title="更改服务者"
      center
      :visible.sync="dialogVisibleUpdateServicer">
       <el-form :model="updateServicerForm" ref="updateServicerForm">
          <el-form-item label="归属门店:"  :label-width="formLabelWidth">
              <el-select v-model="updateServicerForm.shop">
                  <el-option label="庆春店" value="1"></el-option>
                  <el-option label="宝龙店" value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="服务者:"  :label-width="formLabelWidth">
              <el-select v-model="updateServicerForm.servicer">
                  <el-option label="小米" value="1"></el-option>
                  <el-option label="小明" value="2"></el-option>
              </el-select>
          </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdateServicer = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleUpdateServicer = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发送短信 弹框 -->
    <el-dialog
      title="发送短信"
      center
      :visible.sync="dialogVisibleSendMessage">
       <el-form :model="sendMessageForm" ref="sendMessageForm">
          <el-form-item label="选择模版:"  placeholder=“请选择短信模版” :label-width="formLabelWidth">
              <el-select v-model="sendMessageForm.module">
                  <el-option label="模版一" value="1"></el-option>
                  <el-option label="模版二" value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="自定义:"  :label-width="formLabelWidth">
              <el-input type="textarea" v-model="sendMessageForm.self" placeholder='自定义' maxlength="150" :rows="4"></el-input>
              <p>说明：自定义内容需要审核通过才能发送，需1-3个工作日。</p>
          </el-form-item>
          <el-form-item label="发送时间:"  :label-width="formLabelWidth">
              <el-radio-group v-model="sendMessageForm.time">
                <el-radio :label="1">立即发送</el-radio>
                <el-radio :label="2">指定时间：
                  <el-date-picker
                    v-model="sendMessageForm.timeValue"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-radio>
              </el-radio-group>
          </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSendMessage = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleSendMessage = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 打标签 弹框  -->
    <el-dialog
      center
     :visible.sync="dialogVisibleMakeTag">
      <div class="checkbox_area">
        <el-checkbox-group
          v-model="checkedTags">
          <el-checkbox v-for="item in tagList" :label="item.tag" :key="item.tag">{{item.tag}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-input v-model="newTag" placeholder="请输入标签名称" style="max-width:200px;margin-left:40px;"></el-input>
      <el-button type="primary">新增</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleMakeTag = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleMakeTag = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'GmCustomerList',
  data (){
    return{
        formLabelWidth:'120px',
        //修改备注
        dialogVisibleUpdateRemark:false,
        commont:'',
        // 更改服务者
        dialogVisibleUpdateServicer:false,
        updateServicerForm:{
          shop:'1',
          servicer:'1'
        },
        // 发短信
        dialogVisibleSendMessage:false,
        sendMessageForm:{
          module:"",
          self:'',
          time:'',
          timeValue:''
        },
        // 打标签
        dialogVisibleMakeTag:false,
        checkedTags:[],
        newTag:"",
        tagList:[
          {id:1,tag:'标签1'},
          {id:2,tag:'标签2'},
          {id:3,tag:'标签3'},
          {id:4,tag:'标签4'},
          {id:5,tag:'标签5'},
          {id:6,tag:'标签11'},
          {id:7,tag:'标签21'},
          {id:8,tag:'标签31'},
          {id:9,tag:'标签41'},
          {id:10,tag:'标签51'}
        ],
        // 全选
        checkAllFlag:false,
        checkArr:[],
        isCheckedAll:false,
        CheckedAllArr:[],
        //
        totalCount:100,
        currentPage:1,
        pageSize:10,
        tag:'a',
        showTag:false,
        shop:'',
        servicer:'',
        client:'',
        origin:'',
        lastTime:'',
        cycle:'',
        number:'',
        total:'',
        price:'',
        card:'',
        point:'',
        grow:'',
        selectStatus:[
          {code:'',value:'全部'},
          {code:'A',value:'TOP100'},
          {code:'B',value:'静止客'},
          {code:'C',value:'未消费'},
          {code:'D',value:'女性顾客'}
        ],
        tableData:[{
          id:1,
          img:require('@/assets/kehu_logo.png'),
          name:'林小美',
          sex:1,
          phone:'12345567777',
          timeIn:'2018/10/29 20:40',
          identity:'金卡会员',
          firstTime:'2018/10/29 20:40',
          totalCount:"3",
          totalPrice:'5324',
          curyearCount:'2',
          curyearPrice:"5000",
          price:'958',
          balance:'2592',
          shop:'暴龙城店',
          servicer:'Tony',
          remark:'需要重点跟进'
        },{
          id:2,
          img:require('@/assets/kehu_logo.png'),
          name:'林小美',
          sex:0,
          phone:'12345567777',
          timeIn:'2018/10/29 20:40',
          identity:'金卡会员',
          firstTime:'2018/10/29 20:40',
          totalCount:"3",
          totalPrice:'5324',
          curyearCount:'2',
          curyearPrice:"5000",
          price:'958',
          balance:'2592',
          shop:'暴龙城店',
          servicer:'Tony',
          remark:'需要跟进'
        }]
    }
  },
  mounted(){
      this.setCheckedAllArr()
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 全选/复选
    handleChecked(){
        this.isCheckedAll = this.checkArr.length == this.tableData.length;
				this.checkAllFlag = this.checkArr.length == this.tableData.length;
    },
    checkAll(event){
      console.log(this.checkAllFlag)
      this.checkArr = this.checkAllFlag ? this.CheckedAllArr : [];
      // this.checkArr = event.target.checked ? this.CheckedAllArr : [];
    },
    setCheckedAllArr(){
      let arr = [];
      this.tableData.forEach((item,index)=>{
        this.CheckedAllArr.push(item.id);
      })
    },
    // 修改备注
    updateRemark(remark){
      this.commont = remark
      this.dialogVisibleUpdateRemark = true
    },
    // 修改服务者
    updateServicer(){
      this.dialogVisibleUpdateServicer = true
    },
    // 发送短信
    sendMessage(){
      this.dialogVisibleSendMessage = true
    },
    // 打标签
    makeTag(){
      this.dialogVisibleMakeTag = true
    }
  }
}
</script>

<style lang="scss">
  #gm_customer_list .tag_list{
    // .el-radio-button__inner{
    //   background:rgba(196,199,205,1);
    //   color: #fff;
    // }
    // .el-radio-button{
    //   margin-left: 20px;
    // }
  }
  #gm_customer_list .client_area .el-checkbox__label{
    display: none;
  }
  #gm_customer_list{
    .checkbox_area{
       .el-checkbox{
          width: 100px;
          margin-left: 20px;
          margin-bottom:15px;
       }
    }
  }
</style>

<style lang="scss" scoped>
.color_blue{
  color:#409EFF;
}
.color_green{
  color:#67C23A;
}
.cursor{
  cursor:pointer;
}
#gm_customer_list{
  .label_area_single label{
    width:100px !important;
    text-align:right;
    display: inline-block;
  }
  .customer_list_condition{
    background-color:#fff;
  }
  .tag_list{
    min-height: 74px;
    display: flex;
    align-items:center;
    .radio_group{
      flex:1;
    }
    .condition_show{
      font-size:14px;
      margin:0 20px;
      cursor:pointer;
      i{
        font-size:14px;
        margin-left:10px;
      }
    }
  }
  .oper_btns{
    margin-bottom:20px;
    .all_check{
      margin-left:15px;
      margin-right:20px;
      font-size:14px;
    }
    .oper_btn{
    }
  }
  .client_area{
    display: flex;
    .check_single{
      margin:0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .client_msg{
      display: flex;
      align-items:center;
       .client_img{
          margin-left:5px;
          margin-right:15px;
          position: relative;
       }
       .client_info{
         p{text-align:left;}
       }
      img{
        width:30px;
        height:30px;
        border-radius:50%;
        vertical-align: middle;
      }
      .sex_icon{
        position: absolute;
        width:14px;
        height: 14px;
        left:22px;
        top:0;
      }
      span{
        display: inline-block;
        margin-left:5px;
      }
    }
  }
  .checkbox_area{
    margin:20px;
  }
}
</style>


