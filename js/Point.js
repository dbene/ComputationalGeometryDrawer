function Point(x, y, color, size, desc) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.desc = desc;

    this.show = function () {
        fill(color.r, color.g, color.b);
        stroke(color.r, color.g, color.b);

        circle(this.x, this.y, this.size);

        if (this.desc != undefined) {
            stroke(0, 0, 0);
            strokeWeight(0.2);

            fill(0, 0, 0);
            textSize(18);
            text(this.desc, x + 18, y);
        }
    }
}