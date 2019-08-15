####this&& ES6 箭头函数

分析this问题 的本质就是分析方法当前的上下文到底是什么？（特殊情况除外）

this的指向问题有一个比较通用的口诀就是:'谁调用了这个方法那么this就指向谁','this是从哪里来的','函数是怎么被调用的','在这个箭头函数被定义的地方，this是什么',在学习过程中需要了解js中调用函数的一些术语：
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
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       console.log(this === numbers); // => false
       return this.numberA + this.numberB;
     }
     return calculate();
   }
};
numbers.sum(); // => NaN 

sum()是对象上的方法调用，所以sum中的上下文是numbers对象，calculate函数是在sum中定义的，但是它是一个函数调用（不是方法调用）所以this指向的是windows。 所以sum（）结果是nan 为了解决这个问题。有一个办法是使用call apply来绑定上下文，
> const numbers={
	numbera:5,
	numberb:10,
	sum:function(){
		function calculate(){
			return this.numbera + this.numberb
		}
		return calculate.call(this)
	}
} 这样将this绑定到sum的上下文 就没问题了。 同理还可以使用es6的箭头函数
     const calculate() =>{ return this.numbera + this.numberb}
		 return calculate()


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
//这里test下的this 果然是指向的是test 这个方法原则上方法调用就是谁调用这个方法 this就是指向谁

2.方法调用
  2.1 方法是在存储在对象属性中的函数，例如
 > const myobject={
	 hellofunction:function(){
		 return 'hello '
	 }
 }
 const message = myobject.hellofunction()   

 区分函数调用和方法调用很重要，因为他们是不同的类型，主要区别在于方法调用需要一个属性访问器形式来调用函数，（obj.func|| obj['func']）而不需要myfun()
 >['hello'].join('ss')  //方法调用
  {{ten:function(){return 10}}}.ten()  //方法调用
	const obj ={}  obj.myfunction= function(){}  obj.myfunction()  //方法调用
	const otherfunction = obj.myfunction
	otherfunction()  //函数调用
	parsefloat('ss') //函数调用

 2.2 方法调用的一个例子：
> const calc={
	num:0,
	increment:function(){
		this.num +=1 ;
		return this.num
	}
}
calc.increment();  1  calc.increment();  2

调用calc.increment() 使increment 函数的上下文成为calc对象，所以this.num来增加num 是有效的

2.3 在es6 class语法中 方法调用上下文也是实例本身
> class planet{
	constructor(name){
		this.name =name
	}
	getname(){
		console.log(this.earth)  true
		cosnole.log(this)
		return this.name
	}
}
var earth = new Planet('earth')
earth.getName()  //earth
planet(){
	name='earth'
}


2.4陷阱 将方法与其对象分离
>function animal(type,legs){
	this.type = type
	this.legs = legs
	this.loginfo = function(){
		console.log(this === myCat)
		console.log(type,legs)
	}
}
const myCat = new Animal('cat',11)
setTimeout(myCat.loginfo,1000)

将分离的loginfo 作为函数调用时，this是全局window 
此时settimeout内部相当是这样的
const extractedloginfo = myCat.loginfo
>setTimeout(extractedloginfo)

可以使用.bind()方法与对象绑定，就可以解决this的问题  
setTimeout(myCat.loginfo.bind(myCat),1000)
mycat.loginfo.bind(mycat) 返回一个新函数，他的执行方式与loginfo完全相同，但是此时this指向mycat，即使在函数调用也是如此.

另一种解决方案依旧是箭头函数，   this.loginfo=()=>{
	console.log(this===myCat) //true
	console.log(type,legs)
}
这样从代码执行前就已经绑定好了上下文


3. 构造函数调用
当new关键词紧接着函数对象（参数）时被调用 执行的构造函数调用 如  new regexp()
构造函数创建了一个新的空的对象，他从构造函数的原型继承了属性，构造函数的作用就是去初始化这个对象，可能你已经知道了 在这种类型的调用中，上下文指向新创建的实例.
>function country(name,traveled){
	this.name = name? name:'aaa',
	this.travled = boolean(traveled)
}
country.prototype.travel = function(){
	this.travled =true
}
const france = new country('aa',false) //构造函数调用
const unitedkingdom = new country  //构造函数调用，如果不使用参数可以不用写括号
france.travel    

3.1 陷阱：忘记使用new
 有些js函数不只是在作为构造函数调用的时候才创建新的对象，作为函数调用时也会，例如RegExp
 > var reg1 = new RegExp('');
 var reg2 = RegExp('')
 reg1 instanceof RegExp  //true
 reg2 instanceof RegExp  //true

但是不使用new来初始化的话会有一些问题
>function Vehicle(type,wheel){
	this.type = type
	this.wheel = wheel
	return this
}
const car = Vehicle('aa',4)
car.type //aa car.wheel //4  car === window //true

当执行vehicle时，返回一个对象car 他具有正确的属性 type 和wheel 你可能认为他很适合创建和初始化新对象

然后在调用中发现this指向的是window 所以这一切都是在给window做修饰


4. 隐式调用
  运用call apply 就是运用隐式调用， 他们可以改变上下文的方法 例如：
	> function runner(name){
		console.log(this instanceof rabbit) //true
		this.name =name
	}
	function rabbit(name,leg){
		console.log(this instanceof rabbit) //true
		runner.call(this,name)
		this.leg =leg
	}
	const myrabbit = new rabbit('aa',4)
	myrabbit  // {name:'aa',leg:4}
	rabbit 中的runner.call(this,name)隐式调用了父类的函数来初始化这个对象

5. 绑定函数
	绑定函数是与对象链接的函数，通常使用。bind() 方法从原始函数创建，原始函数和绑定函数共享相同的代码和作用域，但执行时上下文不同
	注意 绑定的第一个参数 可以是一个常数，比如2 也可以是一个对象
	>function multiply(number){
		return this*number
	}
	const double = multiply.bind(2)
	double(3) //6
 
5.1 bind创建的是一个紧密的上下文绑定 一旦创建后面将无法更改 即使是使用bind

6. 箭头函数, es6的方法，用于以更短的形式声明函数，并在词法上绑定上下文，
 > const hello = (name)=>{return name}
	hello('world') // world

	箭头函数不会创建自己的执行上下文，而是从定义他的外部函数中获取this 。在词汇上绑定this
> class point{
	constructor(x,y){
		this.x = x.
		this.y = y
	}
	log(){
		setTimeout(()=>{console.log(this.x,this.y)},1000)
	}
}
const mypoint = new point(11,11)
mypoint.log()
  



参考来源:https://juejin.im/post/5d51feaef265da039005219e
