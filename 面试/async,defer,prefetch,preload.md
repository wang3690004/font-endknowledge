![async,defer](../src/imgs/async,defer.png)
正常的js的下载和加载都会阻塞html相关内容的渲染
而使用了asnyc的js文件 下载不会阻塞html渲染，并且他是下载完成后就加载，并且不存在顺序的，适合那种没有依赖的js
而defer的下载过程中是异步的和async是一样的，只不过他是会顺序执行，即使下载完成之后在domcontentloaded前执行