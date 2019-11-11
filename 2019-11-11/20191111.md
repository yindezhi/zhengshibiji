查typeof、deepClone 、case

#  融会贯通精讲

-  函数 -> 局部作用域

      let，var，参数，函数  正常情况下都不会跑到外面

      在函数内如果没有变量声明、函数、参数，当前的变量是属于window的

      var a = b = 5；// b是window的
      var a = 5,b = 5;//a和b都是局部作用域的

      函数+括号  函数中的this就是window

    预解析（变量提升） -> 代码从上往下执行

-   1.参数为原始数据类型（在函数内运算不会影响外面的）
    2.参数为引用数据类型（在函数内改变属性值是会影响外面的）
    3.参数为引用数据类型，参数又赋值另一个引用类型（在赋值新地址之后是不会外面的引用类型的）

    如果实参是个引用类型，那么在函数内执行修改这个参数的属性是会互相影响的

#  重写call

-  call：
      只要是个函数既有call方法
        改变ths的指向的
        参数：
           多个参数
           第一个参数是修改的this
           第二个之后实参
        注意：
           null，undefined的数据window

        如何改变this？

        this属于谁 -> 事件触发谁this就是谁？.前面的？
          
          document.onclick = function(){}
            把一个函数地址赋值给document.onclick

            obj.click = function(){
                console.log(this);
            }

            obj.fn() -> this是obj

            this就是.前面的主。

            document.xx = function(){
                console.log(this);
            }

            核心:
                也就是说，只要让一个函数地址，等于某个对象下的方法，
                this自然就变成了那个对象.

      如果有多个call，最后一个call的第一个参数为雕用的那个函数，第二个参数就是this指向，之后才是实参