#### react多个折叠框以及 table中，对于一个列数据为对象数组，同时支持折叠的问题

开发中遇到一个这样的需求 "table中有一个列‘所属用户组’，他的数据格式是一个对象数组，现在需要展示用户组的信息，这个展示是有要求的，每行只准展示两个数据， 当用户组的数量为6时，则分三行展示，当用户组数量超过6个时候，那么第六个是省略号，点击省略号可以将所有的数据全部展示出来，支持伸缩"

开发过程中还是有一些波折的，一开始考虑的是在父组件设置一个state属性同时给按钮、需要隐藏的标签添加一些样式来做判断。后面发现这样做是有问题的，如果只是针对一个下拉框还是没问题的 如果存在多个下拉框那么其中一个伸缩了那么其他的同样会受到影响。

然后有考虑通过使用原生的js方法 获取节点，利用点击事件产生的event 获取其祖父元素 e.parentNode.parentNode.style.display   去修改。然而实际的效果并不好，而且这种办法去处理 总是偶尔会爆出来很奇怪的错误，抑或是样式出现问题。 所以这个方法也pass。

**第一种方法里面的问题主要是父组件的state把全部的子组件都给影响了，所以改动一下让各个组件使用自己的state 彼此间独立 这样就可以解决问题。事实证明这是想法是非常好的。所以抽出来一个小react组件. TabelCollapseData
核心代码如下(基于antd下的table组件进行的扩展):**
> 父组件 :
...... {
    title:'所属用户组',
    dataIndex:'groupIds',
    onCell:()=>{
      style:{
        maxWidth:130
      }
    }
    render:(text)=>{
      return <TableCollapseData tabledata={text}>
    }
}

> 子组件:
  render() {
    let res= []
    let {tabledata} = this.props
    const textlength = tabledata.length
    if(textlength >6){
      for(let i=0; i < textlength;i++){
        if(textlength >6 && i>=5){
          res.push(<Link className={this.state.datavisible? 'usergroupdisplay':'usergrouphidden'} to ={``} key={i}>{tabledata[i].groupname}></\Link>)
          
        }else {
          res.push(<Link className='usergroupdisplay' to={``} key={i} >{tabledata[i].grouptempName}</Link>)
        }
      }
      res.push(<a className={this.state.datavisible? 'usergrouphidden':'usergroupdisplay'} onclick={}> key={textlength}<Icon type='plus-circle' /></a>)
       res.push(<a className={this.state.datavisible? 'usergroupdisplay':'usergrouphidden'} onclick={}> key={textlength}<Icon type='plus-circle' /></a>)
    }else{
      for(let i=0; i<textlength ; i++>){
        res.push(<Link className={'usergroupdisplay'} to={} key={i} >{} </Link>)
      }
    }
  }
  