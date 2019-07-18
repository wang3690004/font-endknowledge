####for in & for of 区别和用法

先来个结论： **for in 更适合遍历对象属性 ， for of 更适合 除对象属性外的其 例如数组 set map 字符串** 

> Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"
for (var index in myArray) {
  console.log(myArray[index]);
}
//1,2,4,6,7,数组, function(){console.log(this.length)}

在代码中自定义了一个Array的原型方法，并且添加了myArray的属性name
使用for in 来进行遍历 会发现可枚举的属性都被遍历了而使用for of呢
> Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"
for (var index in myArray) {
  console.log(index);
} // 1 2,4,5,6,7  

只是将数组里面的元素遍历出来了 涉及到的原型和属性都没有遍历

搜了一下资料 for in具体有以下的缺点
  1. index索引为字符型数字，不能进行几何运算
  2. 遍历顺序有可能不是按照实际数组的内部顺序，即是无序的
  3. 使用for in会遍历数组所有可枚举属性，包括原型，例如上面原型方法method和name属性
  
  如果不想遍历原型方法和属性的话可以在循环的内部判断一下是不是该对象的实例属性 hasOwnProperty 可以判断 

 > Object.prototype.method = function(){
	console.log(this)
}
var myobject = {
a:1,b:2,c:3
}
 for(var key in myobject){
	alert(key)
}
myobject.hasOwnProperty('method') //false
myobject.hasOwnProperty('a') //true
或者可以使用 Object.keys 来返回所有实例属性组成的数组 然后用for of去做遍历








for in for of 的具体用法也不太一样 for in是遍历的数组的索引(即键名) 而for of 是遍历的数组元素值。
for of 只是数组内的元素，而不包括数组的原型属性method 和 索引name 

感谢以下链接： 
[https://www.jianshu.com/p/c43f418d6bf0](https://www.jianshu.com/p/c43f418d6bf0)
[https://blog.csdn.net/GongZhongNian/article/details/79865704](https://blog.csdn.net/GongZhongNian/article/details/79865704)