###call apply bind 原理及 手写

call,apply,bind 本质就是改变函数方法执行的作用域，上下文，可以借助这个三个方法实现‘借用’函数方法的功能。
形象一点来说就是 A对象有一个方法，而b对象因为某种原因，也需要用到同样的方法，那么这时候我们是单独为b对象扩展一个方法呢？还是借用A对象的方法呢？ 当然是借用A对象了，

call，apply 区别在于参数不一样，call是apply的语法糖

bind是返回一个新的函数，供以后调用，而apply，call是立即调用

1. call的写法
   function.call(obj,param1,parma2,param3....)。 call 的第一个参数是一个对象，function的的调用者将会指向这个对象，如果不传或者使用null，则默认为全局对象window。  第二个参数，可以接受任意个参数，每个参数都会  映射到对应的函数参数。


2. apply的写法
    function.apply(obj, arrays) 第一个参数必须是对象，第二个参数必须是数组或者是类数组，并且里面的参数顺序对应了function的形参顺序

3. bind的使用
   bind方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项，第二个参数是数组. 调用bind(obj)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久绑定到bind的第一个参数 无论这个函数是如何被调用的

>var name ='小王',age=17
 var obj = {name:'小张',objage:this.age,myfun:function(){console.log(this.name,this.age)}}
obj.objage  //17  obj.myfun() //小张 undefined

>var fav = '盲僧'
 function show(){
   console.log(this.fav)
 }  
 show() //盲僧


> var name ='小王',age=17
 var obj = {name:'小张',objage:this.age,myfun:function(){console.log(this.name,this.age)}}
var db={ name:'德玛',age:99}
obj.myfun.call(db) // 德玛 99   obj.myfun.apply(db)  obj.myfun.bind(db)()

var name ='小王',age=17
 var obj = {name:'小张',objage:this.age,myfun:function(m,t){console.log(this.name,this.age,this.m,this.t)}}
obj.myFun.call(db,'成都','上海')；
obj.myFun.apply(db,['成都','上海']);       
obj.myFun.bind(db,'成都','上海')();      
obj.myFun.bind(db,['成都','上海'])();


call:
 function call(content=window){
   content.fn = this
   let = args = [...arguments].slice(1)
   let result = content.fn(...args)
   return result
 }


https://segmentfault.com/a/1190000017957307


注意：
1. 如果不需要关心具体有多少参数被传入用apply，如果确定函数可接收多少个参数，并且想一目了然表达形参和实参的对应关系用call 
如果想要将来再调用方法，不需要立刻得到函数并且返回结果，则使用bind
2. 调用call apply,bind的对象必须是一个函数function 
3. 当函数作为对象里的方法被调用时，他们的this是调用该函数的对象。