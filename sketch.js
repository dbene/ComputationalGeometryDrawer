var data;
var nodes = [];

var rootNode;

var treeBaseX = 550;
var nodeSize = 10;
var treeWidth = undefined;

function preload() {
    data = loadJSON("data/test_blatt4.json");
}

function setup() {
    treeWidth = windowWidth - treeBaseX;

    canvasHeight = windowHeight - 80;
    canvasWidth = windowWidth - 16;

    mapHeight = 500;
    mapWidth = 500;

    rootNode = processNode(data.map);
    rootNode.buildTreeRoot();

    frameRate(60);
    createCanvas(canvasWidth, canvasHeight);
}

function windowResized() {
    treeWidth = windowWidth - treeBaseX;

    canvasHeight = windowHeight - 80;
    canvasWidth = windowWidth - 16;

    rootNode.buildTreeRoot();

    resizeCanvas(canvasWidth, canvasHeight);
}

function processNode(map) {
    var node = new Node(map.dimension, map.box, map.point);

    if (map.left != undefined) {
        node.left = processNode(map.left);
    }
    if (map.right != undefined) {
        node.right = processNode(map.right);
    }

    return node;
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
    rootNode.show();
}