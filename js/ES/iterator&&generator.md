###迭代器&&生成器

####迭代器
记得以前学java的时候会用到for循环，其中就用到了迭代器这个东西，当时不明白还叫什么增强的for循环，es6中所以有了迭代器这个概念，迭代器的使用可以简化数据操作，for of 展开运算符 set array generator foreach map Map都有使用到迭代器这个概念。

迭代器是一种特殊的对象它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个next方法，每次调用都返回一个结果对象，{value:xx,done:xxx},当有值的时候返回值正常显示 done为false 反之done为true value为undefined

```
function createiterator(items){
    var i = 0;
    return {
        next:function(){
            var done = i> items.length;
            var value = !done? items[i++]:undefined
            return{
                done:done,value:value
            }
        }
    }
}  //利用闭包原理
var iterator = createiterator([1,2,3])
iterator.next()   value:1 done:false
...
...
```
注：在日常开发中可以尝试使用for of 不要忽视他的重要性。并且for of还可以使用break continue等语法

####调用iteratot接口的场合
1. 解构赋值
```
let set = new Set().add(1).add(2).add(3)
let [x,y] = set;
//x=1 y=2
let [first,...second] =set
//first=a second == [2,3]
```
2. 扩展运算符
```
var str= 'hello'
[...str]  // ['h','e','l','l','o']
let arr= [2,3]
['a',...arr,4]
//['a',2,3,4]
```
3. for of  array from map set weakmap weakset promise.all promise.race

####生成器
generator 是es6提供的一种异步编程解决方案，generatot是一个状态机，封装了多个内部状态，同时他还是一个迭代器函数，返回一个迭代器对象，迭代器可以依次迭代里面的状态。
generator 写法：1. function 关键字与函数名之间有一个 * 2.函数体内部使用yield 来定义不同的内部状态，并且yield会'暂停'函数执行,generator函数不会像普通函数一样立即执行，而是返回一个指向内部状态对象的指针，所以要遍历对象要使用next方法,指针就会从函数头部或者上一次停下来的地方开始执行
```
function * a(){
    console.log(1);
    yield 1
    console.log(2)
    yield 2
    console.log(3)
    yield 3
    return 4
}
a.next()
1 {value:1,done:false}
a.next()
2 {value:2,done:false}
a.next()
3 {value:3,done:false}
a.next()
 {value:undefined,done:true}

第一次调用next方法时，从generator头部开始执行，先是打印了1 执行到yield 就停下来，并将 其 1 作为返回对象的value属性值，此时函数还没执行完 返回对象的done还是false
第二次调用next 同上
第三次next 时 打印了3 执行了函数后面操作 并将return后面的表达式作为返回值 此时函数已经结束 多以done为true
第四次调用next方法，函数已经执行完 所以返回value属性是unedfined，done属性为true，如果第三步没有return 语句的话 直接返回{value:undefined,done:true}
```

注：当next传入参数的时候，该参数会作为上一步yield的返回值，如果不传入参数的话上一部yield的值就返回undefined 可能会出现问题
```
function * a(x,y){
    let z = yield x+y
    let result = yield z*x
    return result
}
var g = a(5,6)
g.next()  11,false
g.next() nan,false
正如上面的结果因为第二步参数没有传入值，所以z为undefined，而不是55 

解决办法就是给next传入参数
上面的函数定义是一样的 
var g = a(5,6)
var i = g.next()  11,false
g.next(i.value)  55 false

```
####应用：
generator 函数通过使用yield来控制执行的流程，说白了就是随心所欲的交出和恢复函数的控制权，yield交出执行权，而next恢复执行权，具体的用法 1.类似协程 2.async await处理异步特别是处理链式promise（具体可看异步）
1. 协程可以理解成多线程间的协作，比如说a，b两个线程根据实际逻辑控制共同完成某个任务，a运行一段时间后 暂停然后运行b ，b运行一段时间后在运行a，直到任务完成js是单线程的，我们可以理解为函数间的协作，由多个函数简介配合完成任务
```
做鸡的过程 准备工作-》炒鸡-》炖鸡-》上料
这个过程可以分为大厨和学徒分别来做。
//大厨的活
   function* chef(){
      console.log("fired chicken");//炒鸡
      yield "worker";//交由伙计处理
      console.log("sdd ingredients");//上料
      yield "worker";//交由伙计处理
   }
   //伙计的活
   function* worker(){
       console.log("prepare chicken");//准备工作
       yield "chef";//交由大厨处理
       console.log("stewed chicken");
       yield "chef";//交由大厨处理
       console.log("serve chicken");//上菜
   }
   var ch = chef();
   var wo = worker();
   //流程控制
   function run(gen){
       var v = gen.next();
       if(v.value =="chef"){
          run(ch);
       }else if(v.value =="worker"){
       	  run(wo);
       }
   }
   run(wo);//开始执行
根据代码 按照大厨和伙计的角色 分别创建了两个generator函数 函数中列出了各自角色要负责的事情，当要转移给其他人任务时利用yield 暂停执行，并将执行权交出，run方法实现流程控制，根据yield返回的值，决定移交哪个角色来做 相互配合。 (真心牛批~~~~~~)
```




感谢以下链接的分享：
https://www.runoob.com/w3cnote/es6-generator.html
https://www.jianshu.com/p/3bb77516fa7e
https://www.cnblogs.com/xiaohuochai/p/7253466.html
https://blog.csdn.net/tcy83/article/details/80427195
