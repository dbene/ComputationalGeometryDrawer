function Square(id, minX, maxX, minY, maxY, nPoint) {
    this.id = id;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.children = [];
    this.neighbors = {
        "NORTH": undefined,
        "WEST": undefined,
        "SOUTH": undefined,
        "EAST": undefined
    };
    this.root = false;

    if (nPoint != undefined)
        this.point = new Point(nPoint.x, nPoint.y, new Color(255, 0, 0), 5, undefined);

    this.NODE = {
        "x": 0,
        "y": 0,
    };
    this.LINES = [];
    this.CROSS = {
        "A": {
            "start": {
                "x": this.minX + (this.maxX - this.minX) / 2,
                "y": this.minY,
            },
            "end": {
                "x": this.minX + (this.maxX - this.minX) / 2,
                "y": this.maxY,
            }
        },
        "B": {
            "start": {
                "x": this.minX,
                "y": this.minY + (this.maxY - this.minY) / 2,
            },
            "end": {
                "x": this.maxX,
                "y": this.minY + (this.maxY - this.minY) / 2
            }
        }
    }

    this.show = function () {
        stroke(0, 0, 0);
        strokeWeight(2);

        if (Object.keys(this.children).length > 0) {
            line(this.CROSS.A.start.x, this.CROSS.A.start.y, this.CROSS.A.end.x, this.CROSS.A.end.y);
            line(this.CROSS.B.start.x, this.CROSS.B.start.y, this.CROSS.B.end.x, this.CROSS.B.end.y);
        }

        this.LINES.forEach(l => {
            line(l.start.x, l.start.y, l.end.x, l.end.y);
        });

        if (activeSquare == this) {
            fill(255, 0, 0);
            stroke(255, 0, 0);
            circle(this.NODE.x, this.NODE.y, nodeSize);
        } else if (relativSquare == this) {
            fill(0, 255, 0);
            stroke(0, 255, 0);
            circle(this.NODE.x, this.NODE.y, nodeSize);
        } else {
            fill(255, 255, 255);
            stroke(0, 0, 0);
            circle(this.NODE.x, this.NODE.y, nodeSize);
        }
    }

    this.activate = function () {
        activeSquare = this;
        relativSquare = undefined;
    }

    this.relativ = function () {
        relativSquare = this;
    }

    this.checkClick = function (X, Y) {
        if (X >= this.NODE.x - (nodeSize / 2) &&
            X <= this.NODE.x + (nodeSize / 2) &&
            Y >= this.NODE.y - (nodeSize / 2) &&
            Y <= this.NODE.y + (nodeSize / 2)) {

            this.activate();
        }
    }

    this.buildTreeRoot = function () {
        this.setNeighbours();

        var childCount = Object.keys(this.children).length;
        var split = treeWidth / childCount;
        
        this.LINES = [];
        for (var i = 0; i < childCount; i++) {
            var x = (i * split) + (split / 2);

            this.LINES.push({
                "start": {
                    "x": treeBaseX + (treeWidth / 2),
                    "y": 50,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": 100,
                },
            });

            this.children[i].buildTree(x, 100, split, i * split);
        }

        this.NODE = {
            "x": treeBaseX + (treeWidth / 2),
            "y": 50,
        }
    }

    this.buildTree = function (X, Y, width, left) {
        this.setNeighbours();

        var childCount = Object.keys(this.children).length;
        var split = width / childCount;

        this.LINES = [];
        for (var i = 0; i < childCount; i++) {
            var x = (i * split) + (split / 2) + left;

            this.LINES.push({
                "start": {
                    "x": treeBaseX + X,
                    "y": Y,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": Y + 50,
                },
            });
            this.children[i].buildTree(x, Y + 50, split, i * split + left);
        }

        this.NODE = {
            "x": treeBaseX + X,
            "y": Y,
        }
    }

    this.setNeighbours = function () {
        if (data.nodes[this.id].NORTH != undefined)
            this.neighbors.NORTH = squares[data.nodes[this.id].NORTH];
        if (data.nodes[this.id].WEST != undefined)
            this.neighbors.WEST = squares[data.nodes[this.id].WEST];
        if (data.nodes[this.id].SOUTH != undefined)
            this.neighbors.SOUTH = squares[data.nodes[this.id].SOUTH];
        if (data.nodes[this.id].EAST != undefined)
            this.neighbors.EAST = squares[data.nodes[this.id].EAST];
    }
};