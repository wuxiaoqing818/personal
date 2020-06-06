// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortList: [],
    goodsList: [],
    searchName: "",
    sortId: 88588

  },
  // 搜索
  goSearch: function(e) {
    var _this = this
    console.log(e.detail.value)
    this.setData({
      searchName: e.detail.value
    })
    wx.navigateTo({
      url: "/packageA/pages/search/search?name=" + _this.data.searchName
    })


  },
  //详情页
  goDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: "/packageA/pages/detail/detail?id=" + id
    })

  },
  show: function(e) {
    //获取点击的下标
    // let index = e.currentTarget.dataset.index;
    // console.log(index)
    //遍历让所有flag为false 因为每点一次 需要让其他的text左边框消失  比较麻烦
    // this.data.sortList.forEach((item, i) => {
    //   // console.log(i)
    //   var temp_str = 'sortList[' + i + '].flag';
    //   this.setData({
    //     [temp_str]: false
    //   });
    // })
    // var temp_str = 'sortList[' + index + '].flag';
    // this.setData({
    //   [temp_str]: true
    // });
    // console.log(this.data.sortList)

    //获取点击的categoryId
    let categoryId = e.currentTarget.dataset.id;
    this.setData({
      sortId: categoryId
    })
    let _this = this;
    console.log(categoryId)
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list?categoryId=' + categoryId,
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          goodsList: res.data.data
        })
        // console.log(_this.data.goodsList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取sort列表  并且给每个对象添加flag属性
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/category/all',
      success: function(res) {
        // console.log(res)
        _this.setData({
          sortList: res.data.data
        })
        // _this.data.sortList.forEach((item, i) => {
        //   var temp_str = 'navList[' + i + ']';
        //   _this.setData({
        //     ['temp_str.flag']: false,
        //   })
        // })
      }
    })

    //第一次加载默认显示上衣商品 并改变左边框样式
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list?categoryId=' + 88588,
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          goodsList: res.data.data,
        })
        console.log(_this.data.goodsList)

        //第一次成功加载上衣商品  改变左边框样式
        // _this.data.sortList.forEach((item, i) => {
        //   if (item.name == "上装") {
        //     // console.log(i)
        //     var temp_str = 'sortList[' + i + '].flag';
        //     _this.setData({
        //       [temp_str]: true
        //     });

        //   }

        // })

        // console.log(_this.data.sortList)
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