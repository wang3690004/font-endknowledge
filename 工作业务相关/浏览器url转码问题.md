###浏览器url转码问题
####前言
一次需求开发中需要发送src 并打开iframe,src包含了账号、密码等相关信息,其中密码包含了特殊字符。链接的打开的过程中会被浏览器自动转码，开发中忽略了对特殊字符的转义导致出现了问题，现特此记录一下。

背景：网络标准规定 url中只能包含英文字母、阿拉伯数字、以及一些特殊的字符， 特殊字符包含 $ - _ . + ! * ' ( ) [ ]  如果url中包含如汉字或其他特殊字符则需要对他们进行编码，否则这些特殊的字符就会被浏览器自动编码从而在传递url时候不是服务器想要的，


正文：
1. escape,unescape 两个方法已经废弃 所以也没什么看的必要了,所以主要说encodeURI,decodeURI,encodeURIComponent, decodeURIComponent
2. encodeURI,decodeURI,  他们用于给整体url进行编码的函数，着眼于整个url编码，因此除了常见的符号外，对其他一些再网址中有特殊含义的符号" ; / ? : @ & + = $ , # " ,也不进行编码，编码后 他输出符号的utf-8形式，并且再每个字节加上% 
``encodeURI('https://www.baidu.com/ a b c')  
 "https://www.baidu.com/%20a%20b%20c"
``

3. encodeURIComponent,decodeURIComponent 主要是针对url中的值进行转义的，会把很多encodeurl无法转义的特殊字符进行转义，比如 " ; / : @ & + $ , # "。 该方法不会对ascll 字母和数字进行编码 也不会对这些ascll 标点符号进行编码 应用场景最常见的就是手工拼接url的时候对没对keyvalue使用 encodeURIComponent进行转义

`` this.iframesrc = `${data['iframeurl']}/middlepage?confNum=${encodeURIComponent(data['confnum'])}&principle=${encodeURIComponent(data.subAccount.principle.replace(/%/g, '%25'))}&credential=${encodeURIComponent(data.subAccount.credential.replace(/%/g, '%25'))}`
``

感谢以下链接：
https://blog.csdn.net/qq_21071965/article/details/62884067
https://www.zhihu.com/question/21861899
