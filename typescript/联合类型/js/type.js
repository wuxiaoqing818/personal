"use strict";
//联合类型   可以使用多种类型 |符号  但是只能访问此联合类型所有类型的共有属性或者方法
var muchtype = 'hello';
muchtype = 10;
console.log(muchtype.toString());
// console.log(muchtype.length)   //会报错 不是共有属性
