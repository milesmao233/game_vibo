import Item from "./main.js";
import { log, rectIntersects } from "../utils.js";

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
