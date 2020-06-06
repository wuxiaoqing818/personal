// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/js/rem"
import store from './store'
import axios from "axios"

import Vconsole from 'vconsole';
const vConsole =new Vconsole();
Vue.use(vConsole);

//全局引入vant不建议
// import Vant from 'vant';
// import 'vant/lib/index.css';
// import { ImagePreview } from "vant";
// Vue.use(Vant);
import { ImagePreview,Row, Overlay ,Button,Toast,Area,Popup,DatetimePicker} from 'vant'
Vue.use(Row)
Vue.use(Overlay)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Area)
Vue.use(Popup)
Vue.use(DatetimePicker)

import qrcode from 'qrcode'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


Vue.prototype.$axios = axios
Vue.prototype.$qrcode = qrcode;

Vue.config.productionTip = false
Vue.prototype.$imgPreview = ImagePreview;  //vant的图片处理全局挂载  实现图片预览



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
