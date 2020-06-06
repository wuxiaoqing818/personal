// pages/orderConfirm/orderConfirm.js
const api = require('../../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: [], //详情页商品信息
    sizeData: [], //详情页传过来的商品信息
    number: '', //详情页数量
    goodsPrice: '', //详情页价格  也是总价
    addressDefault: [], //默认地址数据
    item: '',
    flag1: true,
    flag2: false,
    remarks: '', //备注
    cartList: [], //购物车数据
    type: '', //判断详情页还是购物车页的页面
    allPrice: '', //全部价格
    peisongType: '' //配送类型，kd 代表快递；zq代表到店自取； keloop 快跑者



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //type决定详情页跳转还是购物车页跳转
    this.setData({
      type: options.type
    })
    //循环遍历购物车所有商品  计算总价
    if (options.arr) {
      var num = 0
      JSON.parse(options.arr).forEach(item => {
        num += item.price * item.number
      })
      this.setData({
        cartList: JSON.parse(options.arr),
        allPrice: num //总价赋给goodsPrice
      })
    }
    // console.log(this.data.cartList)
    if (this.data.type == '详情页') {
      if (options.sizeData) {
        console.log(options.number)
        console.log(options.number)
        console.log(options.number)
        this.setData({
          goodsDetail: JSON.parse(options.goodsDetail),
          sizeData: JSON.parse(options.sizeData),
          number: options.number,
          goodsPrice: options.goodsPrice,
          allPrice: options.goodsPrice * options.number
        })
        // console.log(this.data.goodsDetail)
      } else {
        this.setData({
          goodsDetail: JSON.parse(options.goodsDetail),
          number: options.number,
          goodsPrice: options.goodsPrice,
          allPrice: options.goodsPrice * options.number
        })
      }
    }



    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/default/v2',
      data: {
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        // console.log(res)
        if (res.data.code == 0) {
          _this.setData({
            addressDefault: res.data.data.info
          })
        }
      }
    })



  },
  sendWay1() {
    this.setData({
      flag1: true,
      flag2: false
    })

  },
  sendWay2() {
    this.setData({
      flag1: false,
      flag2: true
    })

  },
  pickAddress: function() {
    wx.navigateTo({
      url: '/pages/addressCheck/addressCheck',
    })

  },

  //获取备注
  getRemarks(e) {
    this.setData({
      remarks: e.detail.value
    })


  },

  //订单提交 提交订单
  orderSubmit() {
    let _this = this;
    //配送的方式
    if (_this.data.flag1) {
      _this.setData({
        peisongType: 'kd'
      })
    } else if (_this.data.flag2) {
      _this.setData({
        peisongType: 'zq'
      })
    }

    if (_this.data.type == '详情页') {
      if (_this.data.sizeData == '') {
        var arr = []
        var obj = {
          goodsId: _this.data.goodsDetail.basicInfo.id,
          number: _this.data.number,
          logisticsType: 0,
          // days: ["2020-02-25"]
        }
        arr.push(obj)

      }
      if (_this.data.sizeData != '') {
        var arr = []
        var obj = {
          goodsId: _this.data.sizeData.goodsId,
          number: _this.data.number,
          propertyChildIds: _this.data.sizeData.propertyChildIds,
          logisticsType: 0,
          // days: ["2020-02-25"]
        }
        arr.push(obj)

      }

    }

    if (_this.data.type == '购物车') {
      var arr = []
      _this.data.cartList.forEach(item => {
        var obj = {}
        obj.goodsId = item.goodsId
        obj.number = item.number
        if (item.sku) {
          var str = ''
          item.sku.forEach(it => {
            str += it.optionId + ':' + it.optionValueId + ','
          })
          console.log(str)
          obj.propertyChildIds = str
        }
        obj.logisticsType = 0
        // obj.days = ["2020-02-25"]
        arr.push(obj)
      })
      console.log(arr)

    }

    _this.orderAdd(arr)

  },

  orderAdd(a) {
    let _this = this
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/order/create',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        goodsJsonStr: JSON.stringify(a), //商品信息
        address: _this.data.addressDefault.address, //详细地址
        provinceId: _this.data.addressDefault.provinceId, //收货地址省份编码汉字
        cityId: _this.data.addressDefault.cityId, //收货城市编码汉字
        districtId: _this.data.addressDefault.districtId, //收货地址区县编码汉字
        linkMan: _this.data.addressDefault.linkMan, //收货联系人
        mobile: _this.data.addressDefault.mobile, //收货手机号码
        remark: _this.data.remarks, //下单备注信息
        peisongType: _this.data.peisongType, //配送类型，kd 代表快递；zq代表到店自取； keloop 快跑者
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          //提交订单成功删除购物车商品
          _this.data.cartList.forEach(item => {
            _this.cartRemoveGoods(item.key)
          })

          wx.showToast({
            title: '提交成功',
          })
          wx: wx.redirectTo({
            url: '/packageB/pages/order/order',
          })
        }
      }
    })



  },
  //删除添加订单中的购物车商品
  async cartRemoveGoods(a) {
    //封装后的请求
    var res = await api.removeGoods({
      key: a,
      token: wx.getStorageSync("token").token
    })
    if (res.data.code == 0) {
      console.log("删除成功")
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
    //返回该页面  将传过来的地址  赋给当前地址  就是返回上一级页面并刷新效果
    let that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.selAddress == "") {
      that.getUserAddress(that.data.userId);
    } else {
      that.setData({ //将携带的参数赋值
        addressDefault: currPage.data.item
      });
      console.log(that.data.addressDefault)
    }

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})