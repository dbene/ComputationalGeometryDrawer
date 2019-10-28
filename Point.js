function Point(x, y, color, size, desc) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.desc = desc;

    this.show = function () {
        fill(color.r, color.g, color.b);

        var {x, y} = translateCoordinates(this.x, this.y);
        circle(x, y, this.size);

        if (this.desc != undefined) {
            fill(255, 0, 0);
            textSize(18);
            text(this.desc, x + 18, y);
        }
    }
}