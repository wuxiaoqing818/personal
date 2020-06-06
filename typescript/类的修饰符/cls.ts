//创建Person类      
class Person {
    name: '张三'
    age = 18
    say() {
        console.log('我的名字是' + this.name + ',我的年龄为' + this.age)
    }
   private sex:'女'
   protected flag :false
}

//创建Person的实例
var p = new Person()
p.say()
console.log(p.name)   //当一个类成员变量没有修饰的时候，外界是可以进行访问的，默认就是public进行修饰




//private修饰符 私有的   protected  受保护的
class Person2 {
    private name: '张三'
    age = 18
    say() {
        console.log('我的名字是' + this.name + ',我的年龄为' + this.age)
    }
    protected sex:'女'
}

//创建Person的实例
var p2 = new Person2()
p2.say()
// p2.sex  //受保护的
//  console.log(p2.name)      //私有的 

//创建Child子类  继承父类
//一旦父类将属性定义成私有的之后，子类就不可以进行访问
//父类的属性定义成受保护的之后，可以在子类里面进行访问
class Child extends Person {
    callParent() {
        console.log(super.flag)
        super.say()
    }
    static test(){
        console.log('test')
    }
}

var c = new Child()
c.callParent()
console.log(c.age)   //子类继承了父类，子类就可以访问到父类的公开的属性或者方法了
console.log(c.say())
//  console.log(c.sex)    //报错 父类私有的属性  拿不到
//  console.log(c.flag)       //受保护的 只能在Person和及其子类中访问


//  console.log(Child.callParent())    //错误  Child上不存在callParent
console.log(Child.test())                //这个却可以 类的静态方法里面，是不允许用this