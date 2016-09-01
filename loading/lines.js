var fade, lineAnimation;

function update() {
    clearInterval(fade);
    clearInterval(lineAnimation);
    draw();
}

function draw() {
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
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#111';
    fade = setInterval(function() {
        ctx.arc(centerX, centerY, radius - 0.7, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fill();
    }, 25);
    ctx.stroke();

    function drawLine(x, y, xa, ya) {
        ctx.setLineDash([0, 0]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xa, ya);
        ctx.stroke();
    }
    var dum = 0;
    var dum2 = steps;
    lineAnimation = setInterval(function() {
        if (dum < steps) {
            drawLine(xValues[dum], yValues[dum], xValues[dum2], yValues[dum2]);
            dum++;
            dum2--;
        } else {
            dum = 0;
            dum2 = steps;
        }
    }, 50)
}

document.addEventListener('DOMContentLoaded', function() {
    draw();
})