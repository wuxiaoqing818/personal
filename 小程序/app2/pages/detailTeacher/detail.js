// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: [],
    id: "",
    goodsAttrFlag: false,
    cartList: [],
    showhaibao: false, //隐藏显示
    maskHidden: true, //隐藏显示
    addBuyFlag: false, //控制弹出层下方渲染加入购物车还是购买
    img1: "",
    opID1: "",
    opID2: "",
    opID3: "",
    valID1: "",
    valID2: "",
    valID3: "",
    number: 1,
    goodsPrice: "",
    //老师代码开始
    propertyChildIds: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    // 此处获取设备的宽高。canvas绘制的图片以次宽高为准     
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res) 
        _this.setData({
          windowW: res.windowWidth,
          windowH: res.screenHeight,
        })
      },
    })

    console.log(options.id)
    this.setData({
      id: options.id
    })
    // console.log(this.data.id)
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/detail?id=' + options.id,
      success: function(res) {
        console.log(res)
        if (res.data.data.properties) {
          for (var i = 0; i < res.data.data.properties.length; i++) {
            res.data.data.properties[i].childsCurGoods.forEach((item) => {
              item.active = false
            })
          }


        }
        _this.setData({
          goodsDetail: res.data.data
        })
        // console.log(_this.data.goodsDetail)

      }
    })
    //获取购物车数据 
    _this.requestCart()


    // wx.downloadFile({  
    //     url: 'https://api.it120.cc/wuxiaoqing/shop/goods/detail?id=' + options.id,
    //     success: function (res) {     
    //         console.log(res)     
    //         //缓存商品图片   
    //         _this.setData({
    //           img1: res.tempFilePath
    //         })  

    //     }       
    // })       

    // wx.downloadFile({     
    //     url: 网络图片地址必须要在小程序中配备合法域名,    
    //     success: function (res1) {      
    //         console.log(res1.tempFilePath) 
    //         //缓存二维码图片       
    //         _this.setData({     
    //             img2: res2.tempFilePath  
    //         })      
    //     }      
    // })


  },
  //获取购物车数据 
  requestCart: function() {
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/info',
      data: {
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        // console.log(res)
        _this.setData({
          cartList: res.data.data
        })
        // console.log(_this.data.cartList)
      }
    })

  },
  //分享好友
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: "分享",
      path: '/pages/detail/detail',
      success: function(res) {
        console.log('成功', res)
      }
    }
  },

  //获取商品价格封装函数
  requestPrice: function(a) {
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/wuxiaoqing/shop/goods/price',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        goodsId: _this.data.id,
        propertyChildIds: a,
        token: wx.getStorageSync("token").token
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          _this.setData({
            goodsPrice: res.data.data.price
          })

        }

      }
    })

  },

  //点击规格弹出弹出层
  chooseSize: function() {
    this.setData({
      goodsAttrFlag: true
    })

  },
  cut: function() {
    if (this.data.number <= 1) {
      return false
    } else {
      this.data.number--
    }
    this.setData({
      number: this.data.number
    })


  },
  plus: function() {
    //此处应该还要判断规格库存 总库存
    this.data.number++
      this.setData({
        number: this.data.number
      })

  },
  //点击购买或者加入购物车 判断e.currentTarget.dataset.str
  addBuy: function(e) {
    console.log(e)
    if (e.currentTarget.dataset.str == 'add') {
      this.setData({
        goodsAttrFlag: true,
        addBuyFlag: false
      })
    } else {
      this.setData({
        goodsAttrFlag: true,
        addBuyFlag: true
      })
    }
  },
  //老师的方法做购物车
  labelItemTap: function(e) {
    console.log(e)
    var that = this;
    var propertyid = e.currentTarget.dataset.propertyid;
    var propertychildid = e.currentTarget.dataset.propertychildid;
    var index = e.currentTarget.dataset.idn;
    var idx = e.currentTarget.dataset.idx;
    var active = e.currentTarget.dataset.active;

    //获取价格 格式 4:15,2:10,1:4   sku格式 [{}]
    that.data.propertyChildIds = that.data.propertyChildIds + propertyid + ':' + propertychildid + ','
    console.log(that.data.propertyChildIds)
    console.log(that.data.goodsDetail.properties[idx].childsCurGoods[index])


    //把properties[idx].childsCurGoods[index].active = true;
    if (that.data.goodsDetail.properties[idx].childsCurGoods[index].active == false) {
      that.data.goodsDetail.properties[idx].childsCurGoods.forEach((item) => {
        item.active = false
      })
      that.data.goodsDetail.properties[idx].childsCurGoods[index].active = true;
    } else {
      that.data.goodsDetail.properties[idx].childsCurGoods[index].active = false;
    }


    // if (active == true) {
    //   var obj = {};
    //   obj.optionId = propertyid;
    //   obj.op


    // }

    that.setData({
      goodsDetail: that.data.goodsDetail
    })


  },

  //加入购物车
  addCartTrue: function() {
    let _this = this;
    if (_this.data.goodsDetail.properties.length != arr.length) {
      wx.showToast({
        title: '请选择规格',
      })

    } else {
      wx.request({
        url: 'https://api.it120.cc/wuxiaoqing/shopping-cart/add',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          goodsId: _this.data.id,
          number: _this.data.number,
          sku: JSON.stringify(arr),
          token: wx.getStorageSync("token").token
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '加入购物车',
            })
            _this.setData({
              goodsAttrFlag: false
            })
            _this.requestCart()
          }
        }
      })
    }



  },
  //去确认订单页面
  goOrderConfirm: function() {
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm',
    })

  },
  close: function() {
    this.setData({
      goodsAttrFlag: false
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log(this.data.goodsDetail)  获取不到data 不能在这里生成图片
    // 页面渲染完成
    this.createNewImg();
    //创建初始化图片


  },
  //将金额绘制到canvas的固定 
  setMoney: function(context) {
    var money = '￥29.9'
    context.setFontSize(24);
    context.setFillStyle("red");
    context.fillText(money, 40, 360);
    context.stroke();
  }, //将说明绘制到canvas固定    
  setSuoming: function(context) {
    var Suoming = "点击预览"
    context.setFontSize(15);
    context.setFillStyle("#484a3d");
    context.fillText(Suoming, 15, 460);
    context.stroke();
  }, //将说明2绘制到canvas固定   
  setSuoming1: function(context) {
    var Suoming = "点击长按识别保存"
    context.setFontSize(15);
    context.setFillStyle("#484a3d");
    context.fillText(Suoming, 15, 510);
    context.stroke();
  }, //将标题绘制到canvas的固定   
  setName: function(context) {
    var name = "夏季新款蕾丝短袖连衣裙"
    context.setFontSize(15);
    context.setFillStyle("#67695b");
    context.fillText(name, 40, 320);
    context.stroke();
  }, //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src   
  createNewImg: function() {
    var _this = this;
    var context = wx.createCanvasContext("mycanvas");
    context.setFillStyle('#FFF')
    console.log(this.data.windowW, this.data.windowH)
    context.fillRect(0, 0, this.data.windowW, this.data.windowH)
    var path = "/images/home.png";
    var path2 = "/images/wxq_logo.png";
    //详细看onLoad函数注释部分       
    context.drawImage(path, 10, 20, 300, 250);
    //这里是商品图片      
    this.setSuoming(context);
    this.setName(context);
    this.setMoney(context);
    this.setSuoming1(context);
    context.drawImage(path2, 170, 430, 150, 150);
    //这里是二维码图片       
    context.draw(_this.getImg())
  },
  //将生成好的图片保存到本地  下面这句注释是文档中的原话。    
  // tip: 在 draw 回调里调用canvasToTempFilePath方法才能保证图片导出成功。
  getImg() {
    var _this = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function success(res) {
        _this.setData({
          imagePath: res.tempFilePath,
        });
      }
    });
  },
  //点击图片进行预览，长按保存分享图片  
  previewImg: function(e) {
    var img = this.data.imagePath
    wx.previewImage({
      current: img,
      // 当前显示图片的http链接           
      urls: [img]
      // 需要预览的图片http链接列表   
    })
  },
  gotoSubmit: function(e) {
    var _this = this
    this.setData({
      maskHidden: false,
      showhaibao: true
    })
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 2000
    });
    setTimeout(function() {
      wx.hideToast()
      _this.createNewImg();
    }, 2000)


  },
  cancelBanner: function() {
    this.setData({
      maskHidden: true,
      showhaibao: false
    })

    wx.showToast({
      title: '取消保存...',
      icon: 'loading',
      duration: 500
    });
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