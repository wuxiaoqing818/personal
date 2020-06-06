<template>
  <div id="gm_appo_list" class="margin_main">
    <!-- 列表筛选条件 -->
    <div class="appo_list_condition">
      <!-- 左侧筛选 -->
      <div class="condition_left">
        <label>到店时间：</label>
        <el-radio-group v-model="arrivalTime">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="tomorrow">明天</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!-- 右侧搜索 -->
      <div class="condition_right">
        <el-input placeholder="请输入到店人手机号" class="con_phone"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="appo_list_container">
        <el-tabs type="card">
          <el-tab-pane v-for="item in orderStatus" :label="item.value" v-model="item.code"></el-tab-pane>
        </el-tabs>
        <el-table
          :data="tableData"
          stripe
          class="appo_table">
          <el-table-column
            label="预约人"
          >
            <template slot-scope="scope">
              <span class="table_imgs">
                <img :src="scope.row.pic" class="img_head">
                <img src="@/assets/female_tip.png" class="img_sex">
              </span>
              <span class="tables_name">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="预约服务"
            >
            <template slot-scope="scope">
              <p v-for="item in scope.row.service">{{item.name}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="手艺人">
            <template slot-scope="scope">
              <p v-for="item in scope.row.service">{{item.person}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="预约到店时间">
          </el-table-column>
          <el-table-column
            prop="shop"
            label="预约门店">
          </el-table-column>
          <el-table-column
            label="预约金"
            width='80'>
            <template slot-scope="scope">
              {{scope.row.priceBefore}}元
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width='80'>
          </el-table-column>
          <el-table-column
            prop="lastTime"
            label="上次服务时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <span class='oper blue' @click="getDeatil(scope.index)">详情</span>
              <span class='oper green'>开单</span>
              <span class='oper red' @click="cancelOrder(scope.index)">取消</span>
            </template>
          </el-table-column>
        </el-table>
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
    <!-- 取消预约弹窗 -->
    <el-dialog title="取消预约" :visible.sync="dialogVisibleCancel" center>
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
    <!-- 预约详情弹窗 -->
    <el-dialog title="预约详情" :visible.sync="dialogVisibleDeatil" center>
        <el-form :model="form" ref='form'>
        <el-form-item label="预约状态:" :label-width="formLabelWidth">
          <span>待服务</span>
        </el-form-item>
        <el-form-item label="预约门店:" :label-width="formLabelWidth">
          <span>{{form.shop}}</span>
        </el-form-item>
        <el-form-item label="预约客户:" :label-width="formLabelWidth" class="abreast_item">
          <el-input v-model="form.name"></el-input>
          <el-select v-model="form.sex">
            <el-option :value="1">男</el-option>
            <el-option :value="0">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth" class="abreast_item">
          <el-input v-model="form.phone"></el-input>
          <span>查看客户资料</span>
        </el-form-item>
        <el-form-item label="预约到店时间:" :label-width="formLabelWidth">
            <el-date-picker
            v-model='form.date'
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
          <el-time-select
            v-model='form.time'
            :picker-options="{
              start: '10:00',
              step: '00:30',
              end: '22:00'
            }"
            placeholder="请选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="服务和手艺人:" :label-width="formLabelWidth" prop="service">
          <!-- 动态添加 -->
          <div class="service_item" v-for="(item,key) in form.service">
            <el-select v-model="item.name" placeholder="请选择服务">
              <el-option label="服务1" value="s1"></el-option>
              <el-option label="服务2" value="s2"></el-option>
            </el-select>
            <el-select v-model="item.person" placeholder="请选择手艺人">
              <el-option label="小红" value="p1"></el-option>
              <el-option label="小明" value="p2"></el-option>
            </el-select>
            <i class="el-icon-delete" @click="removeService(key)"></i>
          </div>
          <!-- end -->
        </el-form-item>
        <!-- 新增 -->
        <el-form-item label="" :label-width="formLabelWidth">
            <el-button @click="addNewService">添加</el-button>
        </el-form-item>
        <el-form-item label="预约金:" :label-width="formLabelWidth">
            <span>30元</span>
        </el-form-item>
        <el-form-item label="客户备注:" :label-width="formLabelWidth">
            <span>30元</span>
        </el-form-item>
        <el-form-item label="前台备注:" :label-width="formLabelWidth">
            <span>30元</span>
        </el-form-item>
        <el-form-item label="发型师备注:" :label-width="formLabelWidth">
            <span>30元</span>
        </el-form-item>
        <el-form-item label="添加备注:" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.desc" placeholder="请输入备注内容(不超过150字)" maxlength="150" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">修改预约</el-button>
        <el-button>取消预约</el-button>
        <el-button>快速开单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'GmAppoList',
  data(){
    return {
      arrivalTime:'today',
      timeValue:'',
      totalCount:100,
      currentPage:1,
      pageSize:10,
      dialogVisibleCancel:false,
      formLabelWidth:'120px',
      dialogVisibleDeatil:false,
      cancelForm:{
        reason:'',
        desc:''
      },
      form:{
        phone:'17687767889',
        name:'222',
        shop:'ssd',
        date:'2018-10-19',
        time:'10:30',
        desc:'',
        sex:1,
        service:[
          {name:'s1',person:'p2'},
          {name:'s2',person:'p1'}
        ]
      },
      orderStatus: [
        {code:'',value:'全部'},
        {code:'WAITING',value:'待服务'},
        {code:'START',value:'已开单'},
        {code:'TIMEOUT',value:'已超时'},
        {code:'FINISH',value:'已完成'},
        {code:'CANCEL',value:'已取消'}
      ],
      tableData: [{
        id:'1001',
        name:'林小美',
        pic:require('@/assets/head_icon.png'),
        sex:1,
        service:[
          {
              name:'服务名称1',
              person:'手艺人1'
          },
          {
              name:'服务名称2',
              person:'手艺人3'
          }
        ],
        time:'2018/10/19 10:00',
        shop:'总部',
        priceBefore:'200',
        isPay:1,
        remark:'就尽可能快',
        status:'WAITING',
        lastTime:'2018/10/23 10:30'
      },
      {
        id:'1002',
        name:'林小美',
        pic:require('@/assets/head_icon.png'),
        sex:1,
        service:[
          {
              name:'服务名称1',
              person:'手艺人1'
          }
        ],
        time:'2018/10/19 10:00',
        shop:'门店',
        priceBefore:'200',
        isPay:1,
        remark:'就尽可能快',
        status:'WAITING',
        lastTime:'2018/10/23 10:30'
      }]
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
    // 取消
    cancelOrder(key){
      console.log(key)
      this.dialogVisibleCancel = true
    },
    //详情
    getDeatil(key){
      console.log(key)
      this.dialogVisibleDeatil = true
    },
     // 新增服务
    addNewService(){
      this.form.service.push({
          name:'' ,
          person:''
       })
    },
    // 删除服务
    removeService(key){
      console.log(key)
      this.form.service.splice(key, 1);
    },
  }
}
</script>

<style lang="scss">
  #gm_appo_list {
    // .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    //   color: #fff;
    //   background-color: #409EFF;
    //   border-color: #409EFF;
    //   -webkit-box-shadow: -1px 0 0 0 #409EFF;
    //   box-shadow: -1px 0 0 0 #409EFF;
    // }
    // .el-radio-button__inner:hover{
    //   color: #409EFF
    // }
    // .el-radio-button__inner{
    //     border: none;
    //     background: transparent;
    //     border-radius: 4px;
    // }
    // .el-tabs--card > .el-tabs__header .el-tabs__nav{
    //      border-radius:0;
    //      border-color: #EBEBEA;
    //      border-left: none;
    //      border-top: none;
    //      color: #333333;
    // }
    .abreast_item{
      .el-select,.el-input{
        width: 49%;
        max-width: 196px;
      }
      .el-select{
        .el-input{
          width: 100%;
        }
      }
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
.oper{
  cursor:pointer;
}
.blue{
  color:#409EFF;
}
.green{
  color:#67C23A;
}
.red{
  color:#E22C37;
}
.appo_list_condition{
  @extend .flex_row;
  label{font-size: 14px;}
  .condition_left{
    flex:1;
  }
  .condition_right{
    margin-right:40px;
    .con_phone{
      width:180px;
    }
  }
}
.appo_list_container{
  border:1px solid rgba(235, 235, 234, 1);
  border-radius:0px 0px 6px 6px;
  background-color:#fff;
  margin-top:20px;
  .appo_table{
    margin:0 20px;
    width:auto;
  }
  .table_imgs{
    position: relative;
    display: inline-block;
    vertical-align:middle;
  }
  .img_head{
    width:30px;
    height: 30px;
    border-radius:50%;
    display: inline-block;
  }
  .img_sex{
    width:14px;
    height: 14px;
    position: absolute;
    right:-7px;
    top:0;
  }
  .tables_name{
    display: inline-block;
    margin-left:8px;
  }
}
</style>

