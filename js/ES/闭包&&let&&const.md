####闭包&& let &&const
什么是闭包
>闭包又称词法闭包，或者函数闭包，是引用了自由变量的函数，这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。

我们可以理解为：闭包是可以在另一个函数的外部访问到其作用域中的变量的函数。而被访问的变量可以和函数一同存在。即使另一个函数已经运行结束，导致创建变量的环境被销毁，也依然存在，直到访问变量的那个函数被销毁，这样也就可以来实现私有变量的使用

>function add() {
    var sum = 0;
    function operation() {
        return sum = sum ? sum + 1 : 1;
    }
    return operation
}
console.log(add()());//1
console.log(add()());//1
console.log(add()());//1

奇怪...为什么会是三个一 说好的闭包呢。在来看看这个 
>function add() {
    var sum = 0;
    function operation() {
        return sum = sum ? sum + 1 : 1;
    }
    return operation
}
var a = add();
console.log(a());//1
console.log(a());//2
console.log(a());//3

这个才是闭包，区别在于第一个例子其实就是正常的调用并不存在闭包，因为每一次调用add()()就是单纯的调用，所以每一次都是1。而第二个例子 有一个'var a = add()',这里是将add方法的返回值 operation给赋予了a了。这个时候其实add() 已经销毁了，但是operation里面有用到sum这个变量，这个变量还是在add下面，后面还要使用的，不然就会报错了。。。js 不让它报错，所以无法回收掉以至于内存中一直有这么个变量会随着a的调用持续使用。所以就内存而言的话 不希望一直留着这么个东西，在用完之后还是要清除掉比较好。所以在确定需要的地方采用闭包不要乱用，因为他不会自动回收，可能会内存泄露
>a=null; a=add();console.log(a()) //1

js有一个机制就是作用域链
>当代码在一个环境中执行时，会创建变量对象的一个作用域链,作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问，作用域链的前端，始终是当前执行的代码所在环境的变量对象，如果这个环境是函数，则将其活动对象作为变量对象，活动对象在最开始时只包含一个变量，作用域链中的下一个变量对象来自包含（外部）环境，而在下一个变量对象来自下一个包含环境，这样一直延续到全局执行环境，全局执行环境的变量始终都是作用域链中的最后一个对象。

函数中所能访问的变量按照层级关系所组成的一条有着先后顺序的链子，每个函数最先能访问的变量（也就是在这条链子上最先接触到的）是当前函数的活动对象，其次下一个能访问的变量就是当前函数所在的包含环境，（一般指外部函数或者全局执行环境，但在es6当中块级代码语句也有可能生成包含环境）然后是下下个包含环境，就这样一层层找下去，直到全局环境


这里有个经典的闭包问题
>\<input type='button' value='1'>
\<input type='button' value='2'>
\<input type='button' value='3'>
 
    var abtn =document.getElementByTagsName('input')
    for(var i=0; i< abtn.length;i++){
      abtn[i].onclick=function(){alert(i)}
    }
    这里是有问题的，点击会发现全部都是3.因为js是单线程的，当基本逻辑执行完之后才
    可以点击事件，在上面的函数中我们给每一个按钮添加了一个事件，并且打印对应的i
    值。殊不知当方法执行的时候，因为方法查找作
    用域i 在本作用域找不到i所以只能向上一级的作用域链中寻找i，而刚刚好找到了已经
    设置为3的i所以每一次alert都是3

所以解决办法有两个，一个是利用es6的块级作用域let 给每一个i设置一个特定的作用域让方法可以绑定到上面去。
     for(let i=0; i< abtn.length;i++){
      abtn[i].onclick=function(){alert(i)}
    }

另一个是利用闭包，以及函数作用域链的方法通过内部访问外部变量，
 for(var i=0; i< abtn.length; i++){
     abtn[i].onclick = (function(num){
         return function(){alert(num)}
     })(i)
 }
 这样创造一个闭包环境，让内部的方法可以直接访问外一层的方法中设置的num，这样就可以避免去访问更远一级作用域中的i了。


####let
 
 1.let不允许重复声明
 >let a=1;
 >let a=2 ; //error

 2.不存在变量提升
 >console.log(b)  //error 
  let b=1;  要先定义后面才能使用

3. 暂时性死区
 只要在块级作用域里面存在let 则在他所生命的变量就绑定在这个块级作用域上了，不受外界影响
 > var a =2;
  if(true){
      console.log(a)
      let a =3 
  }
  
  a先是全局变量，但是let声明之后导致let声明的变量已经绑定在这个块级作用域上了，在块级作用域里面a就变成了全局变量，所以a会报错

4.let 与var的区别
> {var a =1; let b=2;} a//1  b//error

var定义的是全局变量，而let定义的话只能在当前作用域下有效，如果出了作用域就无效

>{console.log(a);//undefined
  var a = 100;
  console.log(b) //error b is not defined
  let b=100;
 }
let必须得定义之后才能生效，否则会报错 而var没定义也是可以的，值为undefined，也就是说var 存在变量提升

5.块级作用域
>var tmp =12
function f(){
    console.log(tmp);
    if(false){
        var tmp= 'aaaa'
    }
}
f(); //undefined
tmp会被内层覆盖，因为var存在变量提升 所以是undefined

>var a =1; 
  {
      var a =2;
  }
  console.log(a)  //2

但是let就不一样了
 {
     let a=1;
     {let a=2;}
     console.log(a) //1
 }
 用上let这个时候就不会被覆盖，外部的a绑定的外部作用域，内部的a绑定的内部作用域



 ####const 
   const 和let类似，只是const声明常量，而let声明变量
   1.不能重复声明
>const a=1; const a =2 ;//error

   2.一旦声明不可以改变
   >const a =1; a=2;//error  
   其实const不是不可以改变，只是声明的地址不能改变。
    const a= {};
    a.name='ss'
    console.log(a) //{name:'ss'}

  >const a= {};
  a= {name:'sss'} 这样其实相当于改变了对象地址了所以是error

3. 声明要有值
    const a //error

4. 暂时性死区
  const a =2;
  {const a =1;}
  console.log(a) //2 const和let一样会有块级作用域内部跟外部定义的不相干

5. 不存在变量提升 
  {
      console.log(a) // error
      const a 
  } const和let一样，还没有定义就会报错

感谢以下链接：
https://juejin.im/post/5cf468a9f265da1bb77652aa
https://juejin.im/post/5d54b91fe51d45620b21c3a0
https://blog.csdn.net/cauchy6317/article/details/81167572
https://blog.csdn.net/qq_36276528/article/details/70049825
https://www.cnblogs.com/bsblogs/p/7745514.html
https://segmentfault.com/a/1190000015403867


