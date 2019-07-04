import Item from "./main.js";
import { log, rectIntersects } from "../utils.js";

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
