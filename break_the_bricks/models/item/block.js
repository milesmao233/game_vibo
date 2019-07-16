import ImageMain from "./image.js";
import { log, rectIntersects } from "../../utils/utils.js";

class Block extends ImageMain {
    constructor(game, x, y, lives) {
        super(game, "block");
        this.x = x;
        this.y = y;
        this.alive = true;
        this.lives = lives;
        this.id = new Date().getTime();
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
            this.alive &&
            (rectIntersects(this, ball) || rectIntersects(ball, this))
        );
    }

    draw() {
        if (this.alive) {
            this.scene.drawImage(this);
        }
    }
}

export default Block;
