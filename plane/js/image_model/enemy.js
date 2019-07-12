import { ImageMain, Boom } from "./index.js";
import { log, randomBetween, rectIntersects } from "../../utils.js";

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
        this.alive = true;
        this.speed = randomBetween(2, 5);
        this.x = randomBetween(0, 450);
        this.y = -randomBetween(0, 200);
    }

    draw() {
        if (this.alive) {
            this.scene.drawImage(this);
        }
    }

    update() {
        this.y += this.speed;
        if (this.y > this.game.canvas.height || !this.alive) {
            this.setup();
        }
    }

    collide(bullet) {
        return (
            this.alive &&
            (rectIntersects(this, bullet) || rectIntersects(bullet, this))
        );
    }

    kill() {
        this.alive = false;
    }

    boom() {
        let x = this.x + this.w / 2;
        let y = this.y + this.h / 2;
        let b = new Boom(this.game, x, y);
        this.scene.addElement(b);
    }
}

export default Enemy;
