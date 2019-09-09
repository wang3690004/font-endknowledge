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



感谢以下链接分享:
http://www.imooc.com/article/details/id/79340
https://www.jianshu.com/p/af78964c33e2