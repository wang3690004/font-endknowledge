1.class Promise{
	constructor(fn){
		let resolve = ()=>{};
		let reject = ()=>{};
		fn(resolve,reject)
	}
}


	resolve  reject  的作用只是单纯用来改变promise的状态的 并且通过调用resolve('xxx')就是为了将一些执行结果的值放置到promise 实例中以便于后面使用
2.class Promise{
	constructor(fn){
		this.state = 'pending'
		this.value = undefined
		this.reason = undefined

		let resolve = (value)=>{
			if(this.state === 'pending'){
				this.state = 'fulfilled'
			}
			this.value = value
		};
		let reject = (reason)=>{
			if(this.state === 'pending'){
				this.state = 'rejected';
				this.reason = reason
			}
		};
		try{
			fn(resolve,reject)
		}catch(err){
			reject(err)
		}
	}

	then(onFulfilled,onRejected){
		if(this.state === 'fulfilled'){
			onFulfilled(this.value)
		}
		if(this.state === 'rejected'){
			onRejected(this.reason)
		}
	}
}

上述这些只是解决了同步的问题，假设resolve 代码前面是异步的话，可能结果还没有返回，then的state还是pending状态，这个时候需要在then调用的时候
将成功和失败存到各自的数组，一旦reject或者resove 就调用他们
类似于 发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then 所以存在同一个数组内
假设方法执行中 state状态还没有发生变化，那么就在pending阶段把所有的方法存到 实例中，同时还需要对resolve,添加一个判断，如果此时的状态是pending
那么就直接执行了then里面的方法了
e.g let p = new Promise  p.then() p.then()


3.
class Promise{
	constructor(fn){
		this.state = 'pending'
		this.value  = undefined
		this.reason = undefined
		this.onResolvedCallbacks = []
		this.onRejectedCallbacks = []
		let resolve = value =>{
			if(this.state === 'pending'){
				this.state = 'fulfilled'
				this.value = value
				this.onResolvedCallbacks.forEach(item=> item())
			}
		}
		let reject = reason =>{
			if(this.state === 'pending'){
				this.state = 'rejected'
				this.reason = reason
				this.onRejectedCallbacks.forEach(item=> item())
			}
		}
		try{
			fn(resolve, rejected)
		}catch(err){
			reject(err)
		}
	}

	then(onFulfilled,onRejected){
		if(this.state === 'fulfilled'){
			onFulfilled(this.value)
		}
		if(this.state === 'rejected'){
			onRejected(this.reason)
		}
		if(this.state === 'pending'){
			this.onFulfilledCallbacks.push(()=>{
				onFulfilled(this.value)
			})
			this.onRejectedCallbacks.push(()=>{
				onRejected(this.reason)
			})
		}
	}
}

在这里 我仍然有个疑问，就是假设p.then(fn1)  p.then(fn2) 他们用的值是同一个value吗 这样的话假设第一个值 更新了value了  后面怎么办?

解决链式调用 
 new Promise().then().then()
 1.为了达成链式，我们默认在第一个then 返回一个promise ， 同时在then里面返回一个新的promise 成为promise2
 	promise2 = new Promise((resolve,reject)=>{})

 	.将这个promise2 返回的值传递到下一个then中
 	.如果返回的是一个普通值，那么普通的值会传递给下一个then中


 2. 当我们在第一个then中 return 了一个参数，(需要判断) 这个return 出来新的promise 就是 onfullfilled 或者rejected 的值
 	onfullfilled 或 reject的值 ，即第一个then 返回的值 叫做x 判断x的函数叫做resolvepromise




我的理解是 每一个then都会创建一个promise2 这个promise2 会和 上一个promise onFulfilled()或者 onRejected() 后的结果x 做一个比较

首先要看x 是不是promise 如果是 promise 那么直接取他的结果 做为新的promise2成功的结果 
如果是普通值，直接作为promise2 成功的结果  

