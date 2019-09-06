es6 class 中类里面能定义什么，不能定义什么   
能定义:
1.构造方法  constructor(props){super(props),this.x=xxxxx,this.y=yyyyy}
2.若干个实例方法 
3.静态方法(就是类本身的方法 static声明的方法，可以由其他子类来继承，但是实例化的对象无法调用)

class test {
  a = 3
  b = 4
  constructor(c){
    this.c = c
    console.log(this.a,this.b,this.c)
  }
  myname(){
    return this.a+this.b+this.c
  }
  static getname(){
    return this.a-this.b-this.c
  }
}
var a  = new test(5)


有限定条件的定义： 
实例属性：不能再构造方法外部定义实例属性，只能在构造方法里定义实例属性
 

 绝对不能定义：
 1.不能定义静态属性，

所以实例属性必须在 constructor(){} 中定义 ，静态属性必须在class外面



1.类的声明不存在变量提升
2. class 默认自带constructor 方法
3.class Class{
    a:1
}
这样定义是非法的  所以定义类自身的静态属性，只能在外部定义： 
class Class{}
Class.a=1;

class可以定义实例属性，但是必须定义在构造方法里面

class 可以定义类自身方法（即静态方法）
类自身的方法 叫静态方法，。做法是在class的一个方法前添加static 关键字 静态方法不会被实例继承，但是可以通过类来调用
，可以在子类继承 super.classmethod()