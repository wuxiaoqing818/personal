export default [
  {
    path: '/',
    name: 'login',
    component: () =>
      import('@/pages/login'),
    meta: {
      laoban: true,
      title: '我是老板你不能看'
    }
  },
  {
    path: '/home1',
    name: 'home1',
    component: () =>
      import('@/pages/home1'),
    meta: {
      laoban: true,
      title: '我是老板你不能看'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import('@/pages/home'),
    meta: {
      laoban: true,
      title: '我是老板你不能看'
    }
  }

]
