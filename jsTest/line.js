var startX;         // 点击组件时鼠标的坐标
var startY;
var endX;
var endY;
var startLeft;      // 拖动前组件中心的坐标
var startTop;
var aside = document.getElementById('aside');
var main = document.getElementById('main');
var startDraw = false;
var lineStartX  = 0;
var lineStartY = 0;


/* 事件函数 */
function dragStart(e) {                                    
    e = e || window.event;
    startX = e.clientX;                                      
    startY = e.clientY;
    console.log('startX:'+startX + 'startY:' +startY);
    this.style.zIndex = 1;
    e.dataTransfer.setData("Text",e.target.id);
}

function draging(e) {                                                 
    /*if (this.className.indexOf('dragging') < 0) {
        this.className = 'component dragging';
    }*/
}

function dragOver(e) {                                       
    e = e || window.event;
    e.preventDefault();
}

function drop(e) {                                           
    e = e || window.event;
    e.preventDefault();    
    var data=e.dataTransfer.getData("Text");

    var dropComponent = document.getElementById(data);
    var mainLeft = main.offsetLeft;
    var mainTop = main.offsetTop;
    var mainWidth = main.offsetWidth;
                                          
    endX = e.clientX -mainLeft -30;
    endY = e.clientY - mainTop;
    console.log(mainTop + 'marinTop')
    dropComponent.className = 'dropComponent ' + data;
    console.log(endX+'--endX--endY:'+endY);
    
    console.log(mainLeft+"--mainLeft")
    // if(endX >mainLeft && endX < mainLeft + mainWidth ){
        main.appendChild(dropComponent);
        dropComponent.draggable = false;
        dropComponent.style.left = endX + 'px';
        dropComponent.style.top = endY + 'px';                                     
        console.log(dropComponent.style.left+ "  cleft");
 }   

function line(x,y,len,deg) {    
    var node = document.createElement("div");    
    node.className = "line";    
    node.style.top=y +'px';    
    node.style.left=x + 'px';
    node.style.width =len + 'px';
    node.style.transform = "rotate("+ deg+ "deg)";
    node.style.WebkitTransform  = "rotate("+ deg+ "deg)";    
    node.style.MozTransform  = "rotate("+ deg+ "deg)";
    node.style.MsTransform  = "rotate("+ deg+ "deg)";
    main.appendChild(node);    
    return node;
}  

function prompt(x,y,obj) {
    var prompt = document.getElementById('prompt');
    var changeColor = document.getElementById('changeColor')
    var deleteSelf = document.getElementById('deleteSelf')
    var cancel = document.getElementById('cancel')
    console.log(prompt+'--prompt');
    prompt.style.visibility = 'visible';
    prompt.style.left = x + 'px';
    prompt.style.top = y + 'px';
    main.appendChild(prompt);
    deleteSelf.addEventListener('click',function(e) {
        deleteFn(obj);
    },false)
    changeColor.onclick =changeColorFn.bind(obj);
    cancel.onclick =cancelFn.bind(obj);
     console.log(deleteSelf);
}

function changeColorFn(obj) {
    event.preventDefault()
    this.style.backgroundColor = '#90a'
    var prompt = document.getElementById('prompt');
    prompt.style.visibility = 'hidden';
}

function deleteFn(obj) {
    var prompt = document.getElementById('prompt');
    prompt.style.visibility = 'hidden';
    main.removeChild(obj);
}

function cancelFn() {
    var prompt = document.getElementById('prompt');
    prompt.style.visibility = 'hidden';
}

function mouseDown(e) {
    mousedownX = e.clientX - 495;
    mousedownY = e.clientY- 47;
}
function mouseUp(e) {
    e = e || window.event;
    console.log(e.button);
    if(e.button ==0){
    mouseupX = e.clientX- 495;
    mouseupY = e.clientY- 47;
    //y = ax + b
    var diff_x = mouseupX - mousedownX;
    var diff_y = mouseupY - mousedownY;
    var len = Math.sqrt(diff_x * diff_x + diff_y* diff_y);
    if(len < 10){
       return;
    }
    var deg = 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
    console.log('deg--'+deg);

    var OLine = line(mousedownX,mousedownY, len,deg);  
    OLine.onclick =function (e) {
        e =e ||window.event;
        e.preventDefault();
        prompt(100,100,this);
        }
    }   
}

window.onload = function () {
    var components = document.getElementsByClassName('component');
    for (var i = 0, len = components.length; i < len; i++) {
        components[i].draggable = true;
        components[i].addEventListener('dragstart',dragStart,false);
        components[i].addEventListener('drag',draging,false);
        components[i].onclick =function (e) {
            e =e ||window.event;
            e.preventDefault();
            prompt(100,100,this);

        }
    }

    main.addEventListener('dragover',dragOver,false);
    main.addEventListener('drop',drop,false);                              
    main.addEventListener('mousedown',mouseDown,false);
    main.addEventListener('mouseup',mouseUp,false);
    line(0,0,100,0);   
 
 var mousedownX =0,
    mousedownY = 0,
    mouseupX = 0,
    mouseupY = 0;

}

