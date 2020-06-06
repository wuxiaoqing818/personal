import Vue from 'vue'
import Router from 'vue-router'
import { constants } from 'os';

// 登录相关
const Login = resolve => require(['@/pages/loginAbout/Login.vue'], resolve)// 登录
const Register = resolve => require(['@/pages/loginAbout/Register.vue'], resolve)// 注册
const RetrievePass = resolve => require(['@/pages/loginAbout/RetrievePass.vue'], resolve)// 忘记密码
const ChooseShop = resolve => require(['@/pages/loginAbout/ChooseShop.vue'], resolve)// 选择店铺（店铺列表）
const CreateCategory = resolve => require(['@/pages/loginAbout/CreateCategory.vue'], resolve)// 创建品牌
const PersonalCenter = resolve => require(['@/pages/loginAbout/PersonalCenter.vue'], resolve)// 个人中心
const UpdatePass = resolve => require(['@/pages/loginAbout/UpdatePass.vue'], resolve)// 修改密码
const CreateShop = resolve => require(['@/pages/loginAbout/CreateShop.vue'], resolve)// 创建门店
// 首页（侧边栏）
const Index = resolve => require(['@/Index.vue'], resolve)

// 控制台
const Console = resolve => require(['@/pages/console/Console.vue'], resolve)

// 预约管理相关
const AppoIndex = resolve => require(['@/pages/appointment/AppoIndex.vue'], resolve)//预约tab，主页
const AppoTime = resolve => require(['@/pages/appointment/AppoTime.vue'], resolve)//预约时间表
const AppoList = resolve => require(['@/pages/appointment/AppoList.vue'], resolve)//预约客户列表
const AppoAdd = resolve => require(['@/pages/appointment/AppoAdd.vue'], resolve)//新增预约

// 订单管理页面
const OrderIndex = resolve => require(['@/pages/orderManagement/OrderIndex.vue'], resolve)//订单tab，主页
// 服务订单
const ServiceOrder = resolve => require(['@/pages/orderManagement/ServiceOrder.vue'], resolve)//服务订单列表
const ServiceDetail = resolve => require(['@/pages/orderManagement/ServiceDetail.vue'], resolve)//服务订单详情

// 开单(服务订单)
const ChoosePerson = resolve => require(['@/pages/createOrder/ChoosePerson.vue'], resolve)//选择开单人
const ChooseService = resolve => require(['@/pages/createOrder/ChooseService.vue'], resolve)//选择服务项目

// 产品订单
const ProductOrder = resolve => require(['@/pages/orderManagement/ProductOrder.vue'], resolve)
// 卡项订单
const CardOrder = resolve => require(['@/pages/orderManagement/CardOrder.vue'], resolve)

// 客户中心
const CustomerIndex  = resolve => require(['@/pages/customerCenter/CustomerIndex.vue'], resolve)
// 客户列表
const CustomerList  = resolve => require(['@/pages/customerCenter/CustomerList.vue'], resolve)//客户列表

// 员工中心
const StaffIndex = resolve => require(['@/pages/staffCenter/StaffIndex.vue'], resolve)
// 员工列表
const StaffList = resolve => require(['@/pages/staffCenter/StaffList.vue'], resolve)//员工列表
const StaffAdd= resolve => require(['@/pages/staffCenter/StaffAdd.vue'], resolve)//新增员工
// 员工档案相关
const StaffRecord = resolve => require(['@/pages/staffCenter/StaffRecord.vue'], resolve)//员工档案
const RecordDynamic = resolve => require(['@/pages/staffCenter/RecordDynamic.vue'], resolve)//作品动态
const RecordIntroduce = resolve => require(['@/pages/staffCenter/RecordIntroduce.vue'], resolve)//个人介绍
const RecordRate = resolve => require(['@/pages/staffCenter/RecordRate.vue'], resolve)//服务评价
const RecordService = resolve => require(['@/pages/staffCenter/RecordService.vue'], resolve)//相关服务

// 商品管理
const GoodsIndex = resolve => require(['@/pages/goodsManagement/GoodsIndex.vue'], resolve)//商品管理 主页面
// 服务管理
const ServiceList = resolve => require(['@/pages/goodsManagement/ServiceList.vue'], resolve)//服务列表
const ServiceAdd = resolve => require(['@/pages/goodsManagement/ServiceAdd.vue'], resolve)//新增服务
// 商品回收站
const Recycle = resolve => require(['@/pages/goodsManagement/Recycle.vue'], resolve)//商品回收站 列表

