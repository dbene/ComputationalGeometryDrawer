var data;
var points = [];
var squares = [];

var activeSquare;

function preload() {
    data = loadJSON("data/test.json");
}

function setup() {
    canvasHeight = windowHeight - 16;
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

    if(this.activeSquare != undefined){
        fill(200, 128, 128);
        stroke(200, 128, 128);
        square(this.activeSquare.minX, this.activeSquare.minY, this.activeSquare.maxX - this.activeSquare.minX);
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
        sq.checkClick(winMouseX, winMouseY);
    });
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        console.log("up");
      } else if (keyCode === RIGHT_ARROW) {
        console.log("right");
      } else if (keyCode === LEFT_ARROW) {
        console.log("left");
      } else if (keyCode === DOWN_ARROW) {
        console.log("down");
      }
  }