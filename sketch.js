var data;
var list = [];

function preload() {
    data = loadJSON("data/test.json");
}

function setup() {
    canvasHeight = windowHeight - 16;
    canvasWidth = windowWidth - 16;

    mapHeight = 500;
    mapWidth = 500;

    var rootSquare = new Square(0, 500, 0, 500);
    rootSquare.root = true;
    processNode(data.map, rootSquare);

    frameRate(1);
    createCanvas(canvasWidth, canvasHeight);
}

function processNode(node, currentSquare) {
    if (node.point != undefined) {
        list.push(new Point(node.point.x, node.point.y, new Color(255, 0, 0), 5, undefined));
    } else if (Object.keys(node).length > 0) {
        list.push(currentSquare);

        diffX = (currentSquare.maxX - currentSquare.minX) / 2;
        diffY = (currentSquare.maxY - currentSquare.minY) / 2;

        var neSquare = new Square(currentSquare.minX + diffX, currentSquare.maxX, currentSquare.minY, currentSquare.maxY - diffY);
        var nwSquare = new Square(currentSquare.minX, currentSquare.maxX - diffX, currentSquare.minY, currentSquare.maxY - diffY);
        var swSquare = new Square(currentSquare.minX, currentSquare.maxX - diffX, currentSquare.minY + diffY, currentSquare.maxY);
        var seSquare = new Square(currentSquare.minX + diffX, currentSquare.maxX, currentSquare.minY + diffY, currentSquare.maxY);

        currentSquare.children.push(neSquare);
        currentSquare.children.push(nwSquare);
        currentSquare.children.push(swSquare);
        currentSquare.children.push(seSquare);

        if (node.NE) processNode(node.NE, neSquare);
        if (node.NW) processNode(node.NW, nwSquare);
        if (node.SW) processNode(node.SW, swSquare);
        if (node.SE) processNode(node.SE, seSquare);
    }
}

function draw() {
    clear();

    // Border
    strokeWeight(2);
    stroke(0, 0, 0);
    line(1, 1, mapWidth - 1, 1);
    line(1, 1, 1, mapHeight - 1);
    line(mapWidth - 1, 1, mapWidth - 1, mapHeight - 1);
    line(1, mapHeight - 1, mapWidth - 1, mapHeight - 1);

    // Draw Elements
    for (var i = 0; i < list.length; i++) {
        list[i].show();
    }
}