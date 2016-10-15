var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var t = 0; 
var A = 600;
var B = 400;
var a = 70;
var b = 150;
var h = Math.PI / 2;

ctx.strokeStyle = "rgba(64, 64, 64, 0.3)";
ctx.lineWidth = 1;
ctx.beginPath();

var t2 = 0;
var drawInt = setInterval(function(){
    if(t2 < Math.PI*2) {
        x = A * Math.sin(a * t2 + h) + canvas.width / 2;
        y = B * Math.sin(b * t2) + canvas.height / 2;
        ctx.lineTo(x, y);
        ctx.stroke();
        t2 += 0.001;
        
    } else {
        clearInterval(drawInt);
    }
}, 30);
   

