<template>
  <div id="gm_recycle">
      <div class="appo_submenu">
        <div class="tabs">
          <span class="router-link-active">商品回收站</span>
        </div>
      </div>
      <!-- 主页面 -->
      <div class="recycle_container margin_main">
          <div class="select_condition">
            <div class="label_area_single">
              <label>隶属门店：</label>
              <el-select v-model="shop">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="庆春店" value="a"></el-option>
                  <el-option label="宝龙店" value="b"></el-option>
              </el-select>
            </div>
            <!-- 去回收站 -->
            <div>
              <el-input placeholder="请输入订单号" class="con_phone" style='width:220px;' v-model="search"></el-input>
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          <!--   服务列表 -->
          <div class="service_list_container container_normal" style="margin-top:10px;">
            <el-tabs type="card">
              <el-tab-pane v-for="item in selectStatus" :label="item.value" v-model="item.code"></el-tab-pane>
            </el-tabs>
            <!-- 按钮以及全选 -->
            <div class="service_operation">
              <div class="oper_btns">
                <el-checkbox class="all_check" v-model="checkAllFlag"  @change="checkAll">全选</el-checkbox>
                <el-button class="oper_btn" @click="makeTag">打标签</el-button>
                <el-button class="oper_btn">上架</el-button>
              </div>
            </div>
            <!-- table list -->
            <el-checkbox-group v-model="checkArr" @change="handleChecked">
              <el-table
              :data="tableData"
              tooltip-effect="dark"
              stripe
              style="width: 100%">
              <el-table-column
                align="right"
                label="排序"
                width="100">
                <template slot-scope="scope">
                  <div class="sort_area">
                    <el-checkbox :key="scope.row.id" :label="scope.row.id" class="check_single"></el-checkbox>
                    <el-input v-model="scope.row.sort"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                width="270"
                label="服务项目">
                <template slot-scope="scope">
                  <div class="service_msg">
                    <div class="service_img">
                      <img :src="scope.row.img">
                    </div>
                    <div class="service_info">
                      <p class="ser_name">{{scope.row.name}}</p>
                      <p class="ser_code">{{scope.row.number}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
              label="服务时长"
              prop="time">
              </el-table-column>
              <el-table-column
              label="单价">
                <template slot-scope="scope">
                  ¥{{scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column
              label="销量"
              prop="sales">
              </el-table-column>
              <el-table-column
              label="删除时间"
              prop="onTime">
              </el-table-column>
              <el-table-column
              label="状态">
                  <template slot-scope="scope">
                    <span>删除</span>
                  </template>
              </el-table-column>
                <el-table-column
              label="促销">
                  <template slot-scope="scope">
                   <span>无</span>
                  </template>
              </el-table-column>
              <el-table-column
              label="作品数"
              prop="proNum">
              </el-table-column>
              <el-table-column
              label="评价得分"
              prop="rate">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="140">
                <template slot-scope="scope">
                  <p class="oper_p">
                    <span class="color_blue cursor">恢复</span>
                    <span class="color_red cursor">永久删除</span>
                  </p>
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
      </div>
      <!-- 打标签弹窗 -->
      <el-dialog
        center
        :visible.sync="dialogVisibleMakeTag">
        <div class="checkbox_area">
          <el-checkbox-group
            v-model="checkedTags">
            <el-checkbox v-for="item in tagList" :label="item.tag" :key="item.tag">{{item.tag}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-input v-model="newTag" placeholder="请输入标签名称" style="max-width:200px;margin-left:40px;margin-top:20px;"></el-input>
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
  name:'GmRecycle',
  data(){
    return{
      shop:'',
      search:'',
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
      selectStatus:[
        {code:'A',value:'服务'},
        {code:'B',value:'产品'},
        {code:'C',value:'卡项'},
        {code:'D',value:'套餐'}
      ],
      // 表格数据
      tableData:[{
        id:1,
        sort:1,
        img:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/28.jpg',
        name:'高级烫染+洗吹洗护',
        number:'p20374823795723',
        time:'60分钟',
        price:'125',
        sales:'123',
        onTime:'2018/10/20 17：30',
        isOnline:1,
        isShow:1,
        isRecommend:0,
        isCoupon:1,
        promotion:'秒杀',
        proNum:123,
        rate:3.5
      },{
        id:2,
        sort:12,
        img:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/27.jpg',
        name:'高级烫染+洗吹洗护',
        number:'p20374823795723',
        time:'60分钟',
        price:'125',
        sales:'123',
        onTime:'2018/10/20 17：30',
        isOnline:0,
        isShow:1,
        isRecommend:0,
        isCoupon:0,
        promotion:'拼团',
        proNum:123,
        rate:3.5
      },{
        id:3,
        sort:121,
        img:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/26.jpg',
        name:'高级烫染+洗吹洗护',
        number:'p20374823795723',
        time:'60分钟',
        price:'125',
        sales:'123',
        onTime:'2018/10/20 17：30',
        isOnline:0,
        isShow:0,
        isRecommend:1,
        isCoupon:1,
        promotion:'',
        proNum:123,
        rate:3.5
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
    // 打标签
    makeTag(){
      this.dialogVisibleMakeTag = true
    },
  }
}
</script>
<style lang="scss">
#gm_recycle{
  .el-radio-button__inner{
    margin-bottom: 10px;
  }
  .type_set .el-button{
    height: 30px;
    padding: 8px 20px;
    margin-right: 20px;
  }
  .sort_area{
    display: flex;
    .el-input__inner{
      width: 40px;
      height: 20px;
      padding: 0;
      text-align: center;
    }

  }
  .sort_area .el-checkbox__label{
    display: none;
  }
  th.is-right > .cell{
    padding-right:16px;
  }

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
.color_red{
  color:#E22C37;
}
  .select_condition{
    display: flex;
    .label_area_single{
      flex:1;
    }
  }
  .check_single{
    margin-left:5px;
  }
  .tag_list{
    display:flex;
    .radio_group{
      flex: 1;
    }
  }
  .select_condition{
    margin-top: 10px;
    display: flex;
    align-items: center;
    .label_area_single{flex: 1;}
    .to_recycle{
      cursor: pointer;
      padding-right:20px;
      font-size:14px;color: #9B9B9B;
      i{color: #E5424B;}
    }
  }
  .service_operation{
    display: flex;
    .oper_btns{
      flex:1;
    }
  }
  .service_msg{
    display:flex;
    .service_img{
      margin-right:10px;
      img{
        width:64px;
        height:62px;
      }
    }
    .service_info{
      flex:1;
      display:flex;
      flex-direction:column;
      font-size:14px;
      .ser_name{
        color:#333333;
        flex:1;
      }
      .ser_code{
        color:#606266;
        padding-bottom:5px;
      }
    }
  }
  .oper_p{
      span{
        cursor:pointer;
        padding-right:10px;
      }
    }
    .long{
      width:60px;
      text-align:right;
      display:inline-block;
    }
</style>

