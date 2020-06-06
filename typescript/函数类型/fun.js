//声明式类型的函数
function funType(name, age) {
    return age;
}
var ageNum = funType('张三', 18);
//函数参数不确定
function funType2(name, age, sex) {
    return age;
}
var ageNum2 = funType2('张三', 18, '男');
//函数参数的默认值
function funType3(name, age) {
    if (name === void 0) { name = '张三'; }
    if (age === void 0) { age = 18; }
    return age;
}
//表达式类型的函数
var funType4 = function (name, age) {
    return age;
};
//变量也约束
var funType5 = function (name, age) {
    return age;
};
var funType6 = function (name, age) {
    return age;
};
function getValue(value) {
    return value;
}
var a = getValue(1);
var b = getValue('1');
