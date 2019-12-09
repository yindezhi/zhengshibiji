const $folders = $('.folders'); //放文件夹的盒子
const $f_empty = $('.f-empty'); //显示隐藏空文件夹
const $checkedAll = $('#checkedAll');
const $check1 = $('.check');
let every = true;
let returnVal = false; 
const $fBox = $('#content');
const $kuang = $fBox.find('#checkbox');
const {left:box_l,top:box_t} = $fBox.offset(); 
const $del = $('#del');
const $rename = $('#rename');
const $remove = $('#remove');

//添加文件夹
$('#add').click(function(){
    let $folder=$(
        `<div class="file-item">
    <img src="img/folder-b.png" alt="" />
    <span class="folder-name"></span>
    <input type="text" value="新建文件夹" class="editor"/>
    <i></i>
</div>`);
    $('.folders').append($folder);
    let $txt=$folder.find('input');
    let   $span=$folder.find('span');
    $span.hide();
    $txt.css('display','block');
    $txt.select();
    $txt.blur(function(){
        let val=$txt.val();
        let bool=list.map(
            item=>item.title).includes(val);
            let newval='';
            let nu=1;
            newval=val;
            while(bool){
                let s=val.replace(/\(\d\)$/,'')+'('+nu++ +')';
                bool=list.map(item=>item.title).includes(s);
                newval=s;
            }
            data[+new Date]={
                "id":+new Date,
                "pid":list[0].pid,
                "title":newval,
                "checked":false
            };
            render(list[0].pid);
    })
   
})
//点击全选\选中渲染页面
function render(num=0){
    every = true;
    $folders.html('');
    let d = tools.getChild(data,num);
    list = d;//每次render的时候都把最新的当前需要显示的数据更新
    //没有length，就是没有子级
    if(!d.length){
        $('#content').hide();
        $f_empty.show();      
        return;
    }       
    $('#content').show();
    $f_empty.hide();
    $.each(d,(i,item)=>{
        //只要有一个数据的布尔  值为false,就不可能全部选中，只要不是全部选中那么checkedAll就不能打钩      
        if(!item.checked){
            every = false;
            $checkedAll.removeClass('checked');
            $check1.attr('src','./img/全选 - 未选中.png')
            
        }
        const {checked,id,title} = item;
            let $folder = $( 
                `
                <div class="file-item ${checked?'active':''}" did="${id}">
            <img src="img/folder-b.png" alt="" />
            <span class="folder-name">${title}</span>
            <input type="text" value="${title}" class="editor"/>
            <i class=${checked?"checked":''}></i>
        </div>`)

        let $img = $folder.find('img');
        let $i = $folder.find('i');

        $i.click(function(){
            data[id].checked = !data[id].checked;
            render(num);
        });
        $img.dblclick(function(){
            let id = $(this).parent().attr('did')*1;
            //只要双击进文件夹，先把当前对应数据的布尔值清掉
            d.forEach(item=>item.checked = false);
            $checkedAll.removeClass('checked'); //清掉全选
            render(id);
            createMenu(id); //为了联动面包屑
        });
        $folder.mousedown(function(){return false;});
       
        $folders.append($folder);
    });   
    //点击全选的
    $checkedAll.off().click(function(){
        if(!list.length)return;
        d.forEach(item=>item.checked = !every);//先同步数据
        render(num);//再通过数据渲染页面
    });
    if(every){
        $checkedAll.addClass('checked');
        $check1.attr('src','./img/全选 - 选中.png')
    }

}
render(0);




