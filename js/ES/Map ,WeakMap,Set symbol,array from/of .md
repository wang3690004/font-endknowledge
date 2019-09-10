#####set,map,weakmap,symbol,类型以及array.from,array.of总结一波
总结一波各个新的数据格式，以便于后面使用，查询起来更加方便

一. Set, 
1. set是一个能够存储无重复值的有序列表，这个有一项应用就是用来去除数组中重复的项.
 >let set = new Set()
 set.add(5);
 set.add('5')
 console.log(set.size) //2 
 //set通过new Set() 来创建，调用add方法可以向set中添加项目，检查set.size属性可以查单其中包含的项

 set不会使用强制类型转换来判断值是否重复，并且无法判断对象是否重复，其实比较的就是数值或者对象的内存地址，因而即使传入数值上一波一样的对象也无法识别
 >let set = new Set()
  set.add({a:1});
  set.add({a:1});
  //两个都存入了set中
  let ss = {s:1}
  set.add(ss);
  set.add(ss)
  //只保留了一个ss  另一个无效,因为set特性是要保留唯一值

2. 检查是否存在某个值,使用has()方法来判断某个值是否存在于set中
> let set = new Set([1,2,3,3,5,4])
  console.log(set.has(6)) //false
3. 删除，使用delete 方法从set中删除某个值，或者使用clear清空所有值
> let set  = new Set([1,2,3,4,5])
console.log(set.size) //5
set.delete(1); 
set.size // 4

>let set = new Set([1,2,3,4,5])
let arr1 = [...set]
arr1 //  [1,2,3,4,5] 
//这一轮操作后 可以把原数组中重复的项全部消除掉只保留唯一值
4. foreach 
>let set = new Set([1,2,3,4,5])
set.forEach((value,key,ownerset)=>{
  console.log(value,key)
})
//1 1 2 2 3 3 4 4 5 5
set中value和key是相同的，这是为了让set的foreach方法和数组以及map的foreach保持一致都具有三个参数

二.WeakSet , Set在存放对象时，实际上是存放的对象的引用，即set也被称之为strong set,如果所存储的对象被置为null,但是set实例仍然存在的话，对象依然无法被垃圾回收器回收，从而无法释放内存
>let set =new Set()
let key={},key2 ={}
set.add(key);set.add(key2)
set.size//2
key =null
set.size //2
可以看出就算对象置为null，但是由于是强引用的方式，set实例还在，对象key依然不会被回收

**如果想让对象key正常释放的话，可以使用weak set，存放的是对象的弱引用,当对象只被set弱引用的话,并不会阻止对象实例被回收，weakset同set的用法几乎一致，可以用add方法增加数据项，使用has方法检查数据，以及delete**
>let set = new WeakSet()
let key ={}
set.add(key)
set.has(key) //true

**需要注意的是:WeakSet 构造器不接受基本类型的数据，只接受对象,同样的可以使用可迭代对象如数组，来作为构造器来创建weakset**
1.对于weakset实例，若是调用了add，has ，delete方法时传入了非对象的参数，会报错
2.weakset 不可迭代，不能用for-of
3.weakset没有size属性，没有foreach方法

三. Map (这个的东西的用法我在一次面试中让我见识到了，用了它真的可以省很多事特别是用于数据遍历的时候)。map可以存放键值对，键的数据类型可以是基本类型数据，也可以是对象，而值可以是任意类型的数据
1. 使用set可以给map添加键值对
>let map = new Map()
 map.set('title','aavc')
 map.set({a:1},'22')
 map.set([1,2,3],1)
 console.log(map) // 全部可以添加成功 具体在浏览器查看 map.size //3

2. 使用get获取相关数据
>map.get('title')  //aavc
这里需要注意的一个点是：虽然map可以设置各种类型的键，其实还是根据这个键的内存引用地址做的存储，
在上面的例子中map.get([1,2,3]) 这样是找不到值的。因为输入的[1,2,3]和一开始存入的键值引用地址是不同的 所以找不到，只能是给特定的值一个变量，全程用变量去存储和查找。
var ss = [1,2,3,4,5]
map.set(ss,1)
map.get(ss) //1

3. has delete clear方法
 同set保持一致，同样有has delete clear方法
4. 初始化方法,要注意的是set的初始化参数有点古怪，要用[]做最外层打底，作为一个接受的壳，比如:
>var msss= new Map([[ 1,2 ]])  //键1 值1
 var masss= new Map([[[ 1,2,3 ],2]]) // 键[1,2,3] 值2
 并且支持多个值的初始化如：
 var mass = new Map([['title','hellow orld'],['year','2018']])
 这相当于创建了两个值，第一个键位title 值为hellowworold 第二个键位year 值为2018

四. weak map, weak map 对于map而言，就像是weak map相对于set 一样，weak map都是存储对象弱引用的方式，在weakmap中 所有的键必须是对象，而且这些对象都是弱引用，不会干扰垃圾回收，当weakmap中的键在weakmap之外不存在引用时，该键值会被移除
 1. weak map 的键值必须是对象，值可以是任意类型，初始化同map 一样 也是利用数组的壳来创建一个weakmap 
 > let key = {},key2 = {}
 let map = new WeakMap([[key,'hello'],[key2,''world]])
 2. has delete 方法 同map一样,并且没有size方法，
 3. foreach方法 
 > map.forEach((value,key,ownermap)=>{
   console.log(value,key)
 })
 //hello, {}   
 // world, {}

 五.总结
  1. set是无重复值的有序列表，会自动移除重复的值，可以使用has来判断某个值是否存在，通过size判断数量 set还拥有foreach方法 用于处理每个值.
  2. weakset 只能是包含对象的特殊set，其中的对象使用弱引用来存储，一旦放入的对象为null 便会垃圾回收
  3. map 是有序的键值对，键允许任何类型与set类似，map也允许使用foreach 
  4. weakmap 只能包含对象类型的键，与weakmap相似，键的对象是弱引用，同weakset

