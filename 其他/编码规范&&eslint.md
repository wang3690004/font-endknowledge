###一、eslint配置的规范 
 组里决定搞编码规范，所以搞了一套，在vue-cli里面的配置是这样的， 文件上传到src/其他中，里面有讲解和示例,当然最好还是看文档 很全 很完整
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
      'no-alert':process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'semi':['error','always'],
      'no-multi-assign':'error',
      'curly':['error','all'],
      'quotes':['error','single'],
      'no-mixed-spaces-and-tabs':'off',  //覆盖eslint:recommended:error
      'no-duplicate-imports':'error',
      'keyword-spacing':'error',
      'no-multiple-empty-lines':['error',{'max':2}],
      'indent':['error',2,{'SwitchCase':1}],
      'no-empty':'off'  //覆盖eslint:recommended:error
   
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  };
  

```


###二、其他规范建议
1. 建议使用 Object.prototype.Tostring.call() 判断类型, hasOwnProperty() 判断属性存在
2. 常量全大写 
3. 尽量不要使用全局方法
4. 变量/方法命名，采用驼峰, 组件名 第一个字母大写后，仍遵循驼峰原则。  class/id 由小写字母书写用- 分割
5. 业务性较强的方法或代码片段需要注明注释 业务代码html块需要注释，特别是国际化翻译之后的代码里面不包含中文字符， 有了代码块注释后续的排查会更方便
6. css less 使用过程中 需要添加一个大父类防止样式错乱，样式代码全部用小写， 嵌套不要太深建议3-4级最多， 像素等属性值为0的时候 不用谢写px。 可以考虑将部分公共样式抽出来建议(颜色和文字),样式初始化后在进行样式库的引入




详细配置规则可参考
 https://eslint.bootcss.com/docs/rules/