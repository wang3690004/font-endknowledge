####异步更新& nexttick
>vue在更新dom时是异步的（这个和react的setstate道理应该是类似的）只要侦听到数据变化，vue将开启一个队列，并缓冲在同一事件循环中发生的数据变更，如果同一个watcher被多次触发，只会被推入到队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和dom操作是非常重要的。然后在下一个事件循环tick中，vue刷新队列并执行实际（去重）的工作。react中setstate可以在里面设置一个方法 使其必须执行并且不产生合并，或者使用settimeout来使其必须执行而不合并，而vue主动帮你处理好了.如果不使用nexttick 数据无法实时更新到下面，自然后面要再次使用会发现数据没有发生改变，数据更新不是实时的 是异步的。
例如： 当你设置vm.somedata = 'new value',该租价你不会立刻重新渲染，当刷新队列时，组件会在喜爱个事件循环tick中更新，多数情况下我们不需要关心这个过程，但是如果你想基于更新后的dom状态来做点什么，这有可能存在问题，为了在数据变化之后等待vue完成更新dom，可以在数据变化后立即使用 vue.nextTick(callback).这样回调函数会在dom更新完后被调用

```
<template>...</template>
data(){
    return {
        message:'未更新'
    }
},
methods:{
    updatemessage(){
        this.message='已更新';
        console.log(this.$el.textcontent)  //未更新
        this.$nextTick(function(){
            this.$el.textcontent    //已更新
        })
    }
}

```

**将回调延迟到下次dom更新循环之后执行，在修改数据之后立刻使用他，然后等待dom更新，如果没有提供回调并且在支持promise的环境中，则返回一个promise，**