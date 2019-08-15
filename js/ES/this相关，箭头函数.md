####this&& ES6 箭头函数

分析this问题 的本质就是分析方法当前的上下文到底是什么？（特殊情况除外）
this的指向问题有一个比较通用的口诀就是:'谁调用了这个方法那么this就指向谁',在学习过程中需要了解js中调用函数的一些术语：
 函数调用： alert('helloworld') parseint()
 方法调用: console.log('aaa') ; obj.a()  map.set() 
 构造函数: new Regexp('\\d')
 隐式调用: alert.call(undefined,'hello,world')

1.1 函数调用
  当一个表达式为函数并接着一个 () 时，函数调用被执行，例如parseInt() . 函数调用表达式不能是属性方式的调用，如obj.func() 这种其实是创建一个方法调用，**注意他们的区别**
 > function hello(name){
   return name
 }
 let message = hello('word')
 hello('world')是函数调用，hello表达式等价于一个函数，跟在他后面的是一对括号以及world参数

1.2 在函数调用中的this
    **this在函数调用中是一个全局对象**, 在函数调用中，执行上下文就是全局对象window
>function sum(a,b){
  console.log(this === winodw) //true
  this.mynumber = 20 //将mynumber 添加到window
  return a+b
}
 sum(15,16) //31 , window.mynumber //20

在调用sum时候 js自动将this设置为全局对象， 当this在任何函数作用域(最顶层作用域：全局执行上下文)之外使用，。this表示window对象

1.3 严格模式下的函数调用this 
   **this在严格模式下的函数调用为undefined**
   启用后，严格模式会影响执行上下文，this在常规函数调用中值为undefined，不在是window
1.4 this在内部函数中的时候 .这里要说明两个 一个是在对象里面 一个是在函数里面



>const numbers = {
numberA:5,
numberB:10,
sum : {
	test:  function(){
      			console.log(this)
				function calcaute(){
      				console.log(this);
					return	this.numberA + this.numberB
					}	 
			return calcaute()
				}
	}
}

numbers.sum.test() 

//这里test下的this 果然是指向的是test 这个方法


参考来源:https://juejin.im/post/5d51feaef265da039005219e
