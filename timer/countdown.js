var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

/*var endTime= new Date();
endTime.setTime(endTime.getTime() + 3600*1000);*/
var curShowTimeSeconds =0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){

    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds=getCurShowTimeSeconds();
    setInterval(function(){
        render( context );
        update();
    },50);
}

function getCurShowTimeSeconds(){
    var curTime=new Date();
  /*  var span=endTime.getTime() - curTime.getTime();
    span=Math.round(span/1000);
    return span >=0 ? span : 0;*/

    var  span=curTime.getHours()*3600 + curTime.getMinutes() *60 + curTime.getSeconds();
    return span;
}

function  update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHours = Math.floor(nextShowTimeSeconds / 3600);
    var nextMinutes= Math.floor((nextShowTimeSeconds - nextHours* 3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var hours = Math.floor(curShowTimeSeconds / 3600);
    var minutes= Math.floor((curShowTimeSeconds - hours* 3600)/60);
    var seconds = curShowTimeSeconds % 60;

    if (nextSeconds != seconds){

        if(parseInt(hours/10) != parseInt(nextHours/10)){
            addballs(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10))
        }
        if(parseInt(hours% 10) != parseInt(nextHours% 10)){
            addballs(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours/10))
        }
        if(parseInt(minutes/10) != parseInt(nextMinutes/10)){
            addballs(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10))
        }
        if(parseInt(minutes% 10) != parseInt(nextMinutes% 10)){
            addballs(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10))
        }
        if(parseInt(seconds/10) != parseInt(nextSeconds/10)){
            addballs(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10))
        }
        if(parseInt(seconds% 10) != parseInt(nextSeconds% 10)){
            addballs(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10))
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
    console.log(balls.length);
}

function updateBalls(){
    for( var i = 0; i < balls.length; i ++){
        balls[i].x +=balls[i].vx;
        balls[i].y +=balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }	

        var cnt = 0
        for( var i = 0 ; i < balls.length ; i ++ )
            if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
                balls[cnt++] = balls[i]

        while( balls.length > Math.min(300,cnt) ){
            balls.pop();
        }
   
}


function  addballs(x,y,num){
    for(var i = 0; i<digit[num].length; i ++){
        for(var j= 0 ; j <digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                var  aball={
                    x:x+ j * 2 * (RADIUS+1) + (RADIUS+1),
                    y:y+ i * 2 * (RADIUS+1) + (RADIUS+1),
                    g:1.5 + Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random() * 1000)) * 4,
                    vy : -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aball);
            }
        }
    }
}

function render( cxt ){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours =parseInt(curShowTimeSeconds / 3600);
    var minutes= parseInt((curShowTimeSeconds - hours* 3600)/60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for (var i = 0;i < balls.length ; i ++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }
}

/**
 * 绘制每一个数字
 * @param x 数字左上角坐标x
 * @param y 数字左上角坐标x
 * @param num 需要绘制的数字，10对应冒号
 * @param cxt
 */
function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

