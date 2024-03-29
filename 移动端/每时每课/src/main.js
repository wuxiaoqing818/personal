// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/js/rem"
import store from './store'
import axios from "axios"
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.prototype.$axios=axios

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
