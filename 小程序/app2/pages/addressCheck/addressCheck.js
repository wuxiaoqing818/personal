// pages/addressCheck/addressCheck.js
const api = require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []


  },
  addressAdd: function() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  changeAddress: function(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd?id=' + e.currentTarget.dataset.id,
    })

  },
  pickAddress: function(e) {
    //选择收货地址
    let _this = this;
    let item = e.currentTarget.dataset.item
    console.log(e)
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/update',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: item.id,
        address: item.address,
        linkMan: item.linkMan,
        mobile: item.mobile,
        provinceId: item.provinceId,
        cityId: item.cityId,
        districtId: item.districtId,
        token: wx.getStorageSync("token").token,
        isDefault: true
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          let pages = getCurrentPages(); //当前页面
          let prevPage = pages[pages.length - 2]; //上一页面
          prevPage.setData({ //直接给上移页面赋值
            item: e.currentTarget.dataset.item,
            selAddress: 'yes'
          });
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })


  },
  async addressAll() {

    //封装后的请求
    var res = await api.addressAll({
      token: wx.getStorageSync("token").token
    })
    if (res.data.code == 0) {
      this.setData({
        list: res.data.data
      })

    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.addressAll()
    //所有收货地址
    // let _this = this;
    // wx.request({
    //   url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/list',
    //   data: {
    //     token: wx.getStorageSync("token").token
    //   },
    //   success: function(res) {
    //     console.log(res)
    //     _this.setData({
    //       list: res.data.data
    //     })
    //   }
    // })

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