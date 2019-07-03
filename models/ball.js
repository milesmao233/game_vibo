import Item from "./main.js";

class Ball extends Item {
  constructor(path, x, y, speedX, speedY) {
    super(path, x, y);
    this.speedX = speedX;
    this.speedY = speedY;
    this.fired = false;
  }

  fire() {
    this.fired = true;
  }

  move() {
    if (this.fired) {
      if (this.x < 0 || this.x > 400) {
        this.speedX = -this.speedX;
      }
      if (this.y < 0 || this.y > 300) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
}

export default Ball;
