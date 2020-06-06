import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import TeacherDetail from '@/components/home/TeacherDetail'

import A from '../components/cwq_about/A'
import B from '../components/cwq_about/B'
import C from '../components/cwq_about/C'
import Oto from '../components/cwq_about/Oto'
import OtoPlan from '../components/cwq_about/OtoPlan'
import F from '../components/cwq_about/F'


import CourseDetail from "@/components/course/CourseDetail";
import Course from "@/components/course/Course";
import CourseSearch from "@/components/course/CourseSearch";




import ti from '@/components/lian/ti'
import lian from '@/components/lian/lian'
import tao from '@/components/lian/tao'
import fang from '@/components/lian/fang'
import ce from '@/components/lian/ce'
import xi from '@/components/lian/xi'
import cuo from '@/components/lian/cuo'
// ---------------------------------------------

import MyLogin from '@/components/my/MyLogin'
import MySmsLogin from '@/components/my/MySmsLogin'
import MySetPass from '@/components/my/MySetPass'
import MySetMessage from '@/components/my/MySetMessage'
import QuitLogin from '@/components/my/QuitLogin'
import MySetNewPass from '@/components/my/MySetNewPass'
import MySetInfo from '@/components/my/MySetInfo'
import Person from '@/components/my/Person'

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
      path: '/teacher-detail',
      name: TeacherDetail,
      component: TeacherDetail
    },
    {
      path: '/a',
      component: A,
      children: [
        {
          path: '/b',
          component: B
        },
        {
          path: '/c',
          component: C
        },

      ]
    },
    {
      path: "/course-detail",
      name: CourseDetail,
      component: CourseDetail,
    },
    {
      path: "/course",
      name: Course,
      component: Course,
    },
    {
      path: "/course-search",
      name: CourseSearch,
      component: CourseSearch,
    },
    {
      path: '/oto',
      component: Oto
    },
    {
      path: '/oto-plan',
      component: OtoPlan
    },
    {
      path: '/f/:id',
      component: F
    },
    {
      path: '/ti',
      component: ti
    },
    {
      path: '/lian',
      component: lian
    },
    {
      path: '/tao',
      component: tao
    },
    {
      path: '/fang',
      component: fang
    },
    {
      path: '/ce',
      component: ce
    },
    {
      path: '/xi',
      component: xi
    },
    {
      path: '/cuo',
      component: cuo
    },
    // --------------------------------------------
    {
      path: "/my-login",
      name: MyLogin,
      component: MyLogin,
    },
    {
      path: "/my-sms-login",
      name: MySmsLogin,
      component: MySmsLogin,
    },
    {
      path: "/my-set-pass",
      name: MySetPass,
      component: MySetPass,
    },
    {
      path: "/my-set-message",
      name: MySetMessage,
      component: MySetMessage,
    },
    {
      path: "/person",
      name: Person,
      component: Person,
    },
    {
      path: "/quit-login",
      name: QuitLogin,
      component: QuitLogin,
    },
    {
      path: "/my-set-new-pass",
      name: MySetNewPass,
      component: MySetNewPass,
    },
    {
      path: "/my-set-info",
      name: MySetInfo,
      component: MySetInfo,
    }
  ]
})
