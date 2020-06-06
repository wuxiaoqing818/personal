//ts中的任意值 any    ts中的下划线问题   num最好是number名字不规范不知道为啥
var number = '222';
number = true;
number = 2;
var num2; //没有赋值操作  就会被认为任意值类型  等价于 var num2:any;
num2 = 1;
num2 = true;
//ts的类型推论 给变量赋值初始值  如果没有指定类型  根据初始值倒推类型   就是根据初始值指定类型 后续赋值遵守ts规定
var b = 1;
b = 1;
//b='11'  会报错
var c;
c = 1;
c = '111';
