var fade, lineAnimation;

function update() {
    clearInterval(fade);
    clearInterval(lineAnimation);
    draw();
}

function draw() {
    function RGB2Color(r, g, b) {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }
    function byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }
    var rainbow = [];
    var frequency = .1;
    for (var i = 0; i < 7000; ++i) {
        red = Math.sin(frequency * i + 0) * 127 + 128;
        green = Math.sin(frequency * i + 2) * 127 + 128;
        blue = Math.sin(frequency * i + 4) * 127 + 128;
        rainbow.push(RGB2Color(red, green, blue));
    }
    var canvas = document.getElementById('lines');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 70;
    var steps = 25;
    var xValues = [centerX];
    var yValues = [centerY];
    for (var i = 1; i < steps; i++) {
        xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps - Math.PI / 2));
        yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps - Math.PI / 2));
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius+1, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#111';
    fade = setInterval(function() {
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fill();
    }, 25);
    ctx.stroke();

    function drawLine(color, x, y, xa, ya) {
        ctx.setLineDash([0, 0]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xa, ya);
        ctx.stroke();
    }
    var colNum = 0;
    var dum = 0;
    var dum2 = steps;
    lineAnimation = setInterval(function() {
        if (dum < steps) {
            drawLine(rainbow[colNum], xValues[dum], yValues[dum], xValues[dum2], yValues[dum2]);
            dum++;
            dum2--;
        } else {
            dum = 0;
            dum2 = steps;
        }
        if(colNum < rainbow.length){
            colNum++
        } else {
            colNum = 0;
            rainbow.reverse();
        }
    }, 50)
}

document.addEventListener('DOMContentLoaded', function() {
    draw();
})