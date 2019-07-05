import Item from "./main.js";
import { log, rectIntersects } from "../utils.js";

class Paddle extends Item {
  constructor(name, image, x, y, speed) {
    super(name, image, x, y, speed);
  }

  collide(ball) {
    return rectIntersects(this, ball) || rectIntersects(ball, this);
  }
}

export default Paddle;
