### 第四天
-   全局栈一般是浏览器关闭猜会被销毁
    局部栈一般是函数调用完之后才被销毁

    堆：引用类型
    let obj = {}
    obj = null
    给obj赋值了一个空指针，谷歌浏览器会在空闲的时候去查看谁用着obj，null指针说明没有使用，所以obj被销毁


###   this（小难点）

-   掌握this到底是谁
-   在事件函数中，事件触发是谁，this就是谁

```
document.onclick =function(){
    console.log(this);//docment
}
```
-   函数直接调用默认this为window

```
function(){
    console.log();//window
}
fn()0

```
-   方法（函数前面有主的都叫方法），this就是.前面的主(箭头函数例外)
```
    let obj = {
        fn:function (){
            console.log(this)；
        }
    }
    obj.fn();//obj
```
-   箭头函数，他的this为函数定义时的上下文作用域

```
docunent.onclick = function(){
    let fn = ()=>{
        console.log(this);
    }
    fn();
}

```


###   工厂模式
       函数->复用

      工厂模式（有初始化、加工、出厂）
         目的就是为了批量生产对象

          function person(name,age,job,sex){
        let obj = new Object();//初始化（原材料）

        //加工
        obj.name = name;
        obj.age = age;
        obj.job = job;
        obj.sex = sex;

        //出厂
        return obj；
    }
    let obj;
    let obj = {
        name,
        age,
        job,
        sex
    }

     //obj和obj2就是实例
    let obj = person（'赵岩',15,'前端开发工程师'，'？'）；//批量生产
    let obj2 = person（'你真胖'，15，'前端开发工程师'，'？'）；

    let obj2 = {
        name:'赵岩',
        age:15,
        job:'前端开发工程师'，
        sex：'?'
    }
    let obj3 = {
        name:'你真胖'，
        age：15,
        job:'前端开发工程师'，
        sex：'?'
    }

##    面向对象（Object Oriented,OO）:

>      是一种对现实世界理解和抽象的方法，是计算机编程技术发展到一定阶段后的产物

      现实理解（东西是一样的，但是角度不同，所以描述的过程不同），抽象方法


      抽象：抽出像的部分（归类）
      归类：（归纳多种相同的特征）

      面向对象是一种编程思想，就是把相同部分的代码**抽离**出来**归为一类**，把描述这个类的共有特征（方法或者属性）挂在类的原型下的一种编程思想（方式、模式）

      new Array
      new Date
      new String

      潜规则类的首字母大写

      person这个函数类（构造函数）

      function Person(name,age,sex,job){ //抽象
           //let obj = {}
           this.name = name;
           this.age = age;
           this.sex = sex;
           this.job = job;
           this.say = function(){
               alert('我的名字叫'+this.name);//001
           }
           //return obj;
      }
    let obj = new Person('邓志刚',18,'男','资深前端');
    let obj2 = new Person('你真胖',18,'男','资深前端');

    let ary = [];//new Array
    let ary = [];

    //ary.push(1);
    //ary2.push(2);

    //console.log(ary == ary2);

    console.log(ary.push === ary2.push);

    //obj.say();
    //obj2.say();

    //console.log(obj == obj2);
    //console.log(obj.say == obj2.say);



###   new


       一元运算符，专门运算函数的，能让函数不加括号的情况下执行，加括号是为了传参

       1.构造函数中的this就是这个构造函数的实例化对象，默认的this也是实例化对象
       2.return返回值如果是简单类型，那么返回的结果为实例化对象，如果
       返回值为引用类型，那么返回的结果就是这个引用类型

        function Fn(t){  //Fn{}   {key:val}
        // alert(t);
        // console.log(this);
        return null
        }

        let f =  new Fn('珠峰培训');

        console.log(f);
        // console.log(Fn)




###   原型
-     当一个函数创建出来的时候，自身会带有一定的属性和方法
      其中有一个叫Prototype，值为对象，它就是原型。

      作用：
         函数的原型下的属性或者方法，只能给构造函数的实例化对象使用

      原型链：
         _proto_只要是实例都都_proto_，而这个原型链是全等于构造函数的原型
         obj.__proto__=== Fn.prototype

         function Fn(){

         }
         Object.prototype.say = 20;

         //Fn.prototype.say = funstion(){
             console.log(1);
         }

         let obj = new Fn;//f是Fn的实例
         let obj2 = new Fn;

         //obj.say = 10;

         //console.log(obj.__proto__===Fn.prototype);
         //console.log(obj.__proto__.ary === Fn.prototype.say);
         //console.log(Fn.prototype.__proto__=== Object.prototype);
         //console.log(Object.prototype.__proto__);
         //数据查找到了Object的原型就没有然后了，因为Object.prototype.__proto__ = null
         // console.dir(obj);
         console.log(obj.say);
         //obj.say();
         //obj2.say();

         //console.log(obj.say == obj2.say);

         //console.log(f.say);//Fn{}

         //fn.prototype.say()

         //console.dir(fn.prototype);



###   单例模式

-   就是单独的实例（实例、 具体的事务）

     由多个简单类型和引用类型组合在一起的事务
     let obj = {
         name：'123';
         sex:'?'
     }

    高级单例模式：匿名函数自执行 + return  对象 (让单例模式功能更加强大，可以隐藏内部代码，形成模块化编程)

    ```
    let o = ({
        function haha(){

        }
        function hehe(){

        }
        let obj = {
            name:'董尚',
            age:12,
            sex:'男'，
            shuai:true,
            hehe:hehe
        }
        return obj；
    })()

    o.hehe()//调用
    ```

