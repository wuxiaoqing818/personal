var obj1;
obj1 = { name: '张三', age: 10 };
var obj2;
obj2 = { name: '张三', age: 20 };
obj2 = { name: '李四' };
var obj3 = { name: '张三', age: 10, sex: '男', isMarry: true };
var obj4 = { name: '张三', age: 10 };
obj4.name = '李四';
// obj4.age = 20    //   这样报错     因为readonly变成只读属性  一旦赋予初始值  便不能再更改
