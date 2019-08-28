####react-redux 
以前在学习vue的时候vuex就没搞明白。  现在开始学习react,特地创建一个文件来记录学习redux


redux 是一个状态管理工具，react设计理念是单向数据流而且从高向低流动，而我们在构建react时候 通常需要获取其他组件的状态，如果组件繁多 获取修改其状态就比较麻烦。

1. 使用redux的程序，所有的state都存储在一个单一的数据源store内部，类似一个巨大的对象树
2. state是只读的，能改变state的唯一方式是通过action来触发
3. 为了描述action如何改变state tree， 需要编写reducer（也可以称之为计划要用到的方法. reducer 是一些纯函数，接口当前state和action

store就是保存数据的地方，可以把它看成一个容器，整个应用只有一个store
redux提供createStore 用来生成store
>import {createStore} from 'redux'// 根据老的state和action生成新的state
function counter(state=0,action){ 
     switch(action.type){       
        case "+":    
        return state+1; 
        case "-":           
         return state-1;        
         default:            
         return 10;         
    }
}// 新建storeconst store = createStore(counter);


state  当前的状态可以通过store.getState() 拿到
>import {createStore} from 'redux'// 根据老的state和action生成新的statefunction counter(state=0,action){    
  switch(action.type){      
      case "+":           
       return state+1;      
         case "-":          
           return state-1;    
               default:       
                    return 10;         
    }
}// 新建storeconst store = createStore(counter)
const state = store.getState();
console.log(state);  // 10


dispatch(action) 通过dispath(action)方法派发事件更新state
>import {createStore} from 'redux'// 根据老的state和action生成新的statefunction counter(state=0,action){ 
     switch(action.type){    
           case "+":         
              return state+1; 
                     case "-":    
                       return state-1;    
                          default:     
                            return 10;         
    }
}// 新建storeconst store = createStore(counter)
console.log(store.getState());  //10
// 派发事件store.dispatch({type:'+'})
console.log(store.getState()); // 11

subscribe 注册监听器，监听state变化
>import {createStore} from 'redux'// 根据老的state和action生成新的statefunction counter(state=0,action){  
    switch(action.type){        
      case "+":            
      return state+1;       
       case "-":         
          return state-1;     
             default:           
              return 10;         
    }
}// 新建storeconst store = createStore(counter)
function listener(){  
    const current = store.getState();   
     console.log(`现在数字是${current}`);
}
store.subscribe(listener);
store.dispatch({type:'+'})

action 是一个对象，其中type属性是必须的，表示action的名称
>const action = {type:'+'}

action 并不止type一个参数，其他参数看自己的情况。


reducer  state收到action ，必须给出一个state 这样view才会发生变化，这种state的计算过程就是reducer 就是上面用到的
>function counter(state=0,action){   
   switch(action.type){        
     case "+":            
     return state+1;        
     case "-":            
     return state-1;        
     default:           
     return 10;         
    }
}






react-redux 
react-redux 组件分成两大类，ui组件和容器组件

ui组件:{
    1. 只负责ui的呈现，不带任何业务逻辑
    2. 没有状态（即不使用this.state这个变量）
    3. 所有数据都由参数(this.props)提供
    4. 不使用任何redux的api
}
容器组件 :{
    1. 负责管理数据和业务逻辑，不负责ui的呈现
    2. 带有内部状态
    3.使用redux的api
}


provider provider 组件在应用最外层，传入store即可 只用一次
>import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {counter} from './index.redux'
import {Provider} from 'react-redux'
const store = createStore(counter,applyMiddleware(thunk));
ReactDom.render(  
    <Provider store={store}>
        <App />
    <\/Provider>,    document.getElementById('root')
)



connect connect负责从外部获得组件需要的参数
>import React from 'react'
import {connect} from 'react-redux'
import {add,sub,addAsync} from './index.redux'
class App extends React.Component{
    render(){      
        return (          
            \<div>
                \<h1>现在数字:{this.props.num}</h1>
                \<button onClick={this.props.add}>+1</button>
                \<button onClick={this.props.sub}>-1</button>
                \<button onClick={this.props.addAsync}>异步+1</button>
            \</div>
        )
    }
}// state对象const mapStatetoProps = (state)=>{    return {num:state}
}// store.dispatch方法的映射const actionCreators = {add,sub,addAsync}

App = connect(mapStatetoProps,actionCreators)(App)
export default App



redux 操作流程： 将需要修改的state都存入到store里，发起一个action 用来描述发生了，用reducer描述action 如何改变state tree 创建store 的时候需要传入reducer 真正能改变store中数据的是store.dispath api

redux-thunk 概念： dispath一个action 后，到达reducer之前，进行一些额外的操作，就需要用到middleware 你可以利用redux middleware 来进行日志 创建崩溃报告，调用异步接口或者路由等等  就是对store.dispath的增强.

>用法： import {applyMiddleware,createStore } from 'redux'
    import thunk from 'redux-thunk'
    const store = createStore(reducers,applyMiddleware(thunk))

    直接将thunk中间件引入，放在applymiddleware 方法之中，传入creatstore方法 就完成了distpath功能的增强，可以在reducer中进行一个异步的操作
 
 感谢以下链接:
 https://www.cnblogs.com/vvjiang/p/9505646.html
 https://github.com/brickspert/blog/issues/22