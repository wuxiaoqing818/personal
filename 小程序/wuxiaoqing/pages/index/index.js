//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phoneNum: "17639263196",
    email: "wuxiaoqing_818@163.com",
    work: "全栈开发",
    showhaibao: false, //隐藏显示
    maskHidden: true //隐藏显示

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //拨打电话
  call: function() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNum,
    })
  },
  //邮箱复制
  emailPaste: function() {
    var that = this
    wx.setClipboardData({
      data: that.data.email,
      success: function(res) {
        wx.showToast({
          title: '内容已复制',
        })
      }
    })

  },
  //职业复制
  workPaste: function() {
    var that = this
    wx.setClipboardData({
      data: that.data.work,
      success: function(res) {
        wx.showToast({
          title: '内容已复制',
        })
      }
    })

  },

  //保存电话
  savePhone: function() {
    // console.log("11")
    wx.addPhoneContact({
      firstName: '吴晓晴', //联系人姓名
      mobilePhoneNumber: this.data.phoneNum, //联系人手机号  
    })
  },
  //分享好友

  onShareAppMessage: function(res) {
    if (res.from === 'view') {
      console.log(res.target)
    }
    return {
      title: "分享",
      // imgUrl: "images/mingpian_active.png",
      path: '/pages/index/index',
      success: function(res) {
        console.log('成功', res)
      }
    }
  },

  onLoad: function() {
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
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        _this.setData({
          windowW: res.windowWidth,
          windowH: res.screenHeight,
        })
      },
    })

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function() {
    // 页面渲染完成
    this.createNewImg();
    //创建初始化图片
  },
  //将金额绘制到canvas的固定
  setMoney: function(context) {
    var money = '邮箱：wuxiaoqing_818@163.com'
    context.setFontSize(18);
    context.setFillStyle("red");
    context.fillText(money, 54, 360);
    context.stroke();
  },
  //将说明绘制到canvas固定
  setSuoming: function(context) {
    var Suoming = "长按识别小程序码访问"
    context.setFontSize(18);
    context.setFillStyle("#1296db");
    context.fillText(Suoming, 15, 460);
    context.stroke();
  },
  //将说明2绘制到canvas固定  
  setSuoming1: function(context) {
    var Suoming = "Web前端吴晓晴"
    context.setFontSize(24);
    context.setFillStyle("#484a3d");
    context.fillText(Suoming, 40, 510);
    context.stroke();
  },
  //将说明3绘制到canvas固定  
  setSuoming2: function (context) {
    var Suoming = "！点击放大后长按保存转发"
    context.setFontSize(24);
    context.setFillStyle("#f4ea2a");
    context.fillText(Suoming, 34, 660);
    context.stroke();
  },
  //将标题绘制到canvas的固定
  setName: function(context) {
    var name = "电话：17639263196"
    context.setFontSize(20);
    context.setFillStyle("#67695b");
    context.fillText(name, 56, 320);
    context.stroke();
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src  
  createNewImg: function() {
    var _this = this;
    var context = wx.createCanvasContext("mycanvas");
    context.setFillStyle('#FFF')
    console.log(this.data.windowW, this.data.windowH)
    context.fillRect(0, 0, this.data.windowW, this.data.windowH)
    var path1 = "/images/project_img1.jpg"; //详细看onLoad函数注释部分 
    var path2 = "/images/wxq_logo.png"; //详细看onLoad函数注释部分 
    context.drawImage(path1, 56, 10, 260, 250);
    //这里是商品图片 
    this.setSuoming(context);
    this.setName(context);
    this.setMoney(context);
    this.setSuoming1(context);
    this.setSuoming2(context);
    context.drawImage(path2, 240, 430, 100, 100);
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
  cancelBanner:function() {
    this.setData({
      maskHidden: true,
      showhaibao: false
    })

    wx.showToast({
      title: '取消保存...',
      icon: 'loading',
      duration: 500
    });

  }



})