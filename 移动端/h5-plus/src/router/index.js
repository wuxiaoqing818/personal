import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'


Vue.use(Router)
// router.beforeEach((to, from, next) => {

//   next()
// })
// export default new Router({
//   routes
// })
const router = new Router({
  routes,
});

// 规则
router.beforeEach((to, from, next) => {
  if (to.meta.laoban) {
    alert(to.meta.title)
  }
  next('/bing')
})

export default router