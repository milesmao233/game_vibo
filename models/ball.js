import Item from "./main.js";

class Ball extends Item {
  constructor(path, x, y, moveSpeed) {
    super(path, x, y, moveSpeed);
    this.speedX = 10;
    this.speedY = 10;
    this.fired = false;
    this.paused = false;
  }

  fire() {
    this.fired = true;
  }

  pause() {
    this.paused = !this.paused;
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