//面包屑
const {getParents,bong,getChild,getChilds} = tools;
const $breadnNav = $('.bread-nav');
let lists = null;
function createMenu(id){
    $breadnNav.html('');
    let pary = getParents(id); //找当前id下的所有父级包括自己
    pary.forEach((item,i,all)=>{
        let $navChild = null;
        //如果item是数组的最后一项，那么元素应为span
        if(i === all.length-1){
            $navChild = $('<span>'+ item.title +'</span>')
        }else{
            $navChild = $('<a href="javascript:void(0);">'+ item.title +'</a>')
        }
        
        //点击面包屑，让文件夹和面包屑一起动
        $navChild.click(function(){
            
            // console.log(tools.getChild(data,3));
            //每点击一次面包屑按钮都把全选的数据清除一次
            tools.getChild(data,id).forEach(item=>item.checked = false);
            render(item.id);
            createMenu(item.id);
        });
        $breadnNav.append($navChild);
    });
}
createMenu(0);
//删除
$del.click(function(){
    //去判断至少要有一个文件被选中，如果都没被选中，说明找不到要删除的文件
    // $('#tanbox').show();
    const yes = $('#tanbox').find('#yes');
    const no =$('#tanbox').find('#no')
    const cha = $('#tanbox').find('#cha')
    if(list.some(item=>item.checked)){
        $('#tanbox').show();
    }else{
        alert('请选择文件');
    }
    cha.click(function(){
        $('#tanbox').hide()
    })
    yes.click(function(){
        if(list.some(item=>item.checked)){
            let {pid} = list[0]; //为了删除数据之后，重新渲染页面使用的
            list.forEach(item => {
                if(item.checked){
                   delete data[item.id];
                }
            });
            render(pid);
    
        }
        $('#tanbox').hide()
     })
        
   
    no.click(function(){
        $('#tanbox').hide()
        
    })
  
});

//重命名
$rename.click(function(){
    returnVal = true;
    let reData = list.filter(item=>item.checked); 
    if(list.some(item=>item.checked)){
        if(reData.length === 1){
           let $folder = $folders.find('.active');
           let $span = $folder.find('span');
           let $txt = $folder.find('input');
           $span.hide();
           $txt.css('display','block');
           $txt.select();
           $txt.blur(function(){
               //不能重名    
               /*
                    1.用户修改了吗？没有修改就不动，有就修改
                    2.有没有重名
               */
                let val = $txt.val();
                if($span.text() === val){
                    $span.show();
                    $txt.hide();
                }else{
                    if(!val){
                        alert('请填写内容');
                        $txt.val($span.text());
                        $txt.select();
                        return;
                    }
                    let {id,pid} = reData[0];
                    let siblings = list.filter(item=>item.id != id);
                    if(siblings.some(item=>item.title === val)){
                        console.log('不好意思,你重名了');
                        $txt.select();
                    }else{
                        returnVal = false; 
                        data[id].title = val;
                        data[id].checked = false;
                        render(pid);
                    }
                }
           });
        }else{
            alert('只能选择一个文件');
        }
       
    }else{
        alert('请选择文件');
    }
});
let that = null;
let okcode = -1;
function createModelTree(num){
    //通过num找到对应的子级
    let ary = getChild(data,num);
    if(!ary.length)return;
    //只要有自己就创建一个ul，因为ul中要插入li
    let $ul = $('<ul style="padding-left:5px"></ul>');
    //循环子级数据，生成很多的li
    ary.forEach(item=>{
        let $li = $(`
            <li>
                <div class="tree-title tree-ico">
                    <span><i></i>${item.title}</span>
                </div>
            </li>
        `);

        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }

        $li.off().click(function(){
            let reData = list.filter(item=>item.checked); 
            //点击li的时候，看看点击的文件和要移动的文件是不是有直系关系
            //如果有直系关系，那么就点不开
            if(reData.some(d=>d.id === item.id)){
                okcode = 'error';
                return;
            }else{
                okcode = item.id;
            }

            if(that){
                that.css({background:'none'});
            }
            $(this).find('span').css({
                background:'#ccc'
            });
            that = $(this).find('span');

            if(this.children[0].classList.toggle('open')){
                $(this).append(createModelTree(item.id));
                
            }else{
                $(this).find('ul').remove();
            }
            
           
            return false;
        });
        //再把li放到ul中
        $ul.append($li);
    }); 
    //返回当前创建的ul，里面有很多的li(文件夹)
    return  $ul;
}


//移动

