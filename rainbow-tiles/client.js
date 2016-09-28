var drawInt;

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
    
    function RGB2Color(r, g, b) {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    function byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }
    var rainbow = [];
    var frequency = .005;
    for (var i = 0; i < 7000; ++i) {
        red = Math.sin(frequency * i + 0) * 127 + 128;
        green = Math.sin(frequency * i + 2) * 127 + 128;
        blue = Math.sin(frequency * i + 4) * 127 + 128;
        rainbow.push(RGB2Color(red, green, blue));
    }

    function createRect(fillColor, loc) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(loc[0], loc[1], loc[2], loc[3]);
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
    //$("#counter")[0].innerHTML = `(${w}, ${h})`;
    fillColor = "#FFF";
    for (var x = 0; x < w + 1; x++) {
        for (var y = 0; y < h + 1; y++) {
            ab.push([x * (size + offset) + 5, y * (size + offset) + 5, size, size])
            createRect(fillColor, [x * (size + offset) + 5, y * (size + offset) + 5, size, size]);
        }
    }
    console.log(rainbow)
    var colNum = 0;
    drawInt = setInterval(function() {
        createRect(rainbow[colNum], randArr(ab))
        if(colNum < rainbow.length){
            colNum++
        } else {
            colNum = 0;
            rainbow.reverse();
            console.log("Reversed")
        }
    }, 1)
    window.fitText(document.getElementById("fit"));
    document.getElementById("slideRange").value = localStorage["size"];
    document.getElementById("range").innerHTML = localStorage["size"];
};

document.addEventListener("DOMContentLoaded", function(event) {
    drawCanvas();
});

function updateValue(newValue){
    localStorage.setItem("size", newValue)
    clearInterval(drawInt);
    drawCanvas();
}