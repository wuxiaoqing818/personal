import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

// 规则
router.beforeEach((to, from, next) => {
  if (to.meta.laoban) {
    alert(to.meta.title)
  }
  next()
})

export default router
