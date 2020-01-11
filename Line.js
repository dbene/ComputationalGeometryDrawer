function Line(p1, p2, color, width) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
    this.width = width;

    this.show = function () {
        stroke(color.r, color.g, color.b);
        strokeWeight(this.width);
        
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}