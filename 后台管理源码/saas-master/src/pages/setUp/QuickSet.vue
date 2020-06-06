<template>
  <div id="gm_quick_set">

    <el-form :model="quickForm">
      <!-- 时间选择 -->
      <div class="time_choose">
          <p class="quick_title"><i class="red_tip">*</i>时间选择</p>
            <el-form-item label="可约时间:" :label-width="formLabelWidth">
              <!-- 选择可约时间 弹窗 -->
              <el-popover
              placement="bottom-start"
              trigger="click"
              v-model="visible">
                <div class="weekday_popover">
                  <el-checkbox-group v-model="quickForm.checkboxGroup" size="large">
                    <el-checkbox label="1" border>
                      周一</el-checkbox><el-checkbox label="2" border>
                      周二</el-checkbox><el-checkbox label="3" border>
                      周三</el-checkbox><el-checkbox label="4" border>
                      周四</el-checkbox><el-checkbox label="5" border>
                      周五</el-checkbox><el-checkbox label="6" border>
                      周六</el-checkbox><el-checkbox label="7" border>
                      周日</el-checkbox>
                  </el-checkbox-group>
                  <el-button type="primary">确定</el-button>
                </div>
                <el-input v-model="quickForm.weekDay" readonly="readonly" placeholder="请选择可约时间" slot="reference"></el-input>
              </el-popover>
              <!-- end -->
            </el-form-item>
            <el-form-item  label="" :label-width="formLabelWidth">
              <el-time-select
                placeholder="起始时间"
                v-model="quickForm.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30'
                }">
              </el-time-select>
              —
              <el-time-select
                placeholder="结束时间"
                v-model="quickForm.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30',
                  minTime: quickForm.startTime
                }">
              </el-time-select>
            </el-form-item>
            <el-form-item label="预约时间间隔:" :label-width="formLabelWidth">
              自开始时间起，每
              <el-select v-model="quickForm.intervalSub">
                <el-option label="30分钟" value="30"></el-option>
                <el-option label="60分钟" value="60"></el-option>
              </el-select>
              为一个预约时间间隔
            </el-form-item>
            <!-- 占用时长 -->
            <el-radio-group v-model="quickForm.occupyTime">
              <el-form-item label="占用时长:" :label-width="formLabelWidth">
                  <el-radio label="0">每次预约占用时长按项目的服务时长确定</el-radio>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                  <el-radio label="1">每次预约占用时长统一为</el-radio>
                    <el-select v-model="quickForm.intervalOcc">
                      <el-option label="30分钟" value="30"></el-option>
                      <el-option label="60分钟" value="60"></el-option>
                    </el-select>
              </el-form-item>
            </el-radio-group>
            <!-- end -->
            <el-form-item label="最长预约跨度:" :label-width="formLabelWidth">
              最长可预约的时间跨度为
              <el-select v-model="quickForm.intervalMax">
                <el-option label="30分钟" value="30"></el-option>
                <el-option label="60分钟" value="60"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排除时间:" :label-width="formLabelWidth">
              <div class='time_list_item' v-for="(item,key) in quickForm.excludeTime">
                <el-date-picker
                  v-model="item.value"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <i class="el-icon-delete" @click="removeTime(key)"></i>
              </div>
            </el-form-item>
            <!-- 新增 -->
            <el-form-item label="" :label-width="formLabelWidth">
              <el-button @click="addNewTime">添加</el-button>
            </el-form-item>
      </div>
      <!-- 预约要素 -->
      <div class="sub_ele">
        <p class="quick_title">预约要素</p>
          <el-form-item label="手艺人:" :label-width="formLabelWidth">
            <el-checkbox v-model="quickForm.perChecked">必须选择手艺人</el-checkbox>
          </el-form-item>
          <el-form-item label="服务项目:" :label-width="formLabelWidth">
            <el-checkbox v-model="quickForm.serChecked">必须选择服务项目</el-checkbox>
          </el-form-item>
          <el-form-item label="人数限制:" :label-width="formLabelWidth">
            每位手艺人每个时间段最多可预约
            <el-select v-model="quickForm.perNum">
              <el-option label="1人" value="1"></el-option>
              <el-option label="2人" value="2"></el-option>
            </el-select>
          </el-form-item>
      </div>
      <!-- 提醒与取消 -->
      <div class="quick_oper">
          <p class="quick_title"><i class="red_tip">*</i>提醒与取消</p>
            <el-form-item label="到店提醒:" :label-width="formLabelWidth">
              预约到店时间前
              <el-select v-model="quickForm.beforeTime">
                  <el-option label="1小时" value="1"></el-option>
                  <el-option label="2小时" value="2"></el-option>
                </el-select>
                提醒客户准时到店
            </el-form-item>
            <!-- 占用时长 -->
              <el-radio-group v-model="quickForm.cancel">
                <el-form-item label="取消限制:" :label-width="formLabelWidth">
                    <el-radio label="0">客户可以随时取消或修改预约单</el-radio>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-radio label="1">
                      预约到店时间前
                      <el-select v-model="quickForm.cancelTime">
                          <el-option label="30分钟" value="30"></el-option>
                          <el-option label="60分钟" value="60"></el-option>
                        </el-select>
                      以内不可取消
                      </el-radio>
                </el-form-item>
              </el-radio-group>
              <!-- end -->
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary">保存修改</el-button>
              </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'GmQuickSet',
  data(){
    return {
      formLabelWidth:'120px',
      visible:false,
      quickForm:{
        weekDay:'',
        startTime:'',
        endTime:'',
        intervalSub:'30',
        intervalMax:'30',
        occupyTime:'0',
        intervalOcc:'30',
        excludeTime:[
            {value:''}
          ],
        perChecked:false,
        serChecked:false,
        perNum:'2',
        beforeTime:'1',
        cancel:'0',
        cancelTime:'30',
        checkboxGroup:[]
      }
    }
  },
  mounted(){

  },
  methods:{
    // 新增时间
      addNewTime(){
        this.quickForm.excludeTime.push({
            value:''
        })
      },
      // 删除时间
      removeTime(key){
        console.log(key)
        this.quickForm.excludeTime.splice(key, 1);
      },
  }
}
</script>

<style lang="scss">
#gm_quick_set .el-form .el-select{
  max-width: 112px;
}
.weekday_popover{
  max-width:400px;
  margin:20px;
  .el-checkbox{
    // margin-bottom:10px;
    margin:0 10px 10px 0;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered{
    margin-left:0;
  }
  .el-checkbox.is-bordered .el-checkbox__inner{
    display:none;
  }
}
</style>

<style lang="scss" scoped>
  .quick_title{
    width: 110px;
    text-align: right;
    font-size:16px;
    padding-top: 20px;
    padding-bottom:10px;
    .red_tip{
      color: #E22C37;
      vertical-align: middle;
      font-size:18px;
      padding-right: 5px;
    }
  }
  .time_list_item + .time_list_item{
    margin-top:10px;
  }
  .time_list_item{
    i{
      cursor:pointer;
      font-size:16px;
      color:#E5424B;
      padding-left:20px;
    }
  }
  #gm_quick_set{
    padding-bottom:50px;
  }

</style>

