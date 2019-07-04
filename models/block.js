import Item from "./main.js";
import { log, rectIntersects } from "../utils.js";

class Block extends Item {
  constructor(path, x, y, lives, w, h) {
    super(path, x, y);
    this.w = w;
    this.h = h;
    this.alive = true;
    this.lives = lives;
  }

  kill(game) {
    this.lives--;
    if (this.lives < 1) {
      this.alive = false;
    }
    // update score
    game.score += 100;
  }

  collide(ball) {
    return (
      this.alive && (rectIntersects(this, ball) || rectIntersects(ball, this))
    );
  }
}

export default Block;
