关于hook
 
 我们不能再函数组件中试用state 因为他们不是类组件，hooks 让我们在函数组件中可以使用state 和其他功能
 useState ,useEffect useContext useReducer  hooks应该只在函数组件中试用 


  3.不可变性 是 提高性能的关键，不要对数据进行修改，而是始终在现有集合的基础上创建新的集合，以保持尽可能少的复制，从而提高性能



	import React,{userState,userEffect} from 'react'
	function example(){	
		const [count,setCount] = useState(0);
		useEffect(()=>{
			document.title=`you chiled ${count} times`;
		}])
		return (
		<div>
			<p>you cliked {count}</p>
			<button onClick={()=> setCount(count +1)}>click me </button>
		</div>)
	}

	useEffect 包含了componentdidmount  componentDidUpdate 生命周期  如果是需要执行清除操作的话，那么你的effect返回一个函数，react将会
	在执行清除操作时候调用它

	function friendstatus(props){
		const [isOnline,setIsOnline] = useState(null)
		useEffect(()=>{
			function handlestatuschange(status){
				setIsOnline(status.isOnline)
			}
			chatAPI.subscribeTofiend()
			return function cleanup(){
				charIP.xxx()
			}
		})

	}