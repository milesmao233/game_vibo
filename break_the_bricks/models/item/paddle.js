import ImageMain from "./image.js";
import { log, rectIntersects } from "../../utils/utils.js";

class Paddle extends ImageMain {
    constructor(game, image, x, y, speed) {
        super(game, "paddle");
        this.setup();
    }

    setup() {
        this.x = 200;
        this.y = 550;
        this.speed = 8;
    }

    collide(ball) {
        return rectIntersects(this, ball) || rectIntersects(ball, this);
    }

    moveLeft() {
        this.x -= this.speed;
        if (this.x < 0) this.x = 0;
    }

    moveRight() {
        this.x += this.speed;
        let screenWidth = this.game.canvas.width;
        if (this.x > screenWidth - this.image.width)
            this.x = screenWidth - this.image.width;
    }
}

export default Paddle;
