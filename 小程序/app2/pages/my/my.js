// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: true,
    isLogin: false,
    userInfo: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载页面获取用户数据
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing//user/detail',
      data: {
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        // console.log(res)
        if (res.data.code == 0) {
          _this.setData({
            userInfo: res.data.data.base
          })
          _this.setData({
            isLogin: true
          })

        }

      }
    })



  },
  bindGetUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync("userInfo", e.detail)
      //授权成功调用登录
      this.myLogin()
    } else if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      return false
    }

  },
  myLogin: function() {
    let _this = this
    //调用wx.login换取code发送给开发后台换取token 没注册去注册
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.it120.cc/wuxiaoqing/user/wxapp/login',
            data: {
              code: res.code
            },
            success: function(res) {
              // console.log(res)
              //此处判断客户是否注册
              if (res.data.code == 10000) {
                _this.myRegister()
              } else if (res.data.code == 0) {
                //登陆保存信息token  并且请求用户信息
                wx.setStorageSync("token", res.data.data)
                wx.request({
                  url: 'https://api.it120.cc/wuxiaoqing//user/detail',
                  data: {
                    token: wx.getStorageSync("token").token
                  },
                  success: function(res) {
                    // console.log(res)
                    if (res.data.code == 0) {
                      _this.setData({
                        userInfo: res.data.data.base
                      })
                      _this.setData({
                        isLogin: true
                      })

                    }
                    //登陆成功可以跳转到启动页  不同的项目不同的逻辑
                    wx.navigateTo({
                      url: '../start/start',
                    })
                    wx.showToast({
                      title: '登陆成功',
                    })

                  }
                })



              }
            }
          })
        } else {
          console.log("登陆失败！" + res.errMsg)
        }
      }

    })
  },
  myRegister: function() {
    let _this = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.it120.cc/wuxiaoqing/user/wxapp/register/complex',
            data: {
              code: res.code,
              encryptedData: wx.getStorageSync("userInfo").encryptedData,
              iv: wx.getStorageSync("userInfo").iv
            },
            success: function(res) {
              console.log("成功")
              _this.myLogin()
            }
          })

        }
      }
    })

  },
  goOrder: function() {
    wx.navigateTo({
      url: "/packageB/pages/order/order"
    })

  },
  goAddress: function() {
    wx.navigateTo({
      url: "../addressCheck/addressCheck"
    })

  },
  quitLogin: function() {
    let _this = this;
    wx.clearStorageSync()
    wx.showLoading({
      title: '退出成功',
    })

    setTimeout(function() {
      wx.hideLoading();
      _this.setData({
        isLogin: false
      })
    }, 500)
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
    var userInfo = wx.getStorageSync("userInfo").userInfo
    if (!userInfo) {
      wx.showModal({
        title: '温馨提示！',
        content: '拜托！请先登录！',
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定")
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      console.log("成功")
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