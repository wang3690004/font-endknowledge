#####instanceof 的原理及实现
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


https://github.com/yygmind/blog/issues/34