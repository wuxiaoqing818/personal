// pages/order/order.js
const api = require('../../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
        id: 0,
        name: "待付款",
        flag: false
      },
      {
        id: 1,
        name: "待发货",
        flag: false
      },
      {
        id: 2,
        name: "待收货",
        flag: false
      },
      {
        id: 3,
        name: "待评价",
        flag: false
      },
      {
        id: 4,
        name: "已完成",
        flag: false
      }
    ],
    navId: 0,
    orderList: {},
    page: 1,
    pageSize: 5,
    footer: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //改变nav点击的样式
  navTap(e) {
    this.setData({
      navId: e.currentTarget.dataset.id
    })

  },
  //获取订单列表
  async orderList(a) {
    let _this = this
    //封装后的请求
    var res = await api.orderList({
      page: _this.data.page,
      pageSize: _this.data.pageSize,
      token: wx.getStorageSync("token").token
    })
    if (res.data.code == 0) {
      //给商品添加总价  总数属性  方便样式
      for (var i in res.data.data.goodsMap) {
        res.data.data.goodsMap[i].forEach(it => {
          it.allPrice = it.amount++
            it.allNumber = it.number++
        })
        // console.log(i)
      }

      //此处用的是对象的拼接  商品数据变了  后台第一页是大的id在前
      _this.setData({
        orderList: Object.assign(_this.data.orderList, res.data.data.goodsMap)
      })
      _this.setData({
        footer: "加载完成..."
      })
      setTimeout(function() {
        _this.setData({
          footer: ""
        })
      }, 1000)
    }
    if (res.data.code == 700) {
      _this.setData({
        footer: "暂无数据..."
      })
      setTimeout(function() {
        _this.setData({
          footer: ""
        })
      }, 1000)

    }

  },
  //取消订单
  cancelOrder(e) {
    console.log(e)
    let _this = this
    wx.showModal({
      title: '温馨提示！',
      content: '你确认取消该订单吗？',
      success: function(res) {
        if (res.confirm) {
          _this.removeOrder(e.currentTarget.dataset.orderid)
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

  //取消订单封装
  async removeOrder(a) {
    var res = await api.orderCancel({
      orderId: a,
      token: wx.getStorageSync("token").token
    })
    if (res.data.code == 0) {
      this.orderList()
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this;
    if (_this.data.navId == 0) {
      _this.orderList()

    }

  },
  onReachBottom: function() { //触底开始下一页
    console.log("111")
    var _this = this;
    var pageNum = _this.data.page + 1; //获取当前页数并+1
    _this.setData({
      page: pageNum, //更新当前页数
    })
    _this.setData({
      footer: "正在加载新内容..."
    })
    setTimeout(function() {
      _this.orderList(); //重新调用请求获取下一页数据
    }, 1000)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})