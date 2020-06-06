// pages/addressAdd/addressAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '',
    region: [],
    id: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.id) {
      let _this = this;
      _this.setData({
        id: options.id
      })
      wx.request({
        url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/detail/v2',
        data: {
          id: options.id,
          token: wx.getStorageSync("token").token
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 0) {
            var list = res.data.data.info
            _this.setData({
              name: list.linkMan,
              phone: list.mobile,
              address: list.address,
              region: [list.provinceId, list.cityId, list.districtId]
            })

          }
        }
      })

    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getName: function(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  getPhone: function(e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  getAddress: function(e) {
    console.log(e)
    this.setData({
      address: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    // console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  save: function() {
    let _this = this;
    let regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (_this.data.name == '') {
      wx.showToast({
        title: '请填写联系人',
      })
    } else if (_this.data.phone == '') {
      wx.showToast({
        title: '请填写手机号码',
      })
    } else if (!regPhone.test(_this.data.phone)) {
      wx.showToast({
        title: '手机号码格式不对',
      })
    } else if (_this.data.region == '') {
      wx.showToast({
        title: '请选择地区',
      })
    } else if (_this.data.address == '') {
      wx.showToast({
        title: '请填写详细地址',
      })
    } else if (_this.data.id == '') {
      //添加收货地址
      wx.request({
        url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/add',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          address: _this.data.address,
          linkMan: _this.data.name,
          mobile: _this.data.phone,
          provinceId: _this.data.region[0],
          cityId: _this.data.region[1],
          districtId: _this.data.region[2],
          token: wx.getStorageSync("token").token,
          isDefault: true
        },
        success: function(res) {
          // console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '添加成功',
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    } else if (_this.data.id != '') {
      //修改收货地址
      wx.request({
        url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/update',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: _this.data.id,
          address: _this.data.address,
          linkMan: _this.data.name,
          mobile: _this.data.phone,
          provinceId: _this.data.region[0],
          cityId: _this.data.region[1],
          districtId: _this.data.region[2],
          token: wx.getStorageSync("token").token,
          isDefault: true
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
            })
            
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })

    }




  },

  delAddress: function() {
    let _this = this;
    //删除收货地址
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/user/shipping-address/delete',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: _this.data.id,

        token: wx.getStorageSync("token").token,

      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {



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