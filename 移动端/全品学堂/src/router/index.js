import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/home'
// import Find from '@/components/find/find'
import MyLogin from '@/components/my/login/myLogin'
import MySetMessage from '@/components/my/info/mySetMessage'

const Home = () => import("@/components/home/home")
const FreeArea = () => import("@/components/home/freeArea")
const Find = () => import("@/components/find/find")
const My = () => import("@/components/my/my")
const SetInfo = () => import("@/components/my/info/setInfo")

// const MySmsLogin = () => import("@/components/my/mySmsLogin")


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: Home,
      component: Home
    },
    {
      path: '/free-area',
      name: FreeArea,
      component: FreeArea
    },
    {
      path: '/find',
      name: Find,
      component: Find
    },
    {
      path: '/my',
      name: My,
      component: My
    },
    {
      path: '/set-info',
      name: SetInfo,
      component: SetInfo
    },
    {
      path: '/my-login',
      name: MyLogin,
      component: MyLogin
    },
    {
      path: '/my-set-message',
      name: MySetMessage,
      component: MySetMessage
    },
    // {
    //   path: '/my-info',
    //   name: MyInfo,
    //   component: MyInfo
    // },
    // {
    //   path: '/my-login',
    //   name: MyLogin,
    //   component: MyLogin
    // },
    // {
    //   path: '/my-sms-login',
    //   name: MySmsLogin,
    //   component: MySmsLogin
    // },
  ]
})
