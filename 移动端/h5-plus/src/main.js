// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Vconsolefrom 'vconsole';
// const vConsole =new Vconsole();
// Vue.use(vConsole);

//使用ui结合plus实现拍照上传图片       如果集成h5+环境  可以直接使用plus的api
import Mui from 'vue-awesome-mui';
Vue.use(Mui);

//集成
var onPlusReady = function (callback, context = this) {
  if (window.plus) {
    callback.call(context)
  } else {
    document.addEventListener('plusready', callback.bind(context))
  }
}
Vue.mixin({
  beforeCreate() {
    onPlusReady(() => { this.plusReady = true }, this)
  },
  methods: {
    onPlusReady: onPlusReady
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
