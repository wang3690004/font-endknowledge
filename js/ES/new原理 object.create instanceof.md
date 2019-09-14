####instanceof,object.create, new 的原理及实现

#####new 
在js中new方法用来实例化一个函数方法，让这个实例化的变量其中new出来一个实例化的对象主要经历以下的步骤
1. 创建一个新对象 var obj ={}
2. 这种新对象的constructor 属性为构造函数的名称，设置新对象的_proto_属性指向构造函数的prototype对象，说白了就是让他指向构造方法的原型，以便于后面继承使用
  obj._proto_ = CLASSA.prototype
3. 使用新对象调用函数，函数中的this指向新实例对象
  ClassA.call(obj) //
4. 返回新对象的地址.

现象来看new更像是什么？ 把一个funciton 方法 实例出来一个普通的对象，这个普通对象还要继续调用function里面的方法 使用function的原型.其中上面ClassA.call(obj),其实就是要把构造方法放到obj这个环境变量在执行一边，这样就刚好让初始化方法在对象执行了 也就完成了赋值的过程了并且每个实例彼此是互不影响的。但是原型方法就不一定了需要注意这个

>function news(f){
  var o = {'_proto_':f.prototype};
  f.apply(o,arguments)
  return o;
}

####object.create
obejct.create 方法创建一个新的对象，只是他的用法和new有点区别，new是根据一个构造方法去创造一个实例对象，而object。create是根据现有的对象来创造一个对象的_proto_,将源对象作为prototype并利用此prototype创建一个一个实例对象，这个实例对象的_proto_就是这个源对象.并且在js继承中的构造寄生式继承用的就是 类似的方法.关键代码如下
>object.create = function (o){
  var F = function(){}
  F.prototype = o;
  var newobj = new F()
  return newobj;
}

可以看到object.create内部创建一个新对象，newobj 默认情况下newobj._proto_ === F.prototype 在本例中则侧重写了构造函数F的原型属性，
所以使用原本的构造方法作为参数是无效的



#####instance of 
instanceof 运算符用来检测constructor.prototype是否存在于参数object的原型链上
>function C(){}
function D(){}
var o = new C()
o instanceof C //true , Object.getprorotypeof(o) === C.prototype
o instanceof D //false , D.prototype o不在原型链上

instanceof 就是一层一层的查找_proto_,如果和constructor.prototype 相等则返回true，如果一直没有查找到那么就返回false

>function instance_of(L,R){ //L,表示左表达式，R表示又表达式
  var o = R.prototype; //取R的显式原型
  L= L._proto_; //取L的隐式原型
  while(true){
    if(L == NULL){
      return false
    }
    if(O===L){
      return true
    }
    L=L._proto_
  }
}

感谢以下链接的分享：
https://github.com/yygmind/blog/issues/34
https://www.jb51.net/article/137370.htm
https://www.cnblogs.com/94pm/p/9113434.html