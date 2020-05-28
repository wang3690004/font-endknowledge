```
1. for(var i =0; i<10; i--){}  //false
   for(var i=10; i<10; i++>){} //true
```
```
2.var p={
    get name1(){
            // false
    }
    get name2(){
        return ; //false,当allowImplicit:true 时 可以返回一个空return 默认是false
    }
    get name(){
        return xxxx //true
    }

}
```
```
3.const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});   //false 禁止回调使用异步可以再then中使用异步

const foo = new Promise((resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);   //true

```

```
4.if(x === -0){}  //false
if(x=== 0){} //true
```
```
5.var x;
if(x=0){
    var b =1;   //false
}
function test(some){
    do{
        some.height ='33'
    }while((some = some.parent))
}   //当设置except-parens为true  当设置为always为false
```
```
6.if(true/false){...}  //false
if(x=== 0){...}  //true
for(;true;){...} //false  当checkloops为false时 不报错  为true时 报错
do{...}  while(true)   //当checkloops为false时 不报错  为true时 报错
```

```
7. var test1 =  /\x1f/   //false
   var test2 = /\x20/  //true
```
```
8. function a(){
    ...
    debugger;
    ...        //false
}
```
```
9. function(a,b,a){
    ... //false
}
var a = function(a,b,a){
    ... //false
}

```
```
10. var foo = {
    a:'3',
    a:'4',  //false
    "a":'5' //false
}
```
```
11. switch (a){
    case 1: ...
    case 2: ...
    case 1: ...  //false 任何类型都不允许一样
}
```
```
12. if(foo){
    //asdasdasd
}  
    while(foo){}
    switch(foo){}
    try{
        a()
    }catch(err){

    }
    以上都是false,  不过可以再里面加入注释这样就没有问题,
    if(foo){//empty} 
    当allowemptycatch = true  catch可以为空
```
```
13. /^abc[]/.test('abcdefg')  //false []
    /^abc/.test("abcdefg");   //true
    "abcdefg".match(/^abc/);   //true
```
```
14. try{
    ...
}catch(e){
    e.x = ...    //false
    let a = ...   //true
}
```
```
15. let foo = !!bar
    let foos = 3|'3'
if(!!foo){
    ...  //false
}
if(!!foos){
    ... //true
}

```
```
16.let x =5 ;;  //false
```
```
17. function foo(){}
bar= sting|function|number
foo = bar

```
```
18. 
function c(){
    let fn
    if(c){
    fn= function express(){}  //true
    function b(){}  //false
    var a   // false
    }
}

```
```
19. function thing() /*<NBSP>*/{
    return 'test';
}

function thing( /*<NBSP>*/){
    return 'test';
}

function thing /*<NBSP>*/(){
    return 'test';
}

function thing᠎/*<MVS>*/(){
    return 'test';
}

function thing() {
    return 'test'; /*<ENSP>*/
}

function thing() {
    return 'test'; /*<NBSP>*/
}
要求所有空格严格限制一直
```
```
20. var math =Math() / JSON() /Reflect()  //false
    var math = Math.PI / JSON.parse() / Reflect.get
    
```
```
21. var hasBarProperty = foo.hasOwnProperty("bar");

var isPrototypeOfBar = foo.isPrototypeOf(bar);

var barIsEnumerable = foo.propertyIsEnumerable("bar");
//false
  
var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
//true
```
```
22. var re = /foo   bar/  //false
   var re = /foo {3}bar/  //true
```
```
23. var itmes = [1,2,,3]  
```
```
24. function fn(){
    x=1;
    return 
    x =3;   //false
}
```
```
25. (() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();
```
```
26.some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function(foo) {
    return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
    if (n < 2) return 1;
    return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
    return y;
}
```
```
27. 禁用var 用let
```
```
28. var a = b = c = 5;

var foo = bar = "baz";  //false
```
```
29. if (foo) {
    foo++;
}

while (bar) {
    baz();
}

if (foo) {
    baz();
} else {
    qux();
}  // 默认需要所有带有大括号得代码块都要强制写括号 即使只有一条语句
```
```
30. a === b
foo === true
bananas !== 1
value === undefined
typeof foo === 'undefined'
'hello' !== 'world'
0 === 0
true === true
foo === null
```
```
31. var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```
```
32.  'no-console': process.env.NODE_ENV === 'production' ? '0' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
```


```
33.
```


```
34.
```
```
35.function add(x, y) {
// --->..return x + y;

      return x + y;
}

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```
```
36.import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```
```
37. var a = 3;
var a = 10;  //false

```
```
38.if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```



```
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
}
```


###二、其他规范建议
1. 建议使用 Object.prototype.Tostring.call() 判断类型, hasOwnProperty() 判断属性存在
2. 常量全大写 
3. 尽量不要使用全局方法
4. 变量/方法命名，采用驼峰, 组件名 第一个字母大写后，仍遵循驼峰原则。  class/id 由小写字母书写用- 分割
5. 业务性较强的方法或代码片段需要注明注释 业务代码html块需要注释，特别是国际化翻译之后的代码里面不包含中文字符， 有了代码块注释后续的排查会更方便
6. css less 使用过程中 需要添加一个大父类防止样式错乱，样式代码全部用小写， 嵌套不要太深建议3-4级最多， 像素等属性值为0的时候 不用谢写px。 可以考虑将部分公共样式抽出来建议(颜色和文字),样式初始化后在进行样式库的引入
最外层的命名规则需要有个格式统一 暂时定文件路径