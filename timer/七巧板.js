/**
 * Created by Administrator on 2016/04/04.
 */

var tangram=[//数组
    {p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"#caff67"},//类的对象
    {p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"#67bcef"},
    {p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:"#ef3d61"},
    {p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"#f9f51a"},
    {p:[{x:400,y:400},{x:600,y:600},{x:400,y:800},{x:200,y:600}],color:"#a594c0"},
    {p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"#fa8ccc"},
    {p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"#f6ca29"}
];

function draw(ele,context){
    var p=ele.p;
    context.beginPath();
    context.moveTo(p[0].x,p[0].y);
    for(var i=1;i<p.length;i++){
        context.lineTo(p[i].x,p[i].y);
    }
    context.closePath();
    context.fillStyle= ele.color;
    context.fill();

    context.lineWidth=3;
    context.strokeStyle="#18a";
    context.stroke();
}

function drawArc(context){
   for(var i=-0;i<10;i++){
       context.beginPath();
       context.arc(50+i*100,950,50,0,2*Math.PI*(1+i)/10,false);
       context.closePath();
       context.strokeStyle="#19a";
       context.stroke();
   }
}

window.onload=function(){
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    canvas.width=800;
    canvas.height=1800;
    for(var i=0;i<tangram.length;i++){
        draw(tangram[i],context);
    }

    drawArc(context);
}