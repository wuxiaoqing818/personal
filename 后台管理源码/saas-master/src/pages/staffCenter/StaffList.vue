<template>
    <div id='gm_staff_list' class="margin_main">
        <!-- 列表筛选条件 -->
        <div class="staff_list_condition list_condition">
          <!-- 左侧筛选 -->
          <div class="condition_left">
            <div class="label_area_single">
              <label>隶属门店：</label>
              <el-select v-model="shop">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="庆春店" value="a"></el-option>
                    <el-option label="宝龙店" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>生日月份：</label>
              <el-select v-model="birthMonth">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="1月" value="a"></el-option>
                    <el-option label="2月" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>职务级别：</label>
              <el-select v-model="level">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="总监设计师" value="a"></el-option>
                    <el-option label="普通设计师" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>剪发价：</label>
              <el-select v-model="price">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="50以内" value="a"></el-option>
                    <el-option label="100以内" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>评价得分：</label>
              <el-select v-model="rate">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="3分以内" value="a"></el-option>
                    <el-option label="5以内" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>劳动业绩：</label>
              <el-select v-model="amount">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="2000-3000" value="a"></el-option>
                    <el-option label="4000-3900" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>卖卡业绩：</label>
              <el-select v-model="cardAmount">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="2000-3000" value="a"></el-option>
                    <el-option label="4000-3900" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>产品业绩：</label>
              <el-select v-model="goodAmount">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="2000-3000" value="a"></el-option>
                    <el-option label="4000-3900" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>服务客户数：</label>
              <el-select v-model="count">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="2000-3000" value="a"></el-option>
                    <el-option label="4000-3900" value="b"></el-option>
              </el-select>
            </div>
            <div class="label_area_single">
              <label>作品数：</label>
              <el-select v-model="goodCount">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="2000-3000" value="a"></el-option>
                    <el-option label="4000-3900" value="b"></el-option>
              </el-select>
            </div>
          </div>
          <!-- 右侧搜索 -->
          <div class="condition_right">
            <el-input placeholder="请输入员工姓名/手机号/编号" class="con_phone" style='width:220px;' v-model="search"></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
        <!-- 列表数据 -->
        <div class="staff_container container_normal">
              <el-tabs type="card">
                <el-tab-pane v-for="item in selectStatus" :label="item.value" v-model="item.code"></el-tab-pane>
              </el-tabs>
             <!-- 按钮以及全选 -->
              <div class="oper_btns">
                <el-checkbox class="all_check" v-model="checkAllFlag"  @change="checkAll">全选</el-checkbox>
                <el-button class="oper_btn">发通知</el-button>
                <el-button class="oper_btn">删除</el-button>
                <!-- <el-button class="oper_btn">恢复</el-button>
                <el-button class="oper_btn">永久删除</el-button> -->
              </div>
              <!-- table list -->
              <el-checkbox-group v-model="checkArr" @change="handleChecked">
                <el-table
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe>
                  <el-table-column
                    width="180"
                    align='center'
                    label="员工信息">
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
                    prop="userNo"
                    align='center'
                    label="系统账号">
                  </el-table-column>
                  <el-table-column
                    prop="birth"
                    align='center'
                    label="生日">
                  </el-table-column>
                  <el-table-column
                    prop="timeIn"
                    align='center'
                    label="入职时间">
                  </el-table-column>
                  <el-table-column
                    prop="shop"
                    align='center'
                    label="隶属门店">
                  </el-table-column>
                  <el-table-column
                    prop="identity"
                    align='center'
                    label="角色">
                  </el-table-column>
                  <el-table-column
                    prop="limits"
                    align='center'
                    label="权限">
                  </el-table-column>
                  <el-table-column
                    prop="level"
                    align='center'
                    label="职务级别">
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="本月劳动业绩">
                    <template slot-scope="scope">¥{{scope.row.amount}}</template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="本月卖卡业绩">
                    <template slot-scope="scope">¥{{scope.row.cardAmount}}</template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="本月产品业绩">
                    <template slot-scope="scope">¥{{scope.row.goodAmount}}</template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="剪发价">
                    <template slot-scope="scope">¥{{scope.row.price}}</template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="评价得分">
                    <template slot-scope="scope">{{scope.row.rate}}分</template>
                  </el-table-column>
                  <el-table-column
                    prop='count'
                    align='center'
                    label="作品数">
                  </el-table-column>
                  <el-table-column
                    align='center'
                    width="100"
                    label="操作">
                    <template slot-scope="scope">
                      <p class="color_blue cursor" @click="toStaffRecord">详情档案</p>
                      <span class="color_yellow cursor">发通知</span>
                      <span class="color_yellow cursor">删除</span>
                      <!-- <span class="color_green cursor">恢复</span>
                      <span class="color_blue cursor">永久删除</span> -->
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
</template>

<script>
export default {
  name:'GmStaffList',
  data(){
    return{
      search:'',
      // 筛选
      shop:'',
      birthMonth:'',
      level:'',
      price:'',
      rate:'',
      amount:'',
      cardAmount:'',
      goodAmount:'',
      count:'',
      goodCount:'',
      //tab切换
      selectStatus:[
        {code:'',value:'全部'},
        {code:'A',value:'发型师'},
        {code:'B',value:'发型助理'},
        {code:'C',value:'美容师'},
        {code:'D',value:'美容助理'}
      ],
      // 全选
      checkAllFlag:false,
      checkArr:[],
      isCheckedAll:false,
      CheckedAllArr:[],
      //分页
      totalCount:100,
      currentPage:1,
      pageSize:10,
      //
      tableData:[{
          id:2,
          img:require('@/assets/yuan_logo.png'),
          name:'peter',
          sex:1,
          phone:'12345567777',
          userNo:'1132948298392',
          birth:'2018/10/29',
          timeIn:'2018/10/29',
          shop:'暴龙城店',
          identity:'金卡会员',
          limits:'微信推广',
          level:'总监',
          amount:'5324',
          cardAmount:"5000",
          goodAmount:'2592',
          price:'344',
          rate:'3',
          count:'45'
        },
        {
          id:1,
          img:require('@/assets/yuan_logo.png'),
          name:'peter',
          sex:0,
          phone:'12345567777',
          userNo:'1132948298392',
          birth:'2018/10/29',
          timeIn:'2018/10/29',
          shop:'暴龙城店',
          identity:'金卡会员',
          limits:'微信推广',
          level:'总监',
          amount:'5324',
          cardAmount:"5000",
          goodAmount:'2592',
          price:'344',
          rate:'3',
          count:'45'
        }]
    }
  },
  mounted(){
    this.setCheckedAllArr()
  },
  methods:{
    toStaffRecord(){
      this.$router.push('/staff-record');
    },
    // 分页
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
  }
}
</script>

<style lang="scss">
#gm_staff_list .client_area .el-checkbox__label{
    display: none;
  }
</style>

<style lang="scss" scoped>
.color_blue{
  color:#409EFF;
}
.color_green{
  color:#67C23A;
}
.color_yellow{
  color: #E6A23C;
}
.cursor{
  cursor:pointer;
}
    #gm_staff_list {
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


