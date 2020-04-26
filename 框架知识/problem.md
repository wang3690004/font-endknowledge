1. 开发过程中遇到了 regeneratorruntime is not defined 这里是使用了async函数之后 无法解析的问题 需要安装一个babel来解析他们
下载babel-plugin-transform-runtime
2. 在mounted中使用document.getelementxxx 获取节点会发现无法获取全部，需要settimeout设置延时来获取。注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted,并且mouted获取dom，只能拿到初始数据，如果中间有异步修改了dom元素，就只能在updated获取