// 店铺管理
const ShopIndex = resolve => require(['@/pages/shopManagement/ShopIndex.vue'], resolve)//店铺管理 主页面
// 网店装修
const ShopDecorate = resolve => require(['@/pages/shopManagement/ShopDecorate.vue'], resolve)//网店装修 主页面
const BasicInfo = resolve => require(['@/pages/shopManagement/BasicInfo.vue'], resolve)//网店装修 基本资料


// 设置中心
const SetIndex = resolve => require(['@/pages/setUp/SetIndex.vue'], resolve)//设置中心 主页面
// 预约设置
const AppointSet = resolve => require(['@/pages/setUp/AppointSet.vue'], resolve)//预约设置 主页面
const QuickSet = resolve => require(['@/pages/setUp/QuickSet.vue'], resolve)//预约设置 快捷设置
const ScheduleSet = resolve => require(['@/pages/setUp/ScheduleSet.vue'], resolve)//预约设置 排班设置

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {path:'/',component:Login},
    {path:'/register',component:Register},
    {path:'/retrieve-pass',component:RetrievePass},
    {path:'/choose-shop',component:ChooseShop},
    {path:'/create-category',component:CreateCategory},
    {path:'/personal-center',component:PersonalCenter},//个人中心
    {path:'/update-pass',component:UpdatePass},
    {path:'/create-shop',component:CreateShop},
    // 新增预约
    {path:'/appo-add',component:AppoAdd},
    // 服务订单详情
    {path:'/service-detail',component:ServiceDetail},
    // 开单 选择开单人
    {path:'/choose-person',component:ChoosePerson},
    // 开单 选择服务项目
    {path:'/choose-service',component:ChooseService},
    // 员工档案
    {
      path:'/staff-record',
      name:StaffRecord,
      component:StaffRecord,
      children:[
        {path:'/staff/record-dynamic',component:RecordDynamic},
        {path:'/staff/record-introduce',component:RecordIntroduce},
        {path:'/staff/record-rate',component:RecordRate},
        {path:'/staff/record-service',component:RecordService}
      ],
      redirect:'/staff/record-introduce'
    },
    // 新增员工
    {path:'/staff-add',component:StaffAdd},
    // 新增服务
    {path:'/service-add',component:ServiceAdd},
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        // 控制台
        {path:'/console',name: 'Console',component: Console},
        // 预约管理
        {
          path:'/appo',
          name:'AppoIndex',
          component: AppoIndex,
          children:[
            {path:'/appo/appo-time',component:AppoTime},
            {path:'/appo/appo-list',component:AppoList}
          ],
          redirect:'/appo/appo-time'
        },
        // 订单
        {
          path:'/order',
          name:'OrderIndex',
          component:OrderIndex,
          children:[
            {path:'/order/service-order',component:ServiceOrder},
            {path:'/order/product-order',component:ProductOrder},
            {path:'/order/card-order',component:CardOrder}
          ],
          redirect:'/order/service-order'
        },
        // 客户中心
        {
          path:'/customer',
          name:'CustomerIndex',
          component:CustomerIndex,
          children:[
            {path:'/customer/customer-list',component:CustomerList}
          ],
          redirect:'/customer/customer-list'
        },
        // 员工中心
        {
          path:'/staff',
          name:'StaffIndex',
          component:StaffIndex,
          children:[
            {path:'/staff/staff-list',component:StaffList}
          ],
          redirect:'/staff/staff-list'
        },
        //商品管理
        {
          path:'/goods',
          name:'GoodsIndex',
          component:GoodsIndex,
          children:[
            {path:'/goods/service-list',component:ServiceList}
          ],
          redirect:'/goods/service-list'
        },
        // 商品回收站
        {path:'/goods/goods-recycle',component:Recycle},
        // 店铺管理
        {
          path:'/shop',
          name:'ShopIndex',
          component:ShopIndex,
          children:[
            {
              path:'/shop/shop-decorate',
              component:ShopDecorate,
              children:[
                {path:'/shop/shop-decorate/basic-info',component:BasicInfo}
              ],
              redirect:'/shop/shop-decorate/basic-info'
            }
          ],
          redirect:'/shop/shop-decorate/basic-info'
        },
        // 设置中心
        {
          path:'/setting',
          name:'SetIndex',
          component: SetIndex,
          children:[
            {
              path:'/setting/appoint-set',
              component:AppointSet,
              children:[
                {path:'/setting/appoint-set/qiuck-set',component:QuickSet},
                {path:'/setting/appoint-set/schedule-set',component:ScheduleSet}
              ],
              redirect:'/setting/appoint-set/qiuck-set'
            }
          ],
          redirect:'/setting/appoint-set/qiuck-set'
        }
      ],
      redirect:'/console'
    }
  ]
})
