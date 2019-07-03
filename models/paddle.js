import Item from "./main.js";

class Paddle extends Item {
  constructor(path, x, y, speed) {
    super(path, x, y);
    this.speed = speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }
}

export default Paddle;
