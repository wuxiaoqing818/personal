//泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而在使用的时候再指定类型的一种特性
//没有确切的定义返回值的类型，运行的数组每一项都可以是任意类型
// function createArray(length:number,value:any):Array<any>{
//     let arr = []
//     for(var i=0;i<length;i++){
//         arr[i] = value
//     }
//     return arr;
// }
// createArray(3,1)

//泛型将其改造
//不传的时候根据类型进行倒推
function createArray<T>(length: number, value: T): Array<T> {
    let arr = []
    for (var i = 0; i < length; i++) {
        arr[i] = value
    }
    return arr;
}
var strArray: string[] = createArray<string>(3, '1')
var numArray2: number[] = createArray(3, 1)

//接口当中采用泛型
interface ICreate {
    <T>(name: string, value: T): Array<T>
}
let func: ICreate;
func = function <T>(name: string, value: T): Array<T> {
    return []
}

var strArr:string[] = func("张三",'str')
var strArr2:number[] = func("张三",3)