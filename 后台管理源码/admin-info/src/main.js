// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import http from './global/axio_config' // 请求处理
import { dateFormat } from './global/utils' // 时间格式处理
import store from './store/index' // vuex

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入组件

// 引入百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI)

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'dPfq7RLt60kI2BGB95hPNNgKs9wwdLPT'
})

Vue.prototype.$http = http
Vue.prototype.$dateFormat = dateFormat
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
