var startX;         // 点击滑块时鼠标的坐标
var startY;
var startLeft;      // 拖动前滑块中心的坐标
var startTop;
var wrap = document.getElementsByClassName('drag_wrap');
/* 工具函数 */
function nextDrag(element) {                     // 获取下一个滑块
	var nextEle=element.nextSibling;
	while(nextEle && nextEle.nodeName==="#text"){
		nextEle=nextDrag(nextEle);
	}
	return nextEle;
	
}
function moveDrag(element, move) {               // 将某滑块及其下面的滑块移动move个像素
	 while (element) {
        element.style.top = parseInt(element.style.top) + move + 'px';
        element = nextDrag(element);
    }

}
function getLocation(event) {                    // 计算滑块降落的位置
    var location = [];                           // location的第一个元素代表容器的序号，第二个元素代表滑块在容器中的序号
    var moveX = event.clientX - startX;          // 计算滑块中心的位置
    var moveY = event.clientY - startY;
    var y = startTop + moveY;
    var x = startLeft + moveX;

    if (x < 230) {                               // 容器的序号
        location[0] = 0;
    }
    else if (x >= 230 && x <= 540) {
        location[0] = 1;
    }
    else {
        location[0] = 2;
    }

    location[1] = Math.floor((y + 20) / 40);      // 滑块在容器中的序号
    var dragNum = wrap[location[0]].getElementsByClassName('drag').length;  // 容器中滑块的数量
    location[1] = Math.max(location[1], 0);       //滑块拖动超出容器上边界
    location[1] = Math.min(location[1], dragNum); //滑块拖动超出容器下边界

    return location;
}
/* 事件函数 */
function dragStart(e) {                                      // 开始拖动，整理原容器的其他滑块及记录一些数据
    var wrapLeft = $('.drag_container').offsetLeft;          // 计算滑块中心相对drag_container的位置之用
    e = e || window.event;
    var parent = this.parentNode;
    startX = e.clientX;                                      // 记录鼠标位置
    startY = e.clientY;
    startTop = parseInt(this.style.top) + 20;                // 滑块中心相对容器的位置
    startLeft = parent.offsetLeft - wrapLeft + 75;
    this.style.zIndex = 1;
    moveDrag(nextDrag(this), -41);                           // 下面的滑块上移41个像素
        console.log(wrapLeft);
        console.log(parent.offsetLeft)

}

function draging(e) {                                        // 拖动中，使滑块在原容器中消失
    if (this.className !== 'dragging') {
        this.className = 'dragging';
    }
}

function dragOver(e) {                                       // 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
    e.preventDefault();
}

function drop(e) {                                           // 拖动结束，将滑块加到新容器
    e = e || window.event;
    e.preventDefault();                                          // 避免浏览器对容器的默认处理（默认以链接形式打开）
    var location = getLocation(e);  //获取滑块降落的容器和降落后滑块序号                             // 滑块降落的位置
    var myWrap = wrap[location[0]];
    var myDrag = myWrap.getElementsByClassName('drag')[location[1]]; //只能获取降落前的滑块
    if (myDrag) {
        var myTop = myDrag.style.top;
    }
    else {                                                       // 兼容降落位置后面没有滑块的情况
        var beforeDrag = myWrap.getElementsByClassName('drag')[location[1] - 1];
        if (beforeDrag) {
            var beforeTop = parseInt(beforeDrag.style.top);
        }
        else {                                                   // 兼容容器中没有其他滑块的情况
            beforeTop = -41;
        }
        var myTop = beforeTop + 41 + 'px';
    }
    console.log("mytop:"+myTop);
    moveDrag(myDrag, 41); //降落位置后面的滑块都向下移动

    var block = document.getElementsByClassName('dragging')[0];  // 将被拖拽滑块加到新容器
    block.style.top = myTop;
    block.style.zIndex = 0;
    block.className = 'drag';
    myWrap.insertBefore(block, myDrag);
}

window.onload = function () {
    var drag = document.getElementsByClassName('drag');
    for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 6 * 41) + 'px';

        $.on(drag[i], 'dragstart', dragStart);                       // 开始拖动，整理原容器的其他滑块及记录一些数据
        $.on(drag[i], 'drag', draging);                              // 拖动中，使滑块在原容器中消失
    }

    $.on(document.body, 'dragover', dragOver);                       // 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
    $.on(document.body, 'drop', drop);                               // 拖动结束，将滑块加到新容器
}