//ts支持js  可以用ts写js  但是没必要
var js = 'js';
console.log("hello world");
//ts原始数据类型  string  number  boolean   null  undefined  enum    symbol 
//空值一般采用void来表示   void也可以表示变量，也可以表示函数无返回值
//声明变量遵守js规范  但是更为严格  变量声明通过 ":"加类型声明变量的类型  则变量值类型和声明变量类型要一致  否则编译报错
var str = "hello";
var num = 1;
var flag = true;
var un = undefined;
var nul = null;
//变量赋值  str = 1 编译报错  str = undefined str = null  可以    
//和js一样   null和undefined是string、number、boolean的子类型
str = undefined;
str = null;
//void用来规定函数无返回值   加上return返回值会报错
var callBack = function () {
};
//void表示空值  var num2:void = 3会报错   声明空值后再赋值不是null 会报错  
var num2 = null;
// num2 = 1   报错
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
