function Square(minX, maxX, minY, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.children = [];
    this.root = false;
    this.treeBaseX = 550;

    this.nodeSize = 10;

    this.show = function () {
        stroke(0, 0, 0);
        strokeWeight(2);

        line(this.minX + (this.maxX - this.minX) / 2, this.minY, this.minX + (this.maxX - this.minX) / 2, this.maxY);
        line(this.minX, this.minY + (this.maxY - this.minY) / 2, this.maxX, this.minY + (this.maxY - this.minY) / 2);

        if (this.root) {
            var childCount = Object.keys(this.children).length;
            var split = 1200 / childCount;

            for (var i = 0; i < childCount; i++) {
                var x = (i * split) + (split / 2);

                line(this.treeBaseX + 600, 50, this.treeBaseX + x, 100);
                this.children[i].showTree(x, 100, split, i * split);
            }

            fill(255, 255, 255);
            stroke(0, 0, 0);

            circle(this.treeBaseX + 600, 50, this.nodeSize);
        }
    }

    this.showTree = function (X, Y, width, left) {
        var childCount = Object.keys(this.children).length;
        var split = width / childCount;

        for (var i = 0; i < childCount; i++) {
            var x = (i * split) + (split / 2) + left;

            line(this.treeBaseX + X, Y, this.treeBaseX + x, Y + 50);
            this.children[i].showTree(x, Y + 50, split, i * split + left);
        }
        fill(255, 255, 255);
        stroke(0, 0, 0);

        circle(this.treeBaseX + X, Y, this.nodeSize);
    }
}