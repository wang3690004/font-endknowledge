####处理url的方法

github 上一个练习题目 
> 获取  
'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33'
'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33'
'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=3'
中elective 后的数字输出 => []|| ['800'] || ['700']

一开始想到的是用正则去处理，发现我还真不太会写这个正则（后面要去加强学习）。 看了看其他人的写法有用到 new URLSearchParams() 这个类.
找了一下这个方法,除了不兼容IE 浏览器这个小小的缺点外 是个非常好用的方法

方法有这些
1. append(x,y) 插入一个指定的x(键)y(值)作为新的搜索参数
2. delete(x) 从搜索参数列表里删除指定的搜索参数及其对应的值 如果存在多个依旧全部删除
3. entries() 返回一个iterator 可以遍历所有的值和键的对象
4. get(x) 返回执行搜索参数的第一个值 
5. getAll(x) 返回所有的搜索的值 返回一个数组
6. has(x) 返回布尔值，判断是否存在搜索参数
7. keys() 返回iterator 此对象包含了键值的所有键名
8. set() 设置一个搜索参数的新值，如果有多个值将删除其他所有的值.
9. sort() 按键名排序
10. toString() 返回由搜索参数组成的字符串
11. values() 返回iterator 此对象包含了键值对的所有值 .



> var a  = new URLSearchParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33')
a.append('aaa',33) 
a.toString()   // '......&aaa=33'
a.has('id')   //false
a.append('aaa',33) 
a.getAll('aaa')  //['33','33']
a.get('aaa')  //'33'
a.delete('aaa')  //将aaa相关全部删除后的结果 
a.set('aaa',123)  //aaa改为123 
a.set('asda',12dddd)  如果asda 不存在 那么就会创建一个新的