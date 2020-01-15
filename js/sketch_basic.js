var scenes = [];
let slider;
var dataArray;

let maxX = 0,
    maxY = 0;
let minX = 1024,
    minY = 1024;
let maxWidth, maxHeight;

let xFactor = 1;
let yFactor = 1;

function preload() {
    dataArray = loadJSON("data/output.json");
}

function setup() {
    height = windowHeight - 64;
    width = windowWidth - 16;

    frameRate(60);

    for (var i = 0; i < dataArray.scenes.length; i++) {
        var points = dataArray.scenes[i].points;
        var lines = dataArray.scenes[i].lines;
        var list = [];


        lines.forEach(element => {
            list.push(new Line({
                "x": element.p1.x,
                "y": element.p1.y
            }, {
                "x": element.p2.x,
                "y": element.p2.y
            }, new Color(element.color.r, element.color.g, element.color.b), element.width));

            checkMaxMinX(element.p1.x);
            checkMaxMinX(element.p2.x);
            checkMaxMinY(element.p1.y);
            checkMaxMinY(element.p2.y);
        });

        points.forEach(element => {
            list.push(new Point(element.x, element.y, new Color(element.color.r, element.color.g, element.color.b), element.size, element.text));
            checkMaxMinX(element.x);
            checkMaxMinY(element.y);
        });

        scenes.push(list);
    }

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

    slider = createSlider(0, scenes.length - 1, 0, 1);
    slider.position(24, windowHeight - 40);
    slider.style('width', (width - 40) + 'px');

    createCanvas(width, height);
}

function draw() {
    clear();

    // Get Scene
    let sceneID = slider.value();
    var list = scenes[sceneID];

    // Border
    strokeWeight(2);
    stroke(0, 0, 0);
    line(1, 1, width - 1, 1);
    line(1, 1, 1, height - 1);
    line(width - 1, 1, width - 1, height - 1);
    line(1, height - 1, width - 1, height - 1);

    // Draw Elements
    for (var i = 0; i < list.length; i++) {
        list[i].show(true);
    }
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
    height = windowHeight - 64;
    width = windowWidth - 16;

    slider.position(24, windowHeight - 40);
    slider.style('width', (width - 40) + 'px');

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