所以 reslovePromise(promise2,x,resolve,reject)




class Promise {
	constructor(fn){
		this.state = 'pending'
		this.value = undefined
		this.reason = undefined
		this.onFulfilledCallbacks=[]
		this.onRejectedCallbacks = []
		let resolve = value =>{
			if(this.state === 'pending'){
				this.state = 'fulfilled'
				this.value = value
				onFulfilledCallbacks.forEach(item=>item())
			}
		}
		let reject = reason =>{
			if(this.state === 'pending'){
				this.state = 'rejected'
				this.reason = reason
				onRejectedCallbacks.forEach(item=>item())
			}
		}
		try{
			fn(resolve,reject)
		}catch(err){
			reject(err)
		}
	}
	then(onFulfilled,onRejected){
		let promise2 = new Promise((resolve,reject)=>{
			if(this.state === 'fulfilled'){
				let x = onfullfilled(this.value)
				reslovePromise(promise2,x,resolve,reject)
			}
			if(this.state === 'rejected'){
				let x = onRejected(this.reason)
				reslovePromise(promise2,x,resolve,reject)
			}
			if(this.state === 'pending'){
				this.onFulfilledCallbacks.push(()=>{
					let x = onFulfilled(this.value)
					reslovePromise(promise2,x,resolve,reject)
				})
					this.onRejectedCallbacks.push(()=>{
					let x = onRejected(this.reason)
					reslovePromise(promise2,x,resolve,reject)
				})
			}
		})
		return promies2
	}
}

秘籍规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略

onFulfilled返回一个普通的值，成功时直接等于 value => value
onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，
所以直接扔出一个错误reason => throw err
2、秘籍规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
如果onFulfilled或onRejected报错，则直接返回reject()




function getUserId() {
    return new Promise(function(resolve) {
        //异步请求
        http.get(url, function(results) {
            resolve(results.id)
        })
    })
}

getUserId().then(function(id) {
    //一些处理
    假设这个时候返回值是null  传给下一个then的话 就是null   
     或者返回值是一个对象或者值的话 传给下一个then就是一个值

       或者返回值是一个promise  那么会将这个promise再次执行，同时将这个执行后的promise的值返回 并传给下一个then
})




class Promise{
	constructor(executor){
		this.state= 'pending'
		this.value= undefined
		this.reason = undefined
		this.onResolvedCallbacks =[];
		this.onRejectedCallbacks=[];
		let = resolve(value)=>{
			if(this.state === 'pending'){
				this.state = 'fulfilled'
				this.value = value;
				this.onResolvedCallbacks.forEach(item=>item())   这里不太明白 假设是同步操作的话 这里不会有任何可以执行的方法啊 
			}
		}
		let = reject = reason =>{
			if(this.state === 'pending'){
				this.state = 'rejected'
				this.reason = reason
				this.onRejectedCallbacks.forEach(item=>item())
			}
		}
		try{
			executor(resolve,reject)
		}catch(err){
			reject(err)
		}
	}



	then(onFulfilled,onRejected){
		onFulfilled = typeof onFulfilled=== 'function'? onFulfilled:value=>value
		onRejected = typeof onRejected === 'function'? onRejected: err=>{throw err}
		let promise2 = new Promise((resolve,reject)=>{
			if(this.state === 'fulfilled'){
				setTimeout(()=>{
					try{
					let x = onFulfilled(this.value)
					reslovePromise(promise2,x,resolve,reject)
				}catch(e){
					reject(e)
				}
				},0)
			}

			if(this.state === 'rejected'){
				setTimeout(()=>{
					try{
						let x = onRejected(this.reason)
						reslovePromise(promise2,x,resolve,reject)
					}catch(e){
						reject(e)
					}
				})
			,0}


			if(this.state === 'pending'){
				this.onResolvedCallbacks.push(()=>{
					setTimeout(()=>{
						try{
							let x = onFulfilled(this.value)
							reslovePromise(promise2,x,resolve,reject);
						}catch(e){
							reject(e)
						}
					},0)
				})

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)}

		})
		return promise2
	}
}


