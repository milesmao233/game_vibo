import { ImageMain, Bullet } from "./index.js";
import config from "../config.js";
import { log } from "../../utils.js";

class Player extends ImageMain {
    constructor(game) {
        super(game, "player");
        this.setup();
    }

    setup() {
        this.speed = config.player_speed;
        this.w = this.image.width / 2;
        this.h = this.image.height / 2;
        this.cooldown = 0;
    }

    update() {
        this.speed = config.player_speed;
        if (this.cooldown > 0) {
            this.cooldown--;
        }
    }

    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.bullet_cooldown;
            let x = this.x + this.w / 2;
            let y = this.y;
            let b = new Bullet(this.game);
            b.x = x;
            b.y = y;
            this.scene.bullets.push(b);
            this.scene.addElement(b);
        }
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveUp() {
        this.y += this.speed;
    }

    moveDown() {
        this.y -= this.speed;
    }
}

export default Player;
