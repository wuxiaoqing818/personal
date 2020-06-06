<template>
  <div id="gm_record_rate">
      <!-- 总评分 -->
      <div class="total_score">
          <span>总体评分：</span>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#E9AC44"
            score-template="{value}分">
          </el-rate>
      </div>
      <!-- 具体评论列表 -->
      <div class="rate_list">
          <div class="rate_item_area" v-for="key in 3">
            <div class="client_header">
              <img src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/4.jpg">
              <p>宋冬野</p>
            </div>
            <div class="rate_item">
              <p class="rate_time">2018-12-30 20:30</p>
              <p class="rate_info">
                <span>项目：日式裁剪OL风格；资生堂染发；染发</span>
                <span class="rate_price">消费：1680元</span>
              </p>
              <div class="rate_main">
                <span>评论正文：</span>
                <div>
                  <p class="main_text">水星是离太阳最近的一颗行星，但它无法脱离自己的轨道，也无法再接近太阳，
                所以郭顶借水星对太阳的相伴运行比喻人与人之间亦远亦近的情感关系，以拟人的创作手法和偏向科幻的音乐配器
                与制作方式创作出了该曲，他希望听众从该曲中找到人生历程中最适合的那个“位置”.
                  </p>
                  <div class="main_img_list">
                    <img src="@/assets/dong_logo.png" v-for="key in 5">
                  </div>
                  <p class="main_time">2018-12-30 </p>
                </div>
              </div>
              <div class="rate_main" style="margin-top:15px;">
                <span>门店回复：</span>
                <div>
                    <p class="main_text">着迷于你眼睛 银河有迹可循，穿过时间的缝隙 它依然真实地，吸引我轨迹，这瞬眼的光景 最亲密的距离，沿着你皮肤
               纹理 走过曲折手臂，做个梦给你 做个梦给你</p>
                    <p class="reply_time">30天后追评</p>
                    <p class="main_text">还要多远才能进入你的心，还要多久才能和你接近，咫尺远近却无法靠近的那个人，也等着和你相遇，环游的行星 怎么
              可以拥有你</p>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'GmRecordRate',
  data(){
    return{
      value:3
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  #gm_record_rate{
    background-color:#fff;
    padding-left:75px;
  }
  .total_score{
    color:#3A3A3A;
    display:flex;
    font-size: 16px;
    padding:34px 0 45px 0;
  }
  .client_header{
    text-align:center;
    margin-right:50px;
    img{
      width:42px;
      height:42px;
      border-radius:50%;
    }
    p{font-size:14px;color: #3A3A3A;}
  }
  .rate_item_area{
     padding-bottom:100px;
     display:flex;
  }
  .rate_item{
    flex:1;
    max-width:800px;
    .rate_time{color: #9B9B9B;font-size:14px;padding: 4px 0;}
    .rate_info{
      padding:10px 0;
      .rate_price{padding-left: 70px;}
    }
    .rate_main{
      display:flex;
      font-size:14px;
      line-height:24px;
      div{flex:1;}
      .main_img_list{
        padding-top:10px;
        img{width:110px;height:110px;margin-right:4px;}
      }
      .main_time{color:#9B9B9B;}
      .reply_time{
        color:#E6333F;
        margin:15px 0;
      }
    }
  }
</style>
