import ImageMain from "./image.js";
import { log, rectIntersects } from "../../utils/utils.js";

class Ball extends ImageMain {
    constructor(game) {
        super(game, "ball");
        this.setup();
    }

    setup() {
        this.x = 230;
        this.y = 540;
        this.id = "ball";
        this.keyDownSpeed = 8;
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

    moveLeft() {
        this.x -= this.keyDownSpeed;
        if (this.x < 0) this.x = 0;
    }

    moveRight() {
        this.x += this.keyDownSpeed;
        let screenWidth = this.game.canvas.width;
        if (this.x > screenWidth - this.image.width)
            this.x = screenWidth - this.image.width;
    }
}

export default Ball;
