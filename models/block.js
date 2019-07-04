import Item from "./main.js";
var log = console.log.bind(console);

var rectIntersects = function(a, b) {
  if (b.y > a.y && b.y < a.y + a.image.height) {
    if (b.x > a.x && b.x < a.x + a.image.width) {
      return true;
    }
  }
  return false;
};

class Block extends Item {
  constructor(path, x, y, w, h) {
    super(path, x, y);
    this.w = w;
    this.h = h;
    this.alive = true;
  }

  kill() {
    this.alive = false;
  }

  collide(ball) {
    return (
      this.alive && (rectIntersects(this, ball) || rectIntersects(ball, this))
    );
  }
}

export default Block;
