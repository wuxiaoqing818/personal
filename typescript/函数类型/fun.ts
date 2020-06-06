//声明式类型的函数
function funType(name:string,age:number):number {
    return age

}
var ageNum:number = funType('张三',18)

//函数参数不确定
function funType2(name:string,age:number,sex?:string):number{
    return age
}
var ageNum2:number = funType2('张三',18,'男')

//函数参数的默认值
function funType3(name:string='张三',age:number=18):number{
    return age
}

//表达式类型的函数
var funType4 = function(name:string,age:number):number{
    return age
}

//变量也约束
var funType5:(name:string,age:number)=>number = function(name:string,age:number):number{
    return age
}

//变量约束是函数
interface funType6 {
    (name:string,age:number):number
}
var funType6:funType6 = function(name:string,age:number):number{
    return age
}

//对于联合类型的函数，可以采用重载的方式
//输入是number，输出也是number
//输入是string，输出也是string
function getValue(value:number):number;
function getValue(value:string):string;
function getValue(value:string|number):string|number{
    return value
}

let a:number|string = getValue(1)
let b:string = getValue('1')
