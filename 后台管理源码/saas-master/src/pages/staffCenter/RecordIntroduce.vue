<template>
  <div id="gm_record_introduce">
      <!-- 左侧头像 -->
      <div class="intro_header">
        <img src="@/assets/hair_icon.png" class="fixed_img">
        <div class="upload_img">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <!-- 右侧信息 -->
      <div class="intro_container">
          <div class="intro_title">
            <span>Peter<span style="padding-left:15px;">总监设计师</span></span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <div class="main_info">
            <p class="mult_p">
              <span>员工编号：SDY190</span>
              <span>店内昵称：胖纸</span>
              <span>系统账号：j38234723</span>
              <span>手机号：143427858293</span>
            </p>
            <p class="mult_p">
              <span>性别：男</span>
              <span>年龄：35岁</span>
              <span>生日：1999-12-30</span>
              <span>星座：巨蟹座</span>
            </p>
            <p class="mult_p">
              <span>籍贯：山东省安和桥</span>
              <span>婚姻：未婚</span>
              <span>血型：AB型</span>
              <span>学历：本科</span>
            </p>
            <p class="mult_p">
              <span>隶属门店：杭州市 宝龙店</span>
              <span>入职时间：2018-12-30</span>
              <span>职务：总监设计师</span>
              <span>剪发价：200元</span>
            </p>
            <p class="mult_p">
              <span>服务客数：390人</span>
              <span>作品数：100个</span>
              <span>评价数：300个</span>
              <span>评价得分：4.0分</span>
            </p>
            <p class="table_p">
              <span>业绩总览：</span>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="指定客数">
                </el-table-column>
                <el-table-column
                  label="劳动业绩">
                  <template slot-scope="scope">{{scope.row.serTotal}}元</template>
                </el-table-column>
                <el-table-column
                  label="产品业绩">
                  <template slot-scope="scope">{{scope.row.goodTotal}}元</template>
                </el-table-column>
                <el-table-column
                  label="售卡业绩">
                  <template slot-scope="scope">{{scope.row.cardTotal}}元</template>
                </el-table-column>
              </el-table>
            </p>
            <p>学习课程：《发型师的自我修养》《发型师的康复治疗》</p>
            <p>备注：多</p>
          </div>
          <div class="intro_title">
            <span>签名</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p>宋冬野，1987年11月10日出生于中国北京，中国民谣歌手，音乐创作人。</p>
          <div class="intro_title">
            <span>擅长项目/风格</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p>日式裁剪、接发、色彩大师</p>
          <div class="intro_title">
            <span>简介</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p>宋冬野，1987年11月10日出生于中国北京，中国民谣歌手，音乐创作人。2009年，在豆瓣以独立音乐人的面貌，推出歌曲《抓住那个胖子》、《年年》、《嘿，裤衩儿》等歌曲。
2011年，宋冬野推出歌曲《安和桥》、《就在不远的2013》 。2012年签约摩登天空， 单曲《董小姐》收录在2012年12月发行的《摩登天空7》中。2013年8月发行专辑《安和桥北》。
2013年12月4日凭借专辑《安和桥北》荣获首届鲁迅文化奖年度音乐奖 。2014年8月15日，宋冬野推出第一支官方MV《斑马，斑马》。</p>
          <div class="intro_title">
            <span>获奖经历</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p class="span_p">
            2013-12-14 <span>2013年</span> <span>年度音乐奖</span> <span>安和桥北（获奖）</span>
          </p>
          <p class="span_p">
            2013-12-14 <span>2013年</span> <span>最佳歌曲奖 </span> <span>董小姐</span>
          </p>
          <p class="span_p">
            2013-12-14 <span>2013年</span> <span>年度音乐奖</span> <span>安和桥北（获奖）</span>
          </p>
          <div class="intro_title">
            <span>从业经历</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p class="span_p">
            2014年<span>入行</span>
          </p>
          <p class="span_p">
            2014-2018<span>苑苑担任发型设计总监</span>
          </p>
          <div class="intro_title">
            <span>学习经历</span>
            <i class="el-icon-edit-outline"></i>
          </div>
          <p class="span_p">
            2014年<span>入行</span>
          </p>
          <p class="span_p">
            2014-2018<span>苑苑担任发型设计总监</span>
          </p>
          <div class="intro_title">
            <span>形象相册</span>
          </div>
          <div class="img_list">
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'GmRecordIntroduce',
  data(){
    return{
      imageUrl:require('@/assets/yuan_logo.png'),
      tableData:[{
        date:'当月',
        num:'234',
        serTotal:'23',
        goodTotal:'123',
        cardTotal:'1234'
      },{
        date:'全年',
        num:'1234',
        serTotal:'123',
        goodTotal:'1123',
        cardTotal:'11234'
      }],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [
        {
          name: 'food.jpeg',
          url: require('@/assets/xing_logo.png')
        }, {
          name: 'food2.jpeg',
          url: require('@/assets/xing_logo.png')
        }
      ]
    }
  },
  mounted(){

  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss">
#gm_record_introduce .upload_img .el-upload img{
    width: 42px;
    height:42px;
    border-radius: 50%;
}
#gm_record_introduce .img_list .el-upload-list__item,#gm_record_introduce .img_list .el-upload--picture-card{
    width:236px;
    height:132px;
}

</style>

<style lang="scss" scoped>
    #gm_record_introduce{
      display:flex;
      background:#fff;
      padding-bottom:150px;
    }
    .intro_header{
      width: 137px;
      position: relative;
      padding-top:30px;
      margin-left:30px;
      .fixed_img{
        width: 92px;
        height:92px;
        border-radius: 50%;
      }
      .upload_img{
        position: absolute;
        width: 42px;
        height:42px;
        top:80px;
        left:71px;
      }
    }
    .intro_container{
      padding-top:40px;
      margin-right:130px;
      flex:1;
      color:#3A3A3A;
      font-size:14px;
      .intro_title{
        font-size:18px;
        color:#333333;
        margin-top:35px;
        margin-bottom:20px;
        display: flex;
        span{flex:1;}
        i{cursor:pointer;color:#4AA8FF;}
      }
      .main_info{
        p{padding:5px 0;}
        .mult_p{
          display:flex;
          span{flex:1;}
        }
      }
    }
    .table_p{
      display: flex;
      margin-top:5px;
    }
    .span_p{
      padding:5px 0;
      span{margin-left:10px;}
    }
</style>


