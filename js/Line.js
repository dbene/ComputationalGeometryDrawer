function Line(p1, p2, color, width) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
    this.width = width;

    this.show = function (fitWindow) {
        stroke(color.r, color.g, color.b);
        strokeWeight(this.width);

        if(fitWindow){
            var tp1 = translateCoordinates(this.p1.x, this.p1.y);
            var tp2 = translateCoordinates(this.p2.x, this.p2.y);
            line(tp1.x, tp1.y, tp2.x, tp2.y);
        } else {
            line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        }
    }
}