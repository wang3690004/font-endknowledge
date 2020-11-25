> 1.关于pulic static void main (string[] args)
2.java中 语句要加; 并且大小写敏感，单引号 双引号敏感， 对于char 用''  String用"" String是一个类需要注意
3.数值的隐式类型转换，默认从低精度，低范围转向 高精度 高范围，  反之如果要转换的话就要显式转换 double a = 3.33; int b;   b= b + (int) a,
整型 常量，字符型数据可以进行混算，运算中 不同类型的数据优先转化为同一类型，然后进行运算
byte short chart ->int->long ->float->double

> 注意 不能对布尔类型的值进行转化， 不能把对象类型转换成不相关类的对象， 大范围转小范围要强制转换，且转换过程可能导致溢出或者精度丢失