class A{
	constructor(exec){
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
	console.log(exec)
	}
}

return new Promise((resolve,reject)=>{
	console.log('ssss')
	resolve(3)
}).then((value)=>{
	console.log(value)
})

  promise.all 
  getDomainInfo = async() =>{
    let p1 = new Promise((resolve,reject)=>{
       getClientVlanList({serviceNo:this.state.serviceNo}).then((response,error)=>{
          if(response.success && response.data){
            resolve(response.data)
          }else {
            reject(error)
          }
       })
    })//
    let p2 =  new Promise((resolve,reject)=>{
      getDomainSyncInfo({serviceNo:this.state.serviceNo}).then((response,error)=>{
        if(response.success && response.data){
          resolve(response.data)
        }else {
          reject(error)
        }
      })
   })
   Promise.all([p1,p2]).then(result=>{
     console.log(result)
   }).catch(err=>{
     console.log(err)
   })
  }//查询配置信息




	promise chain  async await 

function loadJson(url){
  return fetch(url).then(response=> response.json());
}
function loadGithubUser(name){
  return fetch(`https://api.github.com/users/${name}`).then(response => response.json())
}
function showAvater(githubUser){
  retrun new Promise(function(resolve,reject){
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    setTimeout(()=>{
      img.remove();
      resolve(githubUser);
    }, 3000)
  })
}

loadJson('/article/promise/user.json')
.then(user => loadGithubUser(user.name))
.then(showAvater)
.then(githubUser => alert(githubUser.name))




.then 替换为await

async function showAvatar(){
  let response =await fetch('/article/promise....')
  let user = await response.json()

  let githubResponse = await fetch('https://api.github.com...')
  let githubUser = await githubResponse.json()

      let img = document.createElement('img')
    img.src = githubUser.avatar_url
    img.className = 'promise-avatar-example'
    documenmt.body.append(img)

    await new Promise((resolve,reject)=> {
      setTimeout(reslove,3000)
    })
    img.remove()
    return githubUser
}





async function f(){
 let promise = new Promise((resolve,reject) => {
  alert('start');
  setTimeout(()=> resolve('dddd'),20000)
})
alert('1111');
let result = await promise;
alert('2222')
alert(result)
alert('333')
}




doSomething().then(function (result){
	return doSomethingElse(result);
}).then(function (newResult) {
	return doThridThing(newResult);
}).then(function(finalNewResult) {
	console.log('finalresult');
}).catch(failureCallback)

//promise chain 
// 还有改进方法

doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThridThing(newResult))
.then(finalresult => {
	console.log(`got the final result: ${finalresult}`);
}).catch(failureCallback)



fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})

回调地狱的理解我之前一直是有偏差的 认为是promise引发的回调地狱，其实不然promise是用来解决回调地狱的，上面代码就是回调地狱，大量的
if else用来判断异常，从而导致出现代码难懂的情况 
promise 当需要执行多个then时 建议用catch进行错误处理，不然每个then写reject回调函数看着确实也乱的很




var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() { 
    resolve('foo');
  }, 300);
});

promise1.then(function(value) { 
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
// 
// 
// 输出结果是  object promise     /n  foo
// 
这里我之前一直有一个误区就是他会自动触发成功还是失败的结果，其实还是需要自己用resolve去触发  但是如果是两个then呢 具体第二个是怎么触发的resolve就是全部给触发了 具体还要在看具体是怎么回事






var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() { 
    resolve('foo');
  }, 300);
});

promise1.then(function(value,resolve) { 
  console.log(value);
  return value;
  // expected output: "foo"
}).then(function(value2) {
	console.log(value2+ '222')
}); 

console.log(promise1);
// expected output: [object Promise]

  这个 输出结果是 [object promise]   foo  foo222