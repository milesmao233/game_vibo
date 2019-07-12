import { ImageMain } from "./index.js";
import { log, randomBetween } from "../../utils.js";

class Enemy extends ImageMain {
    constructor(game) {
        const type = randomBetween(0, 2);
        const name = "enemy" + type;
        super(game, name);

        this.w = this.image.width / 2;
        this.h = this.image.height / 2;
        this.setup();
    }

    setup() {
        this.speed = randomBetween(2, 5);
        this.x = randomBetween(0, 400);
        this.y = -randomBetween(0, 200);
    }

    update() {
        this.y += this.speed;
        if (this.y > this.game.canvas.height) {
            this.setup();
        }
    }
}

export default Enemy;
