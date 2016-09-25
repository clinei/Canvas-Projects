var drawInt, fade;

function drawCanvas(){
    var sizeThing, offset, size, w, h;
    var ab = [];
    if (localStorage.getItem("size") === null) {
        localStorage.setItem("size", 25);
        sizeThing = 25;
    } else{
        sizeThing = localStorage["size"];
    }
    var canvas = document.getElementById('grid');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    fade = setInterval(function() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }, 50);
    function createCirc(loc) {
        var ex = 0;
        var exInt = setInterval(function(){
            ctx.beginPath();
            ctx.arc(loc[0], loc[1], ex, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'lightblue';
            ctx.stroke();
            if(ex < 100){
                ex++;
            } else {
                clearInterval(exInt);
            }
        }, 15)
    }

    function randArr(arr) {
        rc = arr[Math.floor(Math.random() * arr.length)]
        return rc;
    }
    var offset = 10;
    var size = window.innerWidth / sizeThing;
    var w = h = 500;
    while ((size + offset) * h > window.innerHeight) {
        h--
    }
    while ((size + offset) * w > window.innerWidth) {
        w--
    }

    fillColor = "#FFF";
    for (var x = 0; x < w + 1; x++) {
        for (var y = 0; y < h + 1; y++) {
            ab.push([x * (size + offset) + 5, y * (size + offset) + 5, size, size])
        }
    }
    drawInt = setInterval(function() {
        createCirc(randArr(ab))
    }, 1000)
};

document.addEventListener("DOMContentLoaded", function(event) {
    drawCanvas();
});

function updateValue(newValue){
    localStorage.setItem("size", newValue)
    clearInterval(drawInt);
    clearInterval(fade);
    drawCanvas();
}