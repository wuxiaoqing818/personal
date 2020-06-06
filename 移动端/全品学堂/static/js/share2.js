import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
    wxShowMenu: function () {
        //一年级数据
        axios.get("../../../static/data/home/firstGradeNav.json").then(function (res) {
            var getMsg = res.data;
            wx.config({
                debug: false, //生产环境需要关闭debug模式                
                appId: getMsg.id, //appId通过微信服务号后台查看            
                timestamp: getMsg.id, //生成签名的时间戳           
                nonceStr: getMsg.id, //生成签名的随机字符串          
                signature: getMsg.id, //签名              
                jsApiList: [ //需要调用的JS接口列表                   
                    'onMenuShareTimeline', //分享给好友                  
                    'onMenuShareAppMessage', //分享到朋友圈                 
                    'showMenuItems', 'hideMenuItems']
            });
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: ["showMenuItems"], success: function (res) {
                        wx.showMenuItems({
                            menuList: ['menuItem:share:appMessage', //发送给朋友                    
                                'menuItem:share:timeline' //分享到朋友圈                 
                            ]
                        });
                    }
                });                 //分享到朋友圈            
                wx.updateTimelineShareData({
                    title: "分享描述", // 分享标题            
                    desc: "分享描述", //分享描述             
                    link: getMsg.id, // 分享链接                  
                    imgUrl: getMsg.id // 分享图标            
                });
                //分享给朋友            
                wx.updateAppMessageShareData({
                    title: "分享描述", // 分享标题            
                    desc: "分享描述", // 分享描述                
                    link: getMsg.id, // 分享链接                  
                    imgUrl: getMsg.id // 分享图标               
                });

            });
            console.log('share2')
        })
    }
}
