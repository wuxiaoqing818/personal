// pages/cart/cart.js
const api = require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    startX: 0, //开始坐标
    startY: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //此处不能读取购物车数据  因为该函数只加载一次  再添加商品再进入不会重新请求

  },
  //选择商品
  checkGoods(e) {
    var index = e.currentTarget.dataset.index
    console.log(e)
    var str = 'list.items[' + index + '].flag'
    this.setData({
      [str]: !this.data.list.items[index].flag
    })
    console.log(this.data.list.items)


  },
  cut: function(e) {
    console.log(e)
    let _this = this;
    if (e.currentTarget.dataset.num <= 1) {
      return false
    } else {
      e.currentTarget.dataset.num-- //当前绑定的数量减一
        var index = e.currentTarget.dataset.index //当前绑定的点击的商品下标
      console.log(e.currentTarget.dataset.num)
      console.log(e.currentTarget.dataset.index)
      wx.request({
        url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/modifyNumber',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          key: e.currentTarget.dataset.key,
          number: e.currentTarget.dataset.num,
          token: wx.getStorageSync("token").token
        },
        success: function(res) {
          console.log(res)
          //成功让当前的商品数量改变  改变试图
          var temp_str = 'list.items[' + index + '].number';
          _this.setData({
            [temp_str]: e.currentTarget.dataset.num
          });
          //成功改变data总价 改变视图
          var jia = 'list.price';
          _this.setData({
            [jia]: _this.data.list.price - _this.data.list.items[index].price
          });
        }
      })
    }


  },
  plus: function(e) {
    console.log(e)
    let _this = this;
    e.currentTarget.dataset.num++ //当前绑定的数量加一
      var index = e.currentTarget.dataset.index //当前绑定的点击的商品下标
    console.log(e.currentTarget.dataset.num)
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/modifyNumber',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        key: e.currentTarget.dataset.key,
        number: e.currentTarget.dataset.num,
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        console.log(res)
        //成功让当前的商品数量改变  改变试图
        var temp_str = 'list.items[' + index + '].number';
        _this.setData({
          [temp_str]: e.currentTarget.dataset.num
        });
        //成功改变data总价 改变视图
        var jia = 'list.price';
        _this.setData({
          [jia]: _this.data.list.price + _this.data.list.items[index].price
        });
      }
    })
  },
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.list.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.list.items.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  async remove(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let list = that.data.list;
    console.log(e)
    wx.showModal({
      title: '温馨提示！',
      content: '你确认删除吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('444')
          wx.request({
            url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/remove',
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              key: e.currentTarget.dataset.key,
              token: wx.getStorageSync("token").token
            },
            success: function(res) {
              console.log(res)
              list.items.splice(index, 1)
              var price = e.currentTarget.dataset.price * e.currentTarget.dataset.num
              //必须这样改变不知道为什么
              var jia = 'list.price';
              if (list.items == '') {
                that.setData({
                  list: []
                })
              } else {
                that.setData({
                  list: list,
                  [jia]: list.price - price
                })
              }
              console.log(list)
            }
          })

          //封装后的请求
          // var res = await api.cartRemove({
          //   key: e.currentTarget.dataset.key,
          //   token: wx.getStorageSync("token").token
          // })
          // console.log(res)
          // list.items.splice(index, 1)
          // var price = e.currentTarget.dataset.price * e.currentTarget.dataset.num
          // //必须这样改变不知道为什么
          // var jia = 'list.price';
          // that.setData({
          //   list: list,
          //   [jia]: list.price - price
          // })
          // console.log(list)

        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  //去结算
  goOrder() {
    var arr = []
    var type = '购物车'
    this.data.list.items.forEach(item => {
      if (item.flag) {
        arr.push(item)
      }
    })
    console.log(arr)
    wx.navigateTo({
      url: '/packageB/pages/orderConfirm/orderConfirm?arr=' + JSON.stringify(arr) + '&type=' + type,
    })

  },
  //点击去逛逛
  goHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })

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
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/info',
      data: {
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 700) {
          _this.setData({
            list: []
          })
        }
        if (res.data.code == 0) {
          res.data.data.items.forEach(item => {
            item.flag = false
          })
          _this.setData({
            list: res.data.data
          })
        }

        console.log(_this.data.list)
      }
    })

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