六. array from,array of
  **先来个总结，Array.from 目的就是用来把一些伪数组类型(如js遍历节点获取,set等)或者可遍历对象转换成真数组的方法。
  Array.of（）就是把括号里面的值放入一个数组中，这个方法就是用来作为new Array() 或者Array 的替代品的，因为这两个方法用起来容易让人产生迷惑。**
  >let as = document.getElementsByTagName('a')
  Array.from(as) 
  只要是部署了iterator接口的数据结构，array.from都可以将其转换为数组
  说白了就是可遍历对象
  let arr = Array.from('juejin')
  Array.from接受三个参数，只有第一个参数是必须的
  input:你想要转换的类似数组对象和可遍历对象，
  map:类似于数组map方法，用来对每一个元素进行处理，将处理后的值放入返回的数组，
  context:绑定map中的this

  Array.of，当调用new Array()构造器时候，根据传入参数的类型和数量不同，实际上会导致一些不同的结果，例如
  >let items = new Array(2) 
  items.length //2 items[0] //undefined  items[1]

  >let items = new Array(1,2)
  items.length //2  items[0] //1  items[1]  //2

  **当使用单个数值参数来调用Array构造器时，数组的长度属性会被设置为该参数，如果使用多个参数，来调用，这些参数也会成为目标数组的项，这些构造方法其实写的有点怪，所以引入了array.of来解决这个问题，array.of方法总会创建一个包含所有传入参数的数组，而不管参数的数量与类型**
  >let items = Array.of(1,2) 
  items.length //2  items[0] //1 items[1] //2
  itmes = Array.of(2)
  items.length //1

七. Symbol
  es5中包含五种原始类型：字符串，数字，布尔值，null，undefined。es6引入了第六种数据类型Symbol 
  在es中对象属性名都是字符串，很容易造成属性名冲突，比如使用了一个他人提供的对象，想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突，如果有一种机制，保证每一个属性的名字都是独一无二的，这样就从根本上防止了属性名冲突，这就是es6引入symbol的原因.
  Symbol函数会返回symbol类型的值，该属性具有静态属性和静态方法，他的静态属性会暴露几个内建的成员对象，他的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说他并不完整，他不支持语法new Symbol()
  1. symbol 值是通过symbol函数生成的，对象的属性名现在可以有两种了 一种是字符串，另一种是symbol类型，凡是属性名属于symbol类型，就是独一无二的，可以保证不会与其他属性名冲突
  >let aa = Symbol()
  let bb = {}
  bb[aa] = '123ddd'
  bb[aa] // 123ddd
  描述，直接使用Symbol()创建新的新的属性，并用一个可选的字符串作为其描述，
  >var s1 = Symbol('aa'); var s2 = Symbol('aa')
  他两个是不一样的，只能说创建了两个属性的symbol的描述符是一样的，
  
  symbol的描述存储在内部[\[description]]中,只有调用symbol的tostring方法才能读取这个属性

  2. 由于每一个symbol的值都是不相等的，这意味着symbol值可以作为标识符，用于对象属性就能保证不会出现同名的问题这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或者覆盖,需要注意的是symbol的值作为对象属性名时，不能用点运算符
  >var my = Symbol()
  var a = {}
  a.my = 'heelo'
  a[my] //undefined
  a['my'] //heelo

  3. 全局共享，有时希望能够让symbol能够跨文件使用，例如两个不同的对象类型，但是希望他们使用同一个symbol属性来表示一个独特的标识符。这个时候可以使用Symbol.for 和 Symbol.keyFor 从全局注册并取得对应的symbol.
  symbol.for,如果想创建一个可共享的symbol，要使用symbol.for方法，它只接受一个参数，也就是即将创建的symbol的字符串标识符，这个参数也同样用作symbol描述
  >let uid = Symbol.for('uid')
  let object = {} object[uid] = 12345

  Symbol.for方法首先在全局symbol注册表中搜索键位uid的symbol是否存在，如果存在直接返回已有的symbol否则创建一个新的symbol'并使用这个键在symbol全局注册表中注册，随机返回新创建的symbol，后续如果传入同样的键调用symbol.for 会返回相同的symbol
  >let uid = Symbol.for('uid')
  let object = {} object[uid] = 12345
  let uid2 = Symbol.for('uid')
  uid === uid2 //true

  symbol.keyfor，可以使用symbol.keyFor方法在symbol全局注册表中检索与symbol有关的键，
  >let uid = Symbol.for('uid')
  Symbol.keyFor(uid) //'uid'
  let uid2 = Symbol.for('uid')
  Symbol.keyFor(uid) //'uid'
  let uid3 = Symbol('uid')
  Symbol.keyFor(uid3) // undefined 
  uid,uid2都返回了uid这个键，而在symbol上全局注册不存在uid3这个symbol，也就是不存在与之有关的键，所以返回undefined


感谢以下链接分享:
http://www.imooc.com/article/details/id/79340
https://www.jianshu.com/p/af78964c33e2
https://www.cnblogs.com/xiaohuochai/p/7245510.html
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol