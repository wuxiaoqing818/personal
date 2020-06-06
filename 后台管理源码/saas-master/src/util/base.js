/**
 * 公共js操作文件
 */
import { MessageBox } from 'element-ui'
export default {
  //获取上个月的月份及时间
  getMonth(){
    let z=new Date().getMonth()
    z=((z==0)?(12):(z))
    return z
  },
  getCountDays() {
    let curDate = new Date()
    let z=new Date().getMonth()
    z=((z==0)?(12):(z))
    curDate.setMonth(z)
    curDate.setDate(0)
    /* 返回当月的天数 */
    return curDate.getDate();
  },
  // 时间戳转时间
  dateParse (timestamp) {
      if (timestamp) {
        let date = new Date(timestamp)
        let Y = date.getFullYear()
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
      } else {
        return ''
      }
    },
    // 从url中获取参数
    getRequest () {
      let url = window.location.href
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.split('?')[1]
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    },
    // 获取sessionStorage
    getSession (key) {
      return JSON.parse(window.sessionStorage.getItem(key))
    },
    // 设置sessionStorage
    setSession (key, data) {
      return window.sessionStorage.setItem(key, JSON.stringify(data))
    },
    // 判断是否token过期
    // tokenErrorMsg(res){
    //   let msg = res.split(':')
    //   if(msg.length == 2 && msg[1] == 'token过期'){
    //     MessageBox.alert(res, '',{
    //       confirmButtonText: '确定',
    //       callback: action => {
    //         window.location.href = window.location.href.split('/#/')[0]
    //       }
    //     })
    //   }else{
    //     MessageBox.alert(res)
    //   }
    // }
}
