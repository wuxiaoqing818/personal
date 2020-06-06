//使用枚举可以定义一些有名字的数字常量
var Days;
(function (Days) {
    Days[Days["Sun"] = 3] = "Sun";
    Days[Days["Mon"] = 4] = "Mon";
    Days[Days["Tue"] = 5] = "Tue";
    Days[Days["Wed"] = 6] = "Wed";
    Days[Days["Thu"] = 7] = "Thu";
    Days[Days["Fri"] = 8] = "Fri";
    Days[Days["Sat"] = 9] = "Sat";
})(Days || (Days = {}));
console.log(Days.Sun); //3             
console.log(Days.Sat); //9
console.log(Days); //枚举类型会被编译成一个双向映射的对象
console.log(Days[0] === 'Sun');
