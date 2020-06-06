<template>
  <div class="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
// import Home from '@/components/Home'
// import Xiangqing from '@/components/Xiangqing'
export default {
  name: "wxq-app",
  // components:{Home,Xiangqing},
  data() {
    return {

    };
  },
  methods: {},
  computed: {}
}
</script>
<style lang="scss">
body,html,.app{
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
main{
  flex:1;
  overflow: auto;
}

footer ul{
   display: flex;
   list-style: none;
   li{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      display: block;
      width: 40px;
      height: 35px;
    }
    span{
       display: block;
       margin-top: 5px;
    }
    a{
      text-decoration: none;
      &.router-link-active{
        color: orangered;
      }
    }
   }
}
</style>
