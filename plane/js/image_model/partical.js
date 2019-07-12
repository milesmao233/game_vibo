import { ImageMain } from "./index.js";
import { log, randomBetween } from "../../utils.js";

class Particle extends ImageMain {
    constructor(game, x, y, scene) {
        super(game, "particle");
        this.scene = scene;
        this.setup(x, y);
    }

    setup(x, y) {
        this.w = 7;
        this.h = 7;
        this.x = x;
        this.y = y;
        this.vx = randomBetween(-1, 1);
        this.vy = randomBetween(-1, 1);
        this.life = 30;
    }

    update() {
        this.life--;
        this.x += this.vx;
        this.y += this.vy;
    }
}

export default Particle;
