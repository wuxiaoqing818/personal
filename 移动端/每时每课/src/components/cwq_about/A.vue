
<template>
    <div id="app">
      <!-- 头部 -->
        <div class="header">
          <div>约课记录</div>
        </div>
      <!-- 内容   -->
      <div class="box">
        <div class="content">
          <div class="cwq_nav">
            <router-link to="/a" class="active_item" exact tag="div">待上课</router-link>
            <router-link to="/b" class="active_item" tag="div">已完成</router-link>
            <router-link to="/c" class="active_item" tag="div">已取消</router-link>
          </div>
          <div class="cwq_no">
            <img src="../../../static/images/no.png" alt="">
            <p>还没有待上课记录哦</p>
            <p @click="toyueke">立即约课</p>
          </div>
        </div>
      </div>
       <!-- 尾部 -->
     <Footer></Footer>


    </div>
  </template>




  <script>
  import Footer from "@/components/footer/Footer";
export default {
  name: 'App',
   components: { Footer },
  data () {
      return {
        activeIndex:0,
      }
  },
  methods: {
   toyueke(){
     this.$router.push("/oto")
     
   }
  },
}

</script>




<style lang="scss">

#app {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
#app,ul,li,ol,h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding: 0;
    list-style: none;
}
#app{
    font-size: .2rem;
    line-height: .4rem;
}
.header{
    height: .8rem;  
    color: #605E5D;
    font-size: .32rem;
    text-align: center;
    line-height: .8rem;
}
.cwq_nav {
  width: 100%;
  height: 0.94rem;
  display: flex;
  justify-content: space-around;
  line-height: .94rem;
  color: #79797B;
  font-size: .28rem;
  background: #ffffff;
}
.active_item.router-link-active {
  color: #ED702A;
  font-weight: 600;
}
.cwq_no {
  img {
    width: 3.56rem;
    height: 2.55rem;
    margin-left: 1.96rem;
    margin-top: 2.04rem ;
  }
  p:nth-of-type(1){
    font-size: .26rem;
    color: #B5B4B4;
    text-align: center;
    margin-top: .26rem;
  }
  p:nth-of-type(2){
    width: 1.74rem;
    height: 0.54rem;
    background: #EB6100;
    font-size: .26rem;
    color: #ffffff;
    text-align: center;
    line-height: .54rem;
    border-radius:.04rem; 
    margin: .6rem auto;
  }
}
.footer{
    height: 30px;
    width:100%;  
    color: #ffffff;
    text-align: center;
    line-height: 0.7rem;
}
html,body{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.box{
    height: 0;
    flex-grow: 1;
    overflow:auto;
}
.box>.content{
    width: 100%;
    min-height: 101%;
    background: #F0F2F5;
}
</style>