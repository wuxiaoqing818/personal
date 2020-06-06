export default [{
    path: '/',
    redirect: '/scan'
},
{
    path: '/scan',
    name: 'scan',
    component: () =>
        import('@/components/scan'),
    meta: {
        laoban: true,
        title: '我是老板你不能看'
    }
},
{
    path: '/paizhao',
    component: () =>
        import('@/components/paizhao'),
},
{
    path: '/weizhi',
    component: () =>
        import('@/components/geolocation'),
},
{
    path: '/bing',
    name: 'A',
    component: () =>
        import('@/components/visitorPie'),
},
{
    path: '/zhu',
    component: () =>
        import('@/components/zhu'),
},
]



