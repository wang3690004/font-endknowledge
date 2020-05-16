####异步更新& nexttick
>vue在更新dom时是异步的（这个和react的setstate道理应该是类似的）只要侦听到数据变化，vue将开启一个队列，并缓冲在同一事件循环中发生的数据变更，如果同一个watcher被多次触发，只会被推入到队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和dom操作是非常重要的。然后在下一个事件循环tick中，vue刷新队列并执行实际（去重）的工作。react中setstate可以在里面设置一个方法 使其必须执行并且不产生合并，或者使用settimeout来使其必须执行而不合并，而vue主动帮你处理好了.如果不使用nexttick 数据无法实时更新到下面，自然后面要再次使用会发现数据没有发生改变，数据更新不是实时的 是异步的。
例如： 当你设置vm.somedata = 'new value',该租价你不会立刻重新渲染，当刷新队列时，组件会在喜爱个事件循环tick中更新，多数情况下我们不需要关心这个过程，但是如果你想基于更新后的dom状态来做点什么，这有可能存在问题，为了在数据变化之后等待vue完成更新dom，可以在数据变化后立即使用 vue.nextTick(callback).这样回调函数会在dom更新完后被调用

nexttick触发机制:在同一时间循环中的数据变化后，dom完成更新，立刻执行nexttick的callback回调，像是一个宏任务，在下次渲染完成后才执行

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

需要注意的是 在created和mounted阶段 如果需要操作渲染后的试图，也要使用nexttick方法,官方文档有说明：mounted不会承诺所有的子组件也都一起被挂载，如果你希望等到整个视图都渲染完毕，可以用nexttick替换掉mounted,如果是希望在mounted获取dom，nexttick不好使的情况下 需要使用settimeout 作为宏任务获取
```
mounted:function(){
    this.$nextTick(()=>{

    })
}
```
关于nexttick的执行顺序，更像是事件循环里面的微任务，当宏任务执行完毕后自然就会去执行nexttick，并且他会在dom视图更新之后调用，
在同步执行环境数据完全更新完毕后 dom才更新，这个跟setstate很像，在这个过程中可能会合并一些重复值，
如果在同一个事件循环中有多个tick 将会按照最初的执行顺序调用






需要注意的是:
1. 在官网中 有这样一句话，mounted不会承诺所有的子组件也都一起被挂载， 这个在开发中也着实遇到了这个问题，就是在父组件mounted中通过getelementbyclassname  去获取批量dom时候发现没有办法全部都获取到，这时候可以考虑使用this.$nextTick(),或者使用settimeout 来将其放入下一个队列中

根据vue是单向数据流，子组件的修改是不会触发

2. 父子组件的渲染顺序，其实还是看子组件的引入方式，如果子组件是同步引入的 如 import page from 'xxx'时，
父组件的beforecreate-> created-> beforemount-> 所有子组件的beforecreate ->created ->beforemount-> 所有子组件mounted-> 父组件mounted, 这里面子组件的渲染顺序是根据调用顺序即代码顺序有序进行的。

当const page = ()=> import('xxx')改为异步引入时候
当子组件为异步时，顺序 父组件的beforecreate-> created-> beforemount-> mounted-> 子组件beforecreate ->created ->beforemount-> 子组件mounted,这时候因为对于子组件的请求顺序不一致 自然渲染的顺序无法保证 所以就想官网的那句话一样





感谢以下链接的分享:
https://www.cnblogs.com/hity-tt/p/6729118.html
http://www.geekjc.com/post/5d4e82ae4801ae3dc07e43e7#created%E3%80%81mounted
https://www.lagou.com/lgeduarticle/20050.html
https://segmentfault.com/q/1010000019401707