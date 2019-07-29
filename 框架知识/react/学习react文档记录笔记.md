#####react 官方文档学习笔记

1. jsx 确实好用，他将 js 与 html 结合到一块 看起来更加舒服用起来也很方便。 并且 react DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容，所有的内容在渲染之前都被转换成了字符串，这样可以有效防止 xss 攻击

2. 组件分为函数组件和 class 组件,react 元素也可以是用户自定义的组件,

   > const element = \<Welcome name ='sara'>

   当 react 元素为用户自定义组件时，他会将 jsx 所接收的属性转换为单个对象传递给组件，这个对象被称为 props

   > function Welcome(props){
   > return \<h1>Hello,{props.name}</h1>
   > }
   > const element = \< Welcome name="sara">
   > ReactDOM.render(element,document.getElementById('root'))

   函数组件如此 class 组件同样如此 只是写入的形式变化了而已 class 组件要在 constructor 里面初始化这些 props
   **值得注意的地方是 在看到函数组件的用法之前 我肯定会这样去写
   const element = Welcome(name) 这种传统的调用方法 这样也没问题，只是看起来没有那么'react'化 会有点显得不够专业.**

3. props 无法不可以修改自身的 props 无论是函数还是 class 组件,state 的每一次数据更新 render 都要重新去调用一次的 这样去刷新更新的组件，所以才会有优化的地方
4. 正确的使用 state 1.不要直接修改 state 要使用 setState, 2.state 的更新可能是异步的 处于性能考虑 react 可能会将多个 setState 合并成一个去调用。因为 this.props,this.state 可能会异步更新，所以不要去依赖他们的值去更新下一个状态
   > this.setState({counter:this.state.counter + this.props.increment}) 这样是错误的,

要解决这个问题，可以让 setState() 接受一个函数而不是一个对象，这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 作为第二个参数.

> correct this.setState((state,props)=>{
> counter:state.counter + props.increment
> })

执行 setState() 之后干了什么
setState()方法通过一个队列实现 state 更新，当执行 setState()的时候，会将需要更新的 state 合并之后放入状态队列，而不会立刻更新 this.state(可以和浏览器的事件队列类比) 如果外面不使用 setState 而是使用 this.state.key 来修改，将不会触发组件的 re-render 如果将 this.state 赋值给一个新的对象引用那么其他不在对象上的 state 将不会放入状态队列中，所以下次调用 setstate() 并对状态队列进行合并时 直接造成 state 丢失

void setState(
function|object nextState,
[function callback]
)

第一个参数支持方法和对象 第二个参数是回调

由 react 控制的事件处理过程 setState 不会同步更新 this.state
也就是说在 react 控制之外的情况，setState 会同步更新 this.state

5.  <button onClick={e=> this.deleteRow(id,e)}>
    \<button onClick = {thjis.deleteRow.bind(this,id)}>
    效果是一样的
6.  在 js 中 true&& expression 总会返回 expression 而 false && expression 总是会返回 false.因此，如果条件是 true ,&&右侧的 expression 就会被执行，如果是 false ，react 会忽略并跳过

7.  阻止条件渲染， 在极少数的情况下，可能需要可以隐藏组件，即使它已经被其他组件渲染，若要完成此操作，你可以让 render 方法直接返回 null ，而不进行任何渲染 (如果没记错的情况下，在我最近的代码中就是利用条件更改 className。某个组件是否要添加某个样式 其实这里有个更好的办法)
    下面的实例中 <WarningBanner \/>会根据 prop 中 warn 的值来进行条件渲染，如果 warn 的值是 false 那么就组件不会渲染
    > function WarningBanner(props){
    > if(!props.warn){
        return null;
    }
    return(
    \<div className="warning">
    warning!
    </div>
    )
    class Page extends React.Component{
    constructor(props){
    super(props);
    this.state = {showwarning:true}
    this.handleToggleClick = this.handleToggleClick.bind(this)
    }
    handleToggleClick(){
    this.setState(state=>({
    showwarning:!state.showwarning
    }))
    }
    render(){
    return (
    \<div>
    \<WarningBanner warn={this.state.showWarning} />
    \<button onClick={this.handleToggleClick}>
    {this.state.showwarning? 'hide':'show'}
    )
    }
    }
    }

在组件的 render 方法中返回 null 并不会影响组件的生命周期，componentDidUpdate 仍然会被调用

8. 在进行数据遍历的时候记得要加 key 这样是帮助 react 识别 哪些元素改变了，比如被添加或者删除，因此你应该给数组之中每一个元素添加一个确定的标识 ， 一般都用 key 如果是在是没有办法用 index
   如果列表的顺序可能发生变化，不建议使用 index 来做 key 值，这样不仅性能会变差 还有可能引发组件状态问题，

9. 关于状态提升 和 react 实现双向绑定 要仔细看一下
   **状态提升通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。在这个提升过程中最重要的还是当 setState 发生的时候 页面是会重新渲染的 想要改变父组件的状态，目前只能是通过父组件将方法传入到子组件 子组件去触发 state 的状态,官网的例子中有说到，所谓的变量提升 将多个组件中需要共享的 state 向上移动到他们最近的共同的父组件中，便可以共享 state，这就是所谓的状态提升，而要做到在子组件更新父组件的状态 则需要父组件将相应的方法通过 props 传入到子组件中，(因为子组件的 props 是只读的 并且使用 setstate 也无法影响到另外的子组件 而不能达到同步的效果)**
   在 react 中，任何可变数据应当只有一个相对应的唯一‘数据源’.通常 state 都是首先添加到需要渲染数据的组件中去，然后，如果其他组件也需要这个 state 那么你可以将他提升至这些组件的最近共同父组件中，应该依靠自上而下的数据流 而不是尝试在不同组件间同步 state

10. 代码分割及优化
11. context 对于多层组件的 props 可以直接共享而不用显示的通过组件树去逐层传递
12. 错误边界
13.
