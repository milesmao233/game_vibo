import Item from "./main.js";

class Ball extends Item {
  constructor(path, x, y, speed, speedX, speedY) {
    super(path, x, y, speed);
    this.speedX = speedX;
    this.speedY = speedY;
    this.fired = false;
  }

  fire() {
    this.fired = true;
  }

  rebound() {
    this.speedY *= -1;
  }

  move() {
    if (this.fired) {
      if (this.x < 0 || this.x > 600) {
        this.speedX = -this.speedX;
      }
      if (this.y < 0 || this.y > 600) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
}

export default Ball;
