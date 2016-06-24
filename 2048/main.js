var board = [];
var score = 0;
var hasConflict= [];
var startx= 0,
    starty= 0,
    endx = 0,
    endy= 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    if(documentWidth > 500){
        gridContainerWidth = 500;
        gridLength = 100;
        gridSpace = 20;
    }

    $('#grid-container').css({
        'width':gridContainerWidth - 2*gridSpace,
        'height':gridContainerWidth-2*gridSpace,
        'padding':gridSpace,
        'border-radius':0.02*gridContainerWidth
    });
    $('.grid-cell').css({
        'width':gridLength,
        'height':gridLength,
        'border-radius':0.02*gridLength
    });
}

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = [];
        hasConflict[i]= [];
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflict[i][j]=false;
        }
    }
    score=0;
    updateBoardView();
}

function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-'+i+'-'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + gridLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + gridLength/2 );
            }
            else{
                theNumberCell.css('width',gridLength);
                theNumberCell.css('height',gridLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }
            hasConflict[i][j] = false;
        }
    $(".number-cell").css('line-height',gridLength + 'px');
    $(".number-cell").css('font-size',0.6 * gridLength + 'px');
}

function generateOneNumber(){

    if( noSpace( board ) )
        return false;

    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    //产生随机位置的次数
    var times=0; 
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;
        // 随机位置面板数字为0，重新产生
        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
        times ++;
    }
    //超过50次后遍历面板数字，指定随机位置
    if (times == 50){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if (board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberAnimation( randx , randy , randNumber );

    return true;
}

$(document).keydown( function( event ){

    switch( event.keyCode ){
        case 37: //left
            //阻止按键后页面滚动
            event.preventDefault();
            event.returnValue=false;
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            //阻止按键后页面滚动
            event.preventDefault();
            event.returnValue=false;
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            //阻止按键后页面滚动
            event.preventDefault();
            event.returnValue=false;
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            //阻止按键后页面滚动
            event.preventDefault();
            event.returnValue=false;
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

document.addEventListener('touchstart',function(event){
    startx= event.touches[0].pageX;
    starty= event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx= event.changedTouches[0].pageX;
    endy= event.changedTouches[0].pageY;

    var deltax=endx - startx;
    var deltay= endy - starty;
    if(Math.abs(deltax) < 0.3* documentWidth && (Math.abs(deltaY) < 0.3* documentWidth)){
        return;
    }

document.addEventListener('touchmove',function(event){
    event.preventDefault();//解除android4.0 bug
});

    //x
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            //move right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            //move left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
            //y
    }else{
        if (deltay > 0){
            //move down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            //move up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});



function isgameover(){
    if(noSpace(board) && noMove(board))
    gameover();
}

function gameover(){
    alert("game over!");
}

function moveLeft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) && ! hasConflict[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) && ! hasConflict[i][k]){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) && !hasConflict[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //add score
                        score+=board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) &&  !hasConflict[k][j]){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //add score
                        score+= board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}