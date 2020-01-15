function Point(x, y, color, size, desc) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.desc = desc;

    this.show = function (fitWindow) {
        fill(color.r, color.g, color.b);
        stroke(color.r, color.g, color.b);

        if (fitWindow) {
            var p = translateCoordinates(this.x, this.y);
            circle(p.x, p.y, this.size);
        } else {
            circle(this.x, this.y, this.size);
        }

        if (this.desc != undefined) {
            stroke(0, 0, 0);
            strokeWeight(0.2);

            fill(0, 0, 0);
            textSize(18);

            if (fitWindow) {
                var p = translateCoordinates(this.x, this.y);
                text(this.desc, p.x + 18, p.y);
            } else {
                text(this.desc, this.x + 18, this.y);
            }
        }

    }
}