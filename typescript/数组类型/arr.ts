//数组表示法

//1、类型+方括号
var arr: number[] = [1, 2, 3]
var arr2: string[] = ['1', '2', '3']
var arr3: any[] = [1, '2', true]

//2、可采用数组泛型 Array < elemType > 表示法
var arrType:Array<number> = [1,2,3]
var arrType2:Array<string> = ['1','2','3']
var arrType3:Array<any> = [1,'2',true]

//3、可采用接口表示法
interface IArr {
    [index:number]:number

}
var arrType4:IArr = [1,2,3]


//值为接口       [index:number]:Istate1
interface Istate1{
    userName:string,
    age:number
}

interface IArr2 {
    [index:number]:Istate1

}
var arrType5:IArr2 = [{userName:'张三',age:10}]

var arrType6:Array<Istate1> = [{userName:'张三',age:10}]

var arrType7:Istate1[] = [{userName:'张三',age:10}]

