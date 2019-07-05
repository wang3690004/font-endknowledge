### js中布尔值为true 或者的情况

业务开发中遇到一个问题： “表单权重可以填入0-1000 假设没有填写任何数据的话那么默认写入500”,
一开始我的代码是这样写的:

> handleUpdate({weight: weight || 500})

所以出bug了，假设输入的值为 0(Number) 那么最后保存的值为500  原因在于js中 0(Number) 在这种逻辑位摇摆判断的情况下会从左边开始，根据表达式运算结果而 0 会自动将其转换为false 那么自然就会保留后面 500了。
所以学习并总结了一波 js中在类似这种逻辑表达式判断的情况下 会转换为true或者false的几种情况

> var a  = undefined || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> 1
  var a = null || 1     &nbsp;&nbsp;&nbsp;&nbsp; -> 1
  var a = false || 1  &nbsp;&nbsp;&nbsp;&nbsp; -> 1
  var a = 0 || 1  &nbsp;&nbsp;&nbsp;&nbsp; -> 1 
  var a = NaN || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> 1
  var a = "" || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> 1
  var a = "  " || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> "  "
  var a = [] || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> []
  var a = {} || 1 &nbsp;&nbsp;&nbsp;&nbsp; -> {}

  所以可以看出 undefined null false 0 NaN  "" 在这种逻辑判断中会自动转换为false 表达式所以自然a的结果是a  
  而"  ", [],{} 这种自动会转换为true ，
  
  **需要注意的是 这种逻辑表达关系 || 后面为else 关系，那么意味着假设前者转换为false 那么后者判断后 无论转换后判断关系是true或者false  都会赋值如下代码:**

  >  var a  = undefined || 0 &nbsp;&nbsp;&nbsp;&nbsp; -> 0
     var a = 0 || undefined     &nbsp;&nbsp;&nbsp;&nbsp; -> undefined

  另外在antd-design-pro中发现一个用法  !! 即   !!3  !!undefined !!{}
  这种是将数据类型直接强制转换为boolean类型的方法
  >!!0 ->false  
    !!1 ->true



  

      
  