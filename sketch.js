var data;
var points = [];
var squares = [];

var activeSquare, relativSquare;

var treeBaseX = 550;
var nodeSize = 10;
var treeWidth = undefined;

function preload() {
    data = loadJSON("data/test.json");
}

function setup() {
    treeWidth = windowWidth - treeBaseX;

    canvasHeight = windowHeight - 96;
    canvasWidth = windowWidth - 16;

    mapHeight = 500;
    mapWidth = 500;

    data.nodes.forEach(node => {
        var sq = new Square(node._id, node.minX, node.maxX, node.minY, node.maxY, node.point);
        squares.push(sq);
    });
    squares[0].root = true;

    processNode(data.map);

    squares[0].buildTreeRoot();

    frameRate(60);
    createCanvas(canvasWidth, canvasHeight);

    createDiv('Click on a node in the tree to mark it.<br>Use ARROWS to show neighbour of active node.<br>Use WASD to navigate through active nodes.<br>Use NUMPAD 1, 3, 7, 9 to navigate to a childnode.');
}

function windowResized() {
    treeWidth = windowWidth - treeBaseX;

    canvasHeight = windowHeight - 96;
    canvasWidth = windowWidth - 16;

    squares[0].buildTreeRoot();

    resizeCanvas(canvasWidth, canvasHeight);
}

function processNode(node) {
    var sq = squares[node._refID];

    if (sq.point != undefined) {
        points.push(sq.point);
    } else if (Object.keys(node).length > 1) {
        if (node.NE) {
            sq.children.push(squares[node.NE._refID]);
            processNode(node.NE);
        }
        if (node.NW) {
            sq.children.push(squares[node.NW._refID]);
            processNode(node.NW);
        }
        if (node.SW) {
            sq.children.push(squares[node.SW._refID]);
            processNode(node.SW);
        }
        if (node.SE) {
            sq.children.push(squares[node.SE._refID]);
            processNode(node.SE);
        }
    }
}

function draw() {
    clear();

    if (this.activeSquare != undefined) {
        fill(200, 128, 128);
        stroke(200, 128, 128);
        square(this.activeSquare.minX, this.activeSquare.minY, this.activeSquare.maxX - this.activeSquare.minX);
    }
    if (relativSquare != undefined) {
        fill(128, 200, 128);
        stroke(128, 200, 128);
        square(this.relativSquare.minX, this.relativSquare.minY, this.relativSquare.maxX - this.relativSquare.minX);
    }

    // Border
    strokeWeight(2);
    stroke(0, 0, 0);
    line(1, 1, mapWidth - 1, 1);
    line(1, 1, 1, mapHeight - 1);
    line(mapWidth - 1, 1, mapWidth - 1, mapHeight - 1);
    line(1, mapHeight - 1, mapWidth - 1, mapHeight - 1);

    // Draw Elements
    for (var i = 0; i < points.length; i++) {
        points[i].show();
    }
    for (var i = 0; i < squares.length; i++) {
        squares[i].show();
    }
}

function mouseClicked() {
    squares.forEach(sq => {
        sq.checkClick(winMouseX - 8, winMouseY - 8);
    });
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (this.activeSquare.neighbors.NORTH != undefined)
            this.activeSquare.neighbors.NORTH.relativ();
    } else if (keyCode === RIGHT_ARROW) {
        if (this.activeSquare.neighbors.EAST != undefined)
            this.activeSquare.neighbors.EAST.relativ();
    } else if (keyCode === LEFT_ARROW) {
        if (this.activeSquare.neighbors.WEST != undefined)
            this.activeSquare.neighbors.WEST.relativ();
    } else if (keyCode === DOWN_ARROW) {
        if (this.activeSquare.neighbors.SOUTH != undefined)
            this.activeSquare.neighbors.SOUTH.relativ();
    } else if (keyCode === 105) {
        // 9
        if (this.activeSquare.children[0] != undefined) {
            this.activeSquare.children[0].activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 103) {
        // 7
        if (this.activeSquare.children[1] != undefined) {
            this.activeSquare.children[1].activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 97) {
        // 1
        if (this.activeSquare.children[2] != undefined) {
            this.activeSquare.children[2].activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 99) {
        // 3
        if (this.activeSquare.children[3] != undefined) {
            this.activeSquare.children[3].activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 87) {
        // W
        if (this.activeSquare.neighbors.NORTH != undefined) {
            this.activeSquare.neighbors.NORTH.activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 65) {
        // A
        if (this.activeSquare.neighbors.WEST != undefined) {
            this.activeSquare.neighbors.WEST.activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 83) {
        // S
        if (this.activeSquare.neighbors.SOUTH != undefined) {
            this.activeSquare.neighbors.SOUTH.activate();
            this.relativSquare = undefined;
        }
    } else if (keyCode === 68) {
        // D
        if (this.activeSquare.neighbors.EAST != undefined) {
            this.activeSquare.neighbors.EAST.activate();
            this.relativSquare = undefined;
        }
    }
}