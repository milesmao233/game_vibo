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

class Paddle extends Item {
  constructor(path, x, y, speed) {
    super(path, x, y);
    this.speed = speed;
  }

  collide(ball) {
    return rectIntersects(this, ball) || rectIntersects(ball, this);
  }
}

export default Paddle;
