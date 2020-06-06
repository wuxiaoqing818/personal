//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [],
    searchName: '',
    sortList: [],
    bannerList: [],
    noticeList: [],
    cutList: [],
    groupList: [],
    page: 1,
    pageSize: 10,
    footer: ""
  },
  onShow: function() {
    // var userInfo = wx.getStorageSync("userInfo").userInfo
    // if (!userInfo) {
    //   console.log("111111")
    //   wx.switchTab({
    //     url: '../my/my',
    //   })
    // } else {
    //   console.log("成功")
    // }
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // 搜索
  goSearch: function(e) {
    var _this = this
    // console.log(e.detail.value)
    this.setData({
      searchName: e.detail.value
    })
    wx.navigateTo({
      url: "/packageA/pages/search/search?name=" + _this.data.searchName
    })


  },
  //分类搜索
  sortSearch: function(e) {
    var _this = this
    console.log(e.currentTarget.dataset.name)

    wx.navigateTo({
      url: "/packageA/pages/search/search?name2=" + e.currentTarget.dataset.name
    })


  },

  //详情页
  goDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: "/packageA/pages/detail/detail?id=" + id
    })

  },
  //去砍价
  goCut: function(e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: "/packageA/pages/cut/cut?id=" + id
    })

  },
  //去拼团
  goGroup: function(e) {
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: "/packageA/pages/group/group?id=" + id
    })

  },
  onLoad: function(options) {
    let _this = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取商品列表调用函数
    _this.requestGoods()


    //获取砍价商品
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list',
      data: {
        categoryId: 88516,
      },
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          cutList: res.data.data
        })
      }
    })
    //获取拼团商品
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list',
      data: {
        categoryId: 88517,
      },
      success: function(res) {
        // console.log(res)
        //因为后台接口数据id从大往小 根据id排序
        res.data.data.sort(function(a, b) {
          return a.id - b.id;
        });
        _this.setData({
          groupList: res.data.data
        })
      }
    })
    //获取分类
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/category/all',
      success: function(res) {
        // console.log(res)
        _this.setData({
          sortList: res.data.data
        })

      }
    })
    //获取轮播
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/banner/list',
      success: function(res) {
        // console.log(res)
        _this.setData({
          bannerList: res.data.data
        })

      }
    })
    //获取公告
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/notice/list',
      success: function(res) {
        // console.log(res)
        _this.setData({
          noticeList: res.data.data.dataList
        })

      }
    })
  },
  requestGoods: function() {
    let _this = this
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/list',
      data: {
        page: _this.data.page,
        pageSize: _this.data.pageSize
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          //因为后台接口数据id从大往小 根据id排序
          res.data.data.sort(function(a, b) {
            return a.id - b.id;
          });

          _this.setData({
            list: _this.data.list.concat(res.data.data)
          })
          console.log(_this.data.list)
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
      }
    })

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
      _this.requestGoods(); //重新调用请求获取下一页数据
    }, 1000)

  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }

})