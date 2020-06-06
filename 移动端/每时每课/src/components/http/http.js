import axios from 'axios';
export default function (methods, url, data, token) {

    //使用一个promise 把接口数据 返回
    return new Promise(function (s, e) {
        if (token) {
            if (methods == 'put') {
                axios[methods](url, data, { headers: { Authorization: "Bearer " + token } }).then(res => {   //当一个对象的属性名 是变量的时候 访问 obj[变量名]
                    s(res)
                }).then(res => {
                    e(res)
                })

            } else {
                axios[methods](url, { headers: { Authorization: "Bearer " + token } }, data).then(res => {   //当一个对象的属性名 是变量的时候 访问 obj[变量名]
                    s(res)
                }).then(res => {
                    e(res)
                })
            }

        } else {
            if (methods == 'put') {
                axios[methods](url, data, { headers: { Authorization: "Bearer " + token } }).then(res => {   //当一个对象的属性名 是变量的时候 访问 obj[变量名]
                    s(res)
                }).then(res => {
                    e(res)
                })

            } else {
                axios[methods](url, data).then(res => {   //当一个对象的属性名 是变量的时候 访问 obj[变量名]
                    s(res)
                }).then(res => {
                    e(res)
                })
            }
        }
    })
}

