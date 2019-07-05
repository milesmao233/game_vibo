import Item from "./main.js";
import { log } from "../utils.js";

class Ball extends Item {
  constructor(name, image, x, y, moveSpeed) {
    super(name, image, x, y, moveSpeed);
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
    log("ball speed", this.speedX, this.speedY);
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
