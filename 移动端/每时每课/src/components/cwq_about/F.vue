
<template>
    <div id="app">
      <!-- 头部 -->
        <div class="header">
          <div class="one">
                <router-link :to="/e/+c" tag="div">返回</router-link>
                <div>讲师详情</div>
                <div></div>
            </div>
            <div class="two">
                <div class="part_div" v-for="(item,index) in list" :key="index">
                  <div><img :src="item.img" alt="对不起"></div>
                  <div>
                      <p>{{item.name}}</p>
                      <p><span>{{item.sex}}</span><span>{{item.info}}</span></p>
                  </div>
                  
                </div>
            </div>
            <div class="xiangqing">关注</div>
        </div>
      <!-- 内容   -->
      <div class="box">
        <div class="content">
          <ul class="show_ul">
              <li v-for="(item,index) in xq" @click="tab(index)" :key="index">
                      {{item.tab}}
                  <div v-show="item.show">{{item.age1}}</div>
              </li>
          </ul>
          
        </div>
      </div>
       <!-- 尾部 -->
       <div class="footer">
            <div>立即约课</div>

       </div>


    </div>
  </template>




  <script>
  import axios from 'axios'
export default {
  name: 'App',
  data () {
      return {
          arr:[],
          list:[],
          c:'',
          xq:[
              {tab:"讲师介绍",show:"true",age1:"教师年龄"},
              {tab:"主讲课程",show:"false",age1:"数学，语文"},
              {tab:"学员评价",show:"false",age1:"暂无评价"}
          ],
      }
  },
    mounted() {
        var a = this.$route.params.id
        this.c=a
        axios.get('../../static/data/list.json').then(res=>{
            this.arr=res.data
          let b = this.arr.filter((item)=>{
              return item.id==a
          })
          this.list=b
        })
    },
    methods: {
        tab(index){
            for(var i=0;i<this.xq.length;i++){
                this.xq[i].show=false;
                if(i==index){
                    this.xq[index].show=true;
                }
            }
        }
    },
     
   
}

</script>




<style lang="scss" scoped>
.show_ul {
    margin-top:.9rem; 
    display: flex;
    justify-content: space-around;
    li{
        width: 33.3%;
        height: 0.9rem;
        color: #818283;
        font-size: .28rem;
        text-align: center;
        line-height:.9rem;
        div {
            margin-top: 10px;
        }
    }
}

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
    height: 2rem;  
    background-image: linear-gradient(#62B6FD, #507EE4);
    position: relative;
}
.one {
    width: 100%;
    height: 0.85rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .35rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.85rem;
    font-size: .32rem;
    font-weight: 500;
}

.part_div {
    position: absolute;
    top:50px;
    left: 10px;
    width: 7.12rem;
    height: 1.6rem;
    background: #ffffff;
    border-radius:4px; 
    display: flex;
    div:nth-of-type(1){
        width: 0.8rem;
        height: 0.8rem;
        margin-top: .4rem;
        margin-left: .3rem;
        img {
            width: 100%;
        }
    }
    
    div:nth-of-type(2){
        width: 2rem;
        height: 0.8rem;
        margin-top: .38rem;
        p:nth-of-type(1){
            color: #393939;
            font-size: .3rem;
            font-weight: 600;
        }
        p:nth-of-type(2){
            color: #A7A7A7;
            font-size: .27rem;
            font-weight: 600;
            margin-top:-20px; 
            span:nth-of-type(2){
                margin-left: .15rem;
            }
        }
    }
  
}
.xiangqing{
        position: absolute;
        top:50px;
        right: 20px;
        width: 1.4rem;
        height: 0.6rem;
        background: #EBEEFE;
        text-align: center;
        line-height: .6rem;
        color: #EB5A11;
        font-size: .25rem;
        font-weight: 400;
        border-radius: 15px;
        margin-top: .5rem;
        margin-left: 2.1rem; 
}
.footer{
     height: .87rem;
    width:100%;  
    background:#EB6100;  
    font-size: .32rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.87rem;
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