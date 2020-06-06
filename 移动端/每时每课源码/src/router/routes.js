const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import('../views/index/Index.vue'),
        meta: {
            footer: true,
            title: '每时每课'
        }
    },
    {
        path: '/oto',
        name: 'Oto',
        component: () =>
            import('../views/index/oto/Oto.vue'),
        meta: {
            title: '一对一辅导'
        }
    },
    {
        path: '/oto-plan',
        name: 'OtoPlan',
        component: () =>
            import('../views/index/oto/OtoPlan.vue'),
        meta: {
            title: '预约课程'
        }
    },
    {
        path: '/teacher',
        name: 'Teacher',
        component: () =>
            import('../views/index/teacher/Teacher.vue'),
        meta: {
            title: '讲师详情'
        }
    },
    {
        path: '/comments',
        name: 'CommentItem',
        component: () =>
            import('../components/CommentItem.vue'),
        meta: {
            title: '评论'
        }
    },
    {
        path: '/course',
        name: 'Course',
        component: () =>
            import('../views/course/Course.vue'),
        meta: {
            footer: true,
            title: '特色课'
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () =>
            import('../views/course/Search.vue'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/course-detail',
        name: 'CourseDetail',
        component: () =>
            import('../views/course/CourseDetail.vue'),
        meta: {
            title: '课程详情'
        }
    },
    {
        path: '/purchase',
        name: 'Purchase',
        component: () =>
            import('../views/course/Purchase.vue'),
        meta: {
            title: '确认订单'
        }
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () =>
            import('../views/course/Pay.vue'),
        meta: {
            title: '支付'
        }
    },
    {
        path: '/record',
        name: 'Record',
        component: () =>
            import('../views/record/Record.vue'),
        meta: {
            footer: true,
            title: '约课记录'
        }
    },
    {
        path: '/communicate',
        name: 'Communicate',
        component: () =>
            import('../views/record/Communicate.vue'),
        meta: {
            title: '沟通记录'
        }
    },
    /** 
     * 讲师端
     */
    
    {
        path: '/vip',
        name: 'Vip',
        component: () =>
            import('../views/person/Vip.vue'),
        meta: {
            title: '会员'
        },
    },
     {
        path: '/protocol_01',
        name: 'protocol_01',
        component: () =>
            import('../views/person/protocol_01.vue'),
        meta: {
            title: '会员服务协议'
        },
    },
     {
        path: '/protocol_02',
        name: 'protocol_02',
        component: () =>
            import('../views/person/protocol_02.vue'),
        meta: {
            title: '会员功能使用说明'
        },
    },
     {
        path: '/protocol_03',
        name: 'protocol_03',
        component: () =>
            import('../views/person/protocol_03.vue'),
        meta: {
            title: '优惠券使用说明'
        },
    },
    {
        path: '/my-study',
        name: 'MyStudy',
        component: () =>
            import('../views/person/mine/MyStudy.vue'),
        meta: {
            title: '我的学习'
        },
    },
    {
        path: '/study-detail',
        name: 'MyStudyDetail',
        component: () =>
            import('../views/person/mine/MyStudyDetail.vue'),
        meta: {
            title: '学习详情'
        },
    },
    {
        path: '/picture-course-detail',
        name: 'PictureCourseDetail',
        component: () =>
            import('../views/person/mine/PictureCourseDetail.vue'),
        meta: {
            title: '图文课详情'
        },
    },
    {
        path: '/study-calendar',
        name: 'StudyCalendar',
        component: () =>
            import('../views/person/mine/StudyCalendar.vue'),
        meta: {
            title: '学习日历'
        },
    },
    {
        path: '/my-currency',
        name: 'MyCurrency',
        component: () =>
            import('../views/person/mine/MyCurrency.vue'),
        meta: {
            title: '我的余额'
        },
    },
    {
        path: '/ios-currency',
        name: 'IosCurrency',
        component: () =>
            import('../views/person/mine/IosCurrency.vue'),
        meta: {
            title: '我的余额'
        },
    },
    {
        path: '/my-currency-detail',
        name: 'MyCurrencyDetail',
        component: () =>
            import('../views/person/mine/MyCurrencyDetail.vue'),
        meta: {
            title: '余额明细'
        },
    },
    {
        path: '/my-currency-recharge',
        name: 'MyCurrencyRecharge',
        component: () =>
            import('../views/person/mine/MyCurrencyRecharge.vue'),
        meta: {
            title: '充值'
        },
    },
    {
        path: '/concern',
        name: 'Concern',
        component: () =>
            import('../views/person/Concern.vue'),
        meta: {
            title: '我的关注'
        },
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () =>
            import('../views/person/Collect.vue'),
        meta: {
            title: '我的收藏'
        },
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>
            import('../views/person/order/Order.vue'),
        meta: {
            title: '订单'
        }
    },
    {
        path: '/order-detail',
        name: 'OrderDetail',
        component: () =>
            import('../views/person/order/OrderDetail.vue'),
        meta: {
            title: '订单'
        }
    },
    {
        path: '/coupon',
        name: 'Coupon',
        component: () =>
            import('../views/person/Coupon.vue'),
        meta: {
            title: '优惠券'
        }
    },
    {
        path: '/card',
        name: 'Card',
        component: () =>
            import('../views/person/card/Card.vue'),
        meta: {
            title: '学习卡'
        }
    },
    {
        path: '/exchange',
        name: 'Exchange',
        component: () =>
            import('../views/person/card/Exchange.vue'),
        meta: {
            title: '学习卡兑换'
        }
    },
    {
        path: '/message',
        name: 'Message',
        component: () =>
            import('../views/person/message/Message.vue'),
        meta: {
            title: '消息中心'
        }
    },
    {
        path: '/message-detail',
        name: 'MessageDetail',
        component: () =>
            import('../views/person/message/MessageDetail.vue'),
        meta: {
            title: '消息'
        }
    },
    {
        path: '/options',
        name: 'Options',
        component: () =>
            import('../views/person/Options.vue'),
        meta: {
            title: '设置'
        }
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: () =>
            import('../views/person/Feedback.vue'),
        meta: {
            title: '意见反馈'
        }
    },
    {
        path: '/set-new-pass',
        name: 'SetNewPass',
        component: () =>
            import('../views/login/ForgetPass.vue'),
        meta: {
            title: '设置密码'
        }
    },
    /**
     * 登录设置
     * */
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/login/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/sms-login',
        name: 'SmsLogin',
        component: () =>
            import('../views/login/SmsLogin.vue'),
        meta: {
            title: '验证码登录'
        }
    },
    {
        path: '/forget-pass',
        name: 'ForgetPass',
        component: () =>
            import('../views/login/ForgetPass.vue'),
        meta: {
            title: '忘记密码'
        }
    },
    {
        path: '/bind-mobile',
        name: 'BindMobile',
        component: () =>
            import('../views/login/BindMobile.vue'),
        meta: {
            title: '绑定手机号'
        }
    },
    {
        path: '/set-pass',
        name: 'SetPass',
        component: () =>
            import('../views/login/SetPass.vue'),
        meta: {
            title: '设置密码'
        }
    },
    {
        path: '/set-message',
        name: 'SetMessage',
        component: () =>
            import('../views/login/SetMessage.vue'),
        meta: {
            title: '信息填写'
        }
    },
   
    /** */
   
	/**
     * 题库
     *  */
    {
        path: '/practise',
        name: 'Practise',
        component: () =>
            import('../views/question/Index.vue'),
        meta: {
            footer: true,
            title: '练习',

        }
    },
    {
        path: '/paper-package',
        name: 'PaperPackage',
        component: () =>
            import('../views/question/PaperPackage.vue'),
        meta: {
            title: '套卷练习',

        }
    },
    {
        path: '/ques',
        name: 'Ques',
        component: () =>
            import('../views/question/Question.vue'),
        meta: {
            title: '做题',
        }
    },
    {
        path: '/result',
        name: 'Result',
        component: () =>
            import('../views/question/Result.vue'),
        meta: {
            title: '成绩统计',
        }
    },
    {
        path: '/exam',
        name: 'Exam',
        component: () =>
            import('../views/question/Exam.vue'),
        meta: {
            title: '仿真模考',
        }
    },
    {
        path: '/assess',
        name: 'Assess',
        component: () =>
            import('../views/question/Assess.vue'),
        meta: {
            title: '测评记录',
        }
    },
    {
        path: '/error-ques',
        name: 'ErrorQues',
        component: () =>
            import('../views/question/ErrorQues.vue'),
        meta: {
            title: '错题记录',
        }
    },
    {
        path: '/error-list',
        name: 'ErrorList',
        component: () =>
            import('../views/question/ErrorList.vue'),
        meta: {
            title: '错题练习',
        }
    },
    {
        path: '/ques-collect',
        name: 'QuesCollect',
        component: () =>
            import('../views/question/QuesCollect.vue'),
        meta: {
            title: '习题收藏',
        }
    },
    {
        path: '/point',
        name: 'Point',
        component: () =>
            import('../views/question/Point.vue'),
        meta: {
            title: '考点专练',
        }
    }//题库结束
]

export default routes
