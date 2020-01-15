function Node(nDimension, nBox, nPoint) {
    this.dimension = nDimension;

    /*
    this.color = undefined;
    if (this.dimension == "x") {
        this.color = new Color(255, 0, 0);
    } else if (this.dimension == "y") {
        this.color = new Color(0, 255, 0);
    }
    */
   
    this.color = new Color(nPoint.color.r, nPoint.color.g, nPoint.color.b);    
    this.point = new Point(nPoint.x, nPoint.y, this.color, 10, "(" + nPoint.x + ", " + nPoint.y + ")");

    this.left = undefined;
    this.right = undefined;

    this.minX = nBox.minX;
    this.minY = nBox.minY;
    this.maxX = nBox.maxX;
    this.maxY = nBox.maxY;

    this.NodePoint = undefined;
    this.LINES = [];

    this.show = function () {
        stroke(0, 0, 0);
        strokeWeight(2);

        if (this.dimension == "x") {
            line(this.point.x, this.minY, this.point.x, this.maxY);
        } else if (this.dimension == "y") {
            line(this.minX, this.point.y, this.maxX, this.point.y);
        }

        this.point.show();

        stroke(0, 0, 0);
        strokeWeight(2);
        this.LINES.forEach(l => {
            line(l.start.x, l.start.y, l.end.x, l.end.y);
        });

        if (this.left != undefined) {
            this.left.show();
        }
        if (this.right != undefined) {
            this.right.show();
        }
        
        this.NodePoint.show();
    }

    this.buildTreeRoot = function () {
        this.LINES = [];
        var split = treeWidth / 2;

        if (this.left != undefined) {
            var x = split / 2;
            this.LINES.push({
                "start": {
                    "x": treeBaseX + (treeWidth / 2),
                    "y": 50,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": 100,
                }
            });

            this.left.buildTree(x, 100, split, 0);
        }

        if (this.right != undefined) {
            var x = split + (split / 2);
            this.LINES.push({
                "start": {
                    "x": treeBaseX + (treeWidth / 2),
                    "y": 50,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": 100,
                }
            });
            this.right.buildTree(x, 100, split, split);
        }

        this.NodePoint = new Point(treeBaseX + (treeWidth / 2), 50, this.color, 10, "(" + this.point.x + ", " + this.point.y + ")");
    }

    this.buildTree = function (X, Y, width, left) {
        this.LINES = [];
        var split = width / 2;

        if (this.left != undefined) {
            var x = (split / 2) + left;
            this.LINES.push({
                "start": {
                    "x": treeBaseX + X,
                    "y": Y,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": Y + 50,
                }
            });

            this.left.buildTree(x, Y + 50, split, left);
        }

        if (this.right != undefined) {
            var x = split + (split / 2) + left;
            this.LINES.push({
                "start": {
                    "x": treeBaseX + X,
                    "y": Y,
                },
                "end": {
                    "x": treeBaseX + x,
                    "y": Y + 50,
                }
            });
            this.right.buildTree(x, Y + 50, split, split + left);
        }

        this.NodePoint = new Point(treeBaseX + X, Y, this.color, 10, "(" + this.point.x + ", " + this.point.y + ")");
    }
};