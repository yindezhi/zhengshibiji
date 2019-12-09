let ary = [{
        title: '新建文件夹',
        id: 0
    }, 
];

function bong(obj,obj2){
    let {left:l,top:t,bottom:b,right:r} = obj.getBoundingClientRect();
    let {left:l2,top:t2,bottom:b2,right:r2} = obj2.getBoundingClientRect();
    if(r < l2 || b < t2 || l > r2 || t > b2){
        console.log('没碰到');
        return false;
    }else{
        console.log('碰到');
        return true;
    }
}

function render(arr) {
    $('#content').html('');
    $.each(arr, (i, item) => {
        let $folder = $(`
        <div id="checkbox"></div>
            <div id="Bbox" class="folder">
            <img src="./img/folder-b.png">
            <input type="text"/>
            <p>${item.title}</p>
        </div>
        `)
        $folder.find('input').hide();
        $('#content').append($folder)
    })
}
render(ary);

$('#add').click(function () {
    console.log(1);
    let $folder = $(`
    <div class="folder">
    <img src="./img/folder-b.png">
    <input type="text" placeholder="请设置文件名"  value="新建文件夹"/>
    </div>
    `);
$('#content').append($folder);
let $txt = $folder.find('input');
$txt.select(); 
$txt.blur(function(){
    let val = $txt.val();
    let bool = ary.map(item=>item.title).includes(val);
    let nval = '';
    let num = 1; 
    nval = val;
    while(bool){
        let s = val.replace(/\(\d\)$/,'') + '('+ num++ +')';
        bool = ary.map(item=>item.title).includes(s);
        nval = s;
    }
    ary.push({
        id:+new Date,
        title:nval
    });
    render(ary);
    console.log(ary); 
});
})

let aa = document.querySelectorAll('.folder')
class  Drag {
    constructor(id) {
        this.disX = this.disY = 0;
        this.box = document.getElementById(id);
    }
    init(){
        content.addEventListener('mousedown',this.d = this.down.bind(this));
    }
    down(ev){
        let {left,top} = this.box.getBoundingClientRect();
        this.disX = ev.pageX-200;
        this.disY = ev.pageY-160;
        this.box.style.display = 'block';
        //按下的时候让box等于鼠标按下的位置
        this.box.style.top = this.disY  + 'px';
        this.box.style.left = this.disX + 'px';
        content.addEventListener('mousemove',this.mv = this.move.bind(this));
        document.addEventListener('mouseup',this.u = this.up.bind(this));
        ev.preventDefault();
    }
    move(ev){
        this.box.style.top = Math.min(ev.pageY-160,this.disY) + 'px';
        this.box.style.left = Math.min(ev.pageX-200,this.disX) + 'px';       
        aa.forEach(ele=>{
            if(bong(checkbox,ele)){
                ele.style.background = 'pink';
            }else{
                ele.style.background = '#fff';
            } 
        })
        //移动的距离 - 按下的距离 = 移动了多少距离
        this.box.style.width = Math.abs(ev.pageX - this.disX -200) + 'px';
        this.box.style.height = Math.abs(ev.pageY - this.disY-160) + 'px';

    }
    up(){
        this.box.style.height = this.box.style.width = 0;
        this.box.style.display = 'none';
        content.removeEventListener('mousemove',this.mv);
        document.removeEventListener('mouseup',this.u);
    }
}
let d = new Drag('checkbox');
d.init();
