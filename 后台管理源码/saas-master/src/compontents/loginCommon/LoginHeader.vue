<template>
  <div class="top">
    <div class="top_area">
      <div class="title">
        <img src="@/assets/gm_logo.png">
        <span>{{header.title}}</span>
      </div>
      <div class="phone" v-show="header.isphone">客户服务热线：400-400-4008</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['header'],
  methods: {
  }
}
</script>

<style lang="scss">
  .top{
      width: 100%;
      height: 80px;
      background: #fff;

      .top_area{
        max-width:1440px;
        width:100%;
        height: 100%;;
        margin:0 auto;
        display: flex;
        flex-direction: row;
        .title{
          display: flex;
          align-items: center;
          font-size: 20px;
          img{
            width:50px;
            height:50px;
            margin-right: 20px;
          }
        }
        .phone{
          flex: 1;
          text-align: right;
          // margin-right: 12.5%;
          line-height: 80px;
          font-size: 12px;
        }
      }

    }
</style>


