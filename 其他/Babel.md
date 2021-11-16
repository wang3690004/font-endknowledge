###Babel
简单来说 babel 就是把 es2015 16 17 等新的语法转换成 es5 让低版本浏览器 nodejs 能够认识并执行

plugins: babel 本身是不具有任何转化功能的 他把转化的功能分解到一个个 plugin 里面 他更像是一个集合工具包。因此当我们不配置任何插件时 经过 babel 的代码和输入是相同的

preset: 一般来说编译 es6 代码需要很多插件 比如转译 class 箭头函数等 如果每次开发都要逐一添加并安装 配置文件长不说 安装时间也长 很麻烦 preset 分为以下几种

<ul>
<li>官方内容 目前包括env,react,flow,miniy 这里最重要的是env</li>
<li>stage-x 这里包含的都是当年最新规范的草案 每年更新，这里还细分为 stage-0/1/2/3/4</li>
    stage-0 只是一个想法 经过tc 39成员提出即可
    stage-1 提案 初步尝试
    stage-2 初稿 完成初步规范
    stage-3 候选 已经完成规范和浏览器初步实现
    stage -4 完成 将被添加到下一个年度发布
  我们平时开发一般使用 stage-3 即已经有了稳定版本且初步实现了功能。stage 后面的数字越小 包含的内容越多 即stage0 包含1234 stage1 包含2 3 4 使用的编译规范逐步保守
<li>es201x, latest</li>
  这些是已经纳入到标准规范的语法 例如es2015的箭头函数 es2017的尾逗号等 但是因为env的出现使得es2016 和es2017 都已经废弃，所以我们经常可以看到es2015被单独列出来 latest是env的雏形 他是一个每年更新意思的preset 目的就是包含所有的es201x 但也是因为更灵活的env出现 已经废弃
  env 内部集成了绝大多数plugin(stage>3)转移插件 会根据对应的参数进行代码转译
</ul>

执行顺序

<ol><li>先执行完所有的Plugin 再执行preser</li><li>多个plugin按声明的顺序执行</li><li>多个preset 按声明的倒序执行  preset逆向顺序只要是为了保证向后兼容 因此大多数用户的编写顺序是["es2015","stage-0"]</li></ol>
```
例如 
{
    "plugins":[
        "transform-react-jsx",
        "transform-async-to-generator"
    ],
    "presets":[
        "es2015",
        ["@/babel/env",{"targets":{"browsers":["last 2 versions,"safari > 7]}}]
    ]
}
```
https://juejin.cn/post/7025237833543581732#heading-12
https://segmentfault.com/a/1190000040533280
