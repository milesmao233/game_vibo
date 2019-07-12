import { ImageMain } from "./index.js";
import config from "../config.js";

class Bullet extends ImageMain {
    constructor(game) {
        super(game, "bullet2");
        this.setup();
    }

    setup() {
        this.alive = true;
        this.speed = config.bullet_speed;
    }

    draw() {
        if (this.alive) {
            this.scene.drawImage(this);
        }
    }

    update() {
        this.y -= this.speed;
    }

    kill() {
        this.alive = false;
        this.y = null;
    }
}

export default Bullet;
