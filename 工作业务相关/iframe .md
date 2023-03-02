###记录iframe的踩坑

背景：需求主要是在当前父系统页面中打开他的下属子子系统同样的页面并直接在父页面中控制子系统， 会涉及到跨域问题。 自然就会想到用iframe+ postmessage 来解决问题了 项目用的是vue全家桶。


 > 父: \<iframe class="othermeetingcontrol" style=";z-index:3001" v-if="iframeshow" :src="iframesrc" width="100%" height="100%"  ref="myiframe">\</iframe>  
 
 setTimeout(()=>{
     this.iframesrc = `${data['iframeurl']}/middlepage?confNum=${data['confnum']}&principle=${data.subAccount.principle}&credential=${data.subAccount.credential}`
 },400)

> 子：  
            this.confNum = parseInt(this.\$route.query.confNum)
            this.principle = this.\$route.query.principle
            this.credential = this.\$route.query.credential
window.addEventListener('message',(e)=>{
          alert(e.data)
      if(e.data){
          sessionStorage.setItem('yms',e.data.data);               
          this.$router.push({
              path: '/advance',
              query: {entity: e.data.entity, confNum: e.data.confNum}
          })
      }
      }, false)



注意：
1. 需要等iframe彻底加载完成后他才能接收到父页面传过来的信息，这边的做法是直接设置一个settimeout 在一定的时间之后 父页面才发送消息。发送消息的方式基本就是两种 一种是url方式(this.route可以直接读取url拿数据) 一种就是postemssage   最好给iframe添加一个‘过渡’的页面，让这个过渡完成相关的操作(加载,权限认证，保存localstorage等)完成后再进行页面的跳转
2. 避免iframe 套iframe的套娃现象 可以使用相关的代码 如果当前的window不是顶层的 那就可以说明这个是iframe了  
 `window.frames.length != parent.frames.length`
3. 注意跨域问题，  `domexctption blocked a frame with origin 'http:...',from accessing a corss-origin frame`或者是 ` options 'header' encountered when loading 'http:...' allow-from:'http:..' is not a recognized directive  the header will be ignoed`,浏览器有iframe的安全性考量，如果出现类似的报错 基本就是跨域， 或者要打开的子页面设置了只允许特定访问的ip了。 基本就是在nginx 或者后端 去设置或者取消相关的header就可以了。有三种设置结果。具体的设置方法直接百度就好.
4. 子页面 不要直接打印 事件，这样是打印不出来的，具体原因不太清楚 。 最好还是用console alert  在浏览器中 其实是可以选择域名并过滤出来的  



2023/03/02
账单系统 的数据可视化分析 换一个方向 尝试集成grafana中的数据分析 或者kibana 中的数据分析 基于他们做二次开发 研究下市面finops 或者其他涉及到 数据分析 bi的开源是如何做的比如 腾讯的crane 是如何做的集成granfana 图表 