const $model_list = $('#model_list').children();
$remove.off().click(function(){
    let reData = list.filter(item=>item.checked); 
    if(!reData.length){
        console.log('木有移动的文件');
    }else{
        $('.modal-tree').show(); //打开移动的框
        $model_list.find('ul').remove();
        $model_list.append(createModelTree(0)); 
        console.log(createModelTree(0));
        
    }
    const cancel = $('.modal-tree').find('.cancel');
    cancel.off().click(function(){
        $('.modal-tree').hide();
    })
    
    const close = $('.modal-tree').find('#close');
    close.off().click(function(){
        $('.modal-tree').hide();
    })

    const ok = $('.modal-tree').find('.ok');
    ok.off().click(function(){
        if(okcode === 'error'){
            console.log('非法操作');
            return;
        }
        let id = reData[0].pid; //存一下改之前的pid，为了一会刷新页面
        reData.forEach(item=>{
            item.pid = okcode;
            item.checked = false;
        });
        $tree_menu.children().append( createTree(0,true) );
        
        render(id);
        
        $('.modal-tree').hide();
    });

})


let $tree_menu = $('.tree-menu');
function createTree(num,onoff){
    if(onoff){
        $tree_menu.children().find('ul').remove();
    }  
    //通过num找到对应的子级
    let ary = getChild(data,num);
    // console.log(ary.length);
    if(!ary.length)return;
    //只要有自己就创建一个ul，因为ul中要插入li
    let $ul = $('<ul></ul>');
    //循环子级数据，生成很多的li
    ary.forEach(item=>{
        let $li = $(`
            <li>
                <div class="tree-title tree-ico">
                    <span>${item.title}</span>
                </div>
            </li>
        `);

        $li.off().click(function(){
                    
            if(this.children[0].classList.toggle('open')){
                $(this).append(createTree(item.id));
              
                render(item.id);
                createMenu(item.id);

            }else{
                $(this).find('ul').remove();
            }
           
            return false;
        });
        //再把li放到ul中
        $ul.append($li);
    }); 
    //返回当前创建的ul，里面有很多的li(文件夹)
    return  $ul;
}

$tree_menu.children().append( createTree(0) );

//选框
$fBox.on('mousedown',function(ev){
    let disX = ev.pageX,disY = ev.pageY,
    $folder = $folders.find('.file-item');
    if($(ev.target).closest('.file-item').length) return;
    $kuang.show().css({
        left:disX - box_l,
        top:disY - box_t,
        border: '1px dashed #000'
    });

    $fBox.on('mousemove',function(ev){
        $kuang.css({
            //移动的减去按下的
            width:Math.abs(ev.pageX - disX),
            height:Math.abs(ev.pageY - disY),
            //鼠标移动的距离（基于可视区的） - fBox的距离
            left:Math.min(ev.pageX-box_l,disX-box_l),
            top:Math.min(ev.pageY-box_t,disY-box_t),
            
        });

        //move的时候看看，当前的框是否碰到了某几个元素
        $folder.each((i,ele)=>{
            if(bong($kuang[0],ele)){
                list.forEach((item)=>{
                    //数据的id和碰到的did去对比，如果相等就把item的值设置为true
                    if(item.id === $(ele).attr('did')*1){
                        item.checked = true;
                        $(ele).find('i').addClass('checked');
                        $(ele).addClass('active');
                    }
                });
            }else{
                list.forEach((item)=>{
                    if(item.id === $(ele).attr('did')*1){
                        item.checked = false;
                        $(ele).find('i').removeClass('checked');
                        $(ele).removeClass('active');
                    }
                });
            }
            //如果全选就勾上全选中，否则取消全选中。
            if(list.every(item=>item.checked)){
                $checkedAll.addClass('checked');
                $check1.attr('src','./img/全选 - 选中.png')
                every = true;
            }else{
                $checkedAll.removeClass('checked');
                every = false;
            }
         
        });

    });
    $(document).on('mouseup',function(ev){
        $fBox.off('mousemove');
        $(document).off('mouseup');
        $kuang.css({
            width:0,
            height:0,
            display:'none',
            border:'none',
            top:0,
            left:0
        });

        //returnVal 只要是returnVal为true（不需要阻止默认行为的时候，你就没必要画框）

        if(ev.pageX === disX && ev.pageY === disY && !returnVal){
            list.forEach(item => item.checked = false);
            $folder.each((i,ele)=>{
                $(ele).find('i').removeClass('checked');
                $(ele).removeClass('active');
                $check1.attr('src','./img/全选 - 未选中.png')
              
            });
            every = false;
            $checkedAll.removeClass('checked');
        }
    });
});
