//引入vue
import Vue from 'vue'
//引入vuex
import vuex from 'vuex'
//引入user.js
import user from './user';
//挂载
Vue.use(vuex)
//引入本地存储
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage    //window.sessionStorage   cookie
})

//创建store
export default new vuex.Store({
    plugins: [vuexLocal.plugin],  //安装 vuex-persist插件

    modules: {
        user   //一个vuex 模块   新的store
    }
})