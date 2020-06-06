<template>
  <div id="gm_record_service">
      <!-- 左侧切换 -->
      <div class="wer_tabs">
          <ul>
            <li v-for="(item,index) in serviceKind" :class="{checked:index == num}" @click="tab(index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
      </div>
      <!-- 右侧服务列表 -->
      <div class="wer_list">
           <!--  筛选 -->
            <div class="search_input">
              <el-autocomplete
                class="inline-input"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="输入首字母可以查询"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
            <div class="service_container">
               <!-- 服务项目列表 -->
                <div class="service_list">
                  <div class="service_item" v-for='key in 10'>
                    <div class="service_img">
                      <img src="@/assets/ser_large.png">
                    </div>
                    <div class="service_msg">
                        <p class="name">日式剪裁-OL短发</p>
                        <p class="price">￥198.00</p>
                    </div>
                  </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'GmRecordService',
  data(){
    return{
      serviceKind:[
        {value:'1',name:'剪发'},
        {value:'2',name:'染发'},
        {value:'3',name:'护发'},
        {value:'4',name:'烫发'},
        {value:'5',name:'美容'}
      ],
      num:0,
      serviceList:[],
      state:''
    }
  },
  mounted(){
    this.serviceList = this.loadAll();
  },
  methods:{
    tab(index) {
      this.num = index;
    },
    // 输入自动检索
    handleSelect(item) {
      console.log(item);
      // this.state = item
    },
    querySearch(queryString, cb) {
      var serviceList = this.serviceList;
      var results = queryString ? serviceList.filter(this.createFilter(queryString)) : serviceList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (service) => {
        return (service.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "111", "address": "111" },
        { "value": "212", "address": "222" },
        { "value": "323", "address": "333" },
        { "value": "444", "address": "444" },
        { "value": "5444", "address": "555-101" }
      ];
    },
  }
}
</script>

<style lang="scss" scoped>
    #gm_record_service{
      display: flex;
    }
    .wer_tabs{
      margin-right:15px;
      color: #A5A5A5;
      font-size:16px;
      width: 170px;
      padding-top:52px;
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
      border-radius:6px;
      ul{
        li{
          cursor: pointer;
          text-align: center;
          margin-bottom: 66px;
        }
      }
    }
    .wer_list{
      flex:1;
    }
    .checked{
      color:#E6333F;
    }
    .search_input{
      margin:0 0 0 10px;
    }
 .service_item{
   display:inline-block;
   margin:20px 10px 0px 10px;
   cursor:pointer;
   .service_img{
     img{
        width:220px;
        height:206px;
        border-radius:6px 6px 0px 0px;
      }
   }
   .service_msg{
    padding:15px;
    width:190px;
    height:44px;
    background:#fff;
    box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
    border-radius:0px 0px 6px 6px;
    .name{
      font-size:16px;
      color:#3A3A3A;
      font-weight:500;
    }
    .price{
      color:#E22C37;
      font-weight:500;
      font-size:14px;
      margin-top:5px;
    }
   }
 }
</style>
