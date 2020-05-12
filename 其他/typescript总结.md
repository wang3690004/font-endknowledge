###typescript

#####泛型
泛型的作用就是为了规范 入参类型 和输出值的类型统一的扩展方法.使用泛型可以创建泛型函数、泛型接口、泛型类

1. 泛型函数
```
function identity<T>(arg:T):T{
    return arg
}
let output = identity<string>('aaa')  //aaa
let output = identity('aaa')   //aaa

翻译一下这个方法就是声明一个函数方法identity,然后定义一个数据类型T(类似于我们解方程式中的x，规定一个变量 同时设置y也是可以的)。限制输入值类型为T，输出值类型同样为T，这个identity函数就叫做泛型。相比于any 他更加严格的规范了输入值和输出值。保持调用的准确性
```
2. 泛型变量
使用泛型创建函数时，编译器要求你在函数体必须正确使用这个通用的类型， 必须把这些参数当做是任意或所有类型。但是这样的做法会引出一个错误
```
function loggingidnetity<T>(arg:T):T{
    alert(arg.length)
    ...  //error t doesn't have .length
}
因为t表示的是惹你属性，而这个属性是未必有length属性的 所以会报错，需要这样

function loggingidnetity<T>(arg:T[]):T[]{
    alert(arg.length) 
    。。。 
}
和上面是相等的
function loggingidnetity<T>(arg: Array<T>): Array<T>{
    ...
}
所以和上面是相等的
let myidentity: {<T>(arg:T):T} = loggingidnetity

泛型loggingidnetity 接收类型参数T和参数arg,他是一个元素类型为T的数组，
并且返回的元素是T的数组， 这里可以把泛型变量T当做类型的一部分使用，而不是整个类型 增加灵活性
```

3. 泛型类型
 泛型函数和非泛型函数的类型没有什么不同，只是有一个类型参数在最前面，像声明函数一样
 ```
 function a<T>(arg:T): T{
     return arg
 }
 let a: <T>(arg:T)=> T = identity
 let a: {<T>(arg:T):T} = identity
  三者是等价的，这个还是需要识别出来的 
 ```
 这里需要注意一下 泛型接口的写法 
 ```
 interface x{
     <T>(arg:T):T
 }
 function a<T>(arg:T):T{
     ...
 }
 let b: x = a
 把泛型参数当做整个接口的一个参数，这样我们就能清楚的知道使用的具体是哪个泛型类型比如 dictionary<string> 而不只是dictionary 这样接口里面的其他成员也能知道这个参数的类型了。例如
 interface a<T>{
     (arg:T):T
 }
 function b<T>(arg:T):T{
     return args
 }
 let c:a<number> = b
 示例做了少许改动，不再描述泛型函数，而是把非泛型函数签名作为泛型函数类型一部分，当我们使用a的时候 还得传入一个类型参数来指定泛型类型<number> 锁定了之后 代码里面使用的类型。对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名和何时放在接口上是有帮助的

 ```

 4. 泛型类
 泛型类看上去与泛型接口差不多，泛型类使用<> 扩气泛型类型，跟在类名后面
 ```
 class A<T>{
     zerovalue:T,
     add:(x:T,y:T)=>T
 }
 let a = new A<number>()
 a.zerovalue = 0
 a.add = function(x,y){return x+y}
 ```

 5. 泛型约束
 之前有个例子，我们有时候想要操作某一类型的一组值，并且我们知道这组值具有什么样的属性，在例子中，我们想要访问arg的length属性，但是编译器不能证明每种类型都又length值 所以报错了
 ```
 function a<T>(arg:T):T{
     console.log(arg.length) // T doesn't have length
     return arg
 }
 相比于any所有类型，我们想要限制函数去处理length属性的所有类型， 那么我们就可以在泛型的基础上再添加一个限制，比如说只允许带有length属性的类型 才可以用到这个函数

interface lengthwise{
    length:number
}
function a<T extends lengthwise>(arg:T):T{
    console.log(arg.length) // number
    return arg
}
因为这个函数添加了约束了 所有传入的数据类型必须显式或隐式带有length属才行
a([]),a({length:2,value:3})
 ```