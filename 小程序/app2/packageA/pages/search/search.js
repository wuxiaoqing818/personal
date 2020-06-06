// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: false,
    list: []

  },
  find1: function() {
    this.setData({
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: false
    })

  },
  find2: function() {
    this.setData({
      flag2: true,
      flag1: false,
      flag3: false,
      flag4: false
    })

  },
  find3: function() {
    this.setData({
      flag3: true,
      flag1: false,
      flag2: false,
      flag4: false
    })

    this.data.list.sort(function(a, b) {
      return b.numberSells - a.numberSells
    })
    this.setData({
      list: this.data.list
    })
  },
  find4: function() {
    //改变字体颜色
    this.setData({
      flag4: true,
      flag1: false,
      flag2: false,
      flag3: false
    })
    //价格排序
    this.data.list.sort(function(a, b) {
      return b.minPrice - a.minPrice
    })

    this.setData({
      list: this.data.list
    })

  },
  //搜索页的搜索
  goSearch: function(e) {
    //获取到input的value
    // console.log(e.detail.value)
    var _this = this
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list?nameLike=' + e.detail.value,
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序  
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          list: res.data.data
        })
        // console.log(_this.data.list)
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.name

    })
    // console.log(this.data.name)
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list?nameLike=' + options.name,
      success: function(res) {
        console.log(res)
        //因为后台接口数据id从大往小 根据id排序  首页sort不报红 搜索页报在成功回调不认识sort 但是有效果
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          list: res.data.data
        })
        // console.log(_this.data.list)
      }
    })
    //获取点击分类渲染数据  不用name参数是因为效果会冲突 input会改变值
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list?nameLike=' + options.name2,
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          list: res.data.data
        })
        // console.log(_this.data.list)
      }
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