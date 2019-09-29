####mixins基本用法
>混入 一种分发vue组件中可复用功能的非常灵活的方式，混入对象可以包含任意组件选项，当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

从cloud目前的代码来看其实就是把一些公共方法合并到一个方法里面，当后面的组件使用的过程中可以直接使用，就不用再多次声明了，这个mixins感觉也可以做一些初始化的事情，貌似看起来不错省事，不过还是有限制啊，如果两个初始化完全一样的东西还行 如果不完全一样还是不爽，不知道当初react为什么要放弃mixins 转投 hoc.

#####基本用法 (后续的自己创建的vue-cli初始化的项目下验证结果)
1. 
 ```
    export const mymixins = {
        data() {
            return {
                num:1
            }
        },
        creted(){
            this.hello()
        },
        methods:{
            hello(){
                conosle.log('ddddd')
            }
        }
    }
    //新的组件引入mixins
    <template>
    <div class='template1'>
         组件1   
    </div>
    </template>
    <script>
    import {mymixins} from '@/assets'

    export deafult{
        mixins:[mymixins],
    }
    </script> 
    
 ```
特点一： 方法和参数在各个组件不共享
 ```
   export const mymixin = {
       data(){
           return {
               num:1
           }
       },
       created(){
           this.hello();
       },
       methods:{
           hello(){
               console.log('aaa')
           }
       }
   }

   <template>
   <div class = 'templage1'>
    {{num}}
   </div> 
   </template>
    <script>
    import {mymixin} from 'ddd'
    export deafult {
        mixins:[mymixin],
        created(){
            this.num++;
        }//mixins 和created是同级的
    }
    </script>


   <template>
   <div class = 'templage2'>
    {{num}}
   </div> 
   </template>
    <script>
    import {mymixin} from 'ddd'
    export deafult {
        mixins:[mymixin],
        //mixins 和created是同级的
    }
    </script>
    //结果自然是2 和 1 ,注意两个组件使用这个mixins的时候互不影响，这个和vuex还是有区别的
 ```
    特点二: 值为对象的选项，如methods components 会被合并，如果属性名冲突的话会覆盖混入对象的mixins
```
export const mymixins = {
    data(){
        return {
            num:1
        }
    },
    created(){
        this.hello()
    },
    methods:{
        func_one(){
            console.log('func_one mixins')
        },
        func_two(){
            console.log('func_two mixins')
        }
    }
}
   <template>
   <div class = 'templage2'>
    {{num}}
   </div> 
   </template>
    <script>
    import {mymixin} from 'ddd'
    export deafult {
        mixins:[mymixin],
        //mixins 和created是同级的
        created(){
            this.func_self();
            this.func_one();
            this.func_two();
        },
        methods:{
            func_self(){
                console.log('func_self templage')
            }
            func_two(){
                console.log('func_two template')
            }

        }
    }
    </script>
    //func_self template1   func_one from mixin  func_two template
```
2. 与vuex的区别
  vuex:用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值后，其他组件中变量也会随之修改
  mixins： 可以定义共有变量，在每一个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响

  与公共组件的区别
  组件： 在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，本质上两者是独立的。
  mixins： 在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件
感谢以下链接的分享：
https://www.jianshu.com/p/bcff647d24ec