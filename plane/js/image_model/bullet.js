import { ImageMain } from "./index.js";
import config from "../config.js";

class Bullet extends ImageMain {
    constructor(game) {
        super(game, "bullet");
        this.setup();
    }

    setup() {
        this.speed = config.bullet_speed;
    }

    update() {
        this.y -= this.speed;
    }
}

export default Bullet;
