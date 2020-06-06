// let num:number|string = '10'
// num = 20
// console.log(num.length)    //会报错
//类型断言    只能断言联合类型中存在的类型
function getAssert(name) {
    // return (<string>name).length        //这种在jsx语法  （react的jsx语法的ts版）不能用
    return name;
    // return (name as boolean).length            //报错  因为函数没有boolean类型 不能断言
}
