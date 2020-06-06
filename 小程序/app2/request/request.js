// 封装接口
const Baseurl = "https://api.it120.cc/wuxiaoqing"; //请求接口前缀
// 封装的方法
function requestApi(url, mothed, data) {
  // 拼接url地址
  var _url = Baseurl + url
  // Pronise解决异步编程
  return new Promise((reslove, resject) => {
    wx.request({
      url: _url,
      method: mothed,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 2000) {
          wx.showToast({
            title: '登录过期',
          })
          wx.navigateTo({
            url: '/pages/my/my',
          })
        }
        // 将成功的结果返回
        reslove(res)
      },
      error(error) {
        console.log(error)
        // 将失败的结果返回
        resject(error)
      }
    })
  })

}

//检测token登录是否有效
function CheckToken(data) {
  return requestApi("/user/check-token", "get", data)
}
module.exports.CheckToken = CheckToken

// 全部收货地址接口     data  页面参数
function addressAll(data) {
  return requestApi("/user/shipping-address/list", 'get', data)
}
module.exports.addressAll = addressAll

// 删除购物车某个商品     data  页面参数
function removeGoods(data) {
  return requestApi("/shopping-cart/remove", 'post', data)
}

module.exports.removeGoods = removeGoods


// 订单列表     data  页面参数
function orderList(data) {
  return requestApi("/order/list", 'post', data)
}

module.exports.orderList = orderList

// 订单删除     data  页面参数
function orderCancel(data) {
  return requestApi("/order/delete", 'post', data)
}

module.exports.orderCancel = orderCancel