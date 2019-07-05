import Item from "./main.js";
import { log, rectIntersects } from "../utils.js";

class Block extends Item {
  constructor(name, image, x, y, lives) {
    super(name, image, x, y);
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
