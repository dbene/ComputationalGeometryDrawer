var data;
var points = [];
var lines = [];

let maxX = 0,
    maxY = 0;
let minX = 1024,
    minY = 1024;
let maxWidth, maxHeight;

function preload() {
    data = loadJSON("data/blatt5.json");
}

function setup() {
    height = windowHeight - 16;
    width = windowWidth - 16;

    data.polygone.forEach(polygon => {
        polygon.points.forEach(point => {
            var p = new Point(point.x, point.y, new Color(255, 0, 0), point.size, "(" + point.x + ", " + point.y + ") " + point.text);
            points.push(p);
            checkMaxMinX(point.x);
            checkMaxMinY(point.y);
        });
    
        polygon.lines.forEach(line => {
            var l = new Line(new Point(line.p1.x, line.p1.y, undefined, undefined, undefined), new Point(line.p2.x, line.p2.y, undefined, undefined, undefined), line.color, line.width);
            lines.push(l);
        });
    
        polygon.triLines.forEach(line => {
            var l = new Line(new Point(line.p1.x, line.p1.y, undefined, undefined, undefined), new Point(line.p2.x, line.p2.y, undefined, undefined, undefined), line.color, line.width);
            lines.push(l);
        });
    });

    console.log(lines.length);

    var test = width / height;
    if (test > 1) {
        // x Ausdehnung groesser
        maxWidth = height;
        maxHeight = height;
    } else if (test < 1) {
        // Y Ausdehnung groesser
        maxWidth = width;
        maxHeight = width;
    }

    frameRate(60);
    createCanvas(width, height);
}

function checkMaxMinX(x) {
    if (maxX < x) {
        maxX = x;
    }
    if (minX > x) {
        minX = x;
    }
}

function checkMaxMinY(y) {
    if (maxY < y) {
        maxY = y;
    }
    if (minY > y) {
        minY = y;
    }
}

function windowResized() {
    height = windowHeight - 16;
    width = windowWidth - 16;

    var test = width / height;
    if (test > 1) {
        // x Ausdehnung groesser
        maxWidth = height;
        maxHeight = height;
    } else if (test < 1) {
        // Y Ausdehnung groesser
        maxWidth = width;
        maxHeight = width;
    }

    resizeCanvas(width, height);
}


function draw() {
    clear();

    // Border
    strokeWeight(2);
    stroke(0, 0, 0);
    line(1, 1, width - 1, 1);
    line(1, 1, 1, height - 1);
    line(width - 1, 1, width - 1, height - 1);
    line(1, height - 1, width - 1, height - 1);

    // Draw Elements
    for (var i = 0; i < lines.length; i++) {
        lines[i].show(true);
    }

    for (var i = 0; i < points.length; i++) {
        points[i].show(true);
    }
}

function translateCoordinates(Xw, Yw) {
    var Ax = Xw - minX;
    var Ay = Yw - minY;

    var Bx = (maxWidth - 64) / (maxX - minX) * Ax;
    var By = (maxHeight - 64) / (maxY - minY) * Ay;

    var Xs = Bx + 32;
    var Ys = By + 32;

    return {
        x: Xs,
        y: Ys
    };
}