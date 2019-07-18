import config from "../config.js";
import { log, rectIntersects } from "../../utils.js";

class Bird {
    constructor(game, x, y) {
        this.game = game;
        this.x = x || 120;
        this.y = y || 100;
        this.setup();
    }
    setup() {
        const birdList = Object.keys(this.game.images).filter(e =>
            e.includes("bird")
        );
        this.frames = birdList.map(e => this.game.textureByName(e));
        this.frameIndex = 0;
        this.frequency = 2;
        this.vy = 1;
        this.vg = 10;
        this.flip = false;
        this.rotation = 0;
        this.id = "bird";
    }

    showFrame() {
        this.image = this.frames[this.frameIndex];
        this.w = this.image.width;
        this.h = this.image.height;
    }

    draw() {
        this.showFrame();
        let context = this.game.context;
        context.save();
        let w = this.w / 2;
        let h = this.h / 2;
        context.translate(this.x + w, this.y + h);
        if (this.flip) {
            context.scale(-1, 1);
        }
        context.rotate((this.rotation * Math.PI) / 180);
        context.translate(-w, -h);
        context.drawImage(this.image, 0, 0);
        context.restore();
    }

    update() {
        if (this.y < 670 || this.vy < 0) {
            this.y += this.vy;
            this.vy += this.vg * 0.03;
        }
        if (this.rotation < 45) {
            this.rotation += 3;
        }
        this.frequency--;
        if (this.frequency == 0) {
            if (this.frameIndex + 1 < this.frames.length) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
            this.frequency = 2;
        }
    }

    collide(item) {
        return rectIntersects(this, item) || rectIntersects(item, this);
    }

    pass(pipe) {
        let collideItem = {
            x: pipe.x + pipe.w,
            y: pipe.y - config.pipe_Y,
            w: 1,
            h: config.pipe_Y
        };

        return (
            rectIntersects(this, collideItem) ||
            rectIntersects(collideItem, this)
        );
    }

    moveLeft() {
        if (this.x > 0) {
            this.flip = true;
            this.x -= config.bird_speed;
        }
    }
    moveRight() {
        if (this.x + this.w < this.game.canvas.width) {
            this.flip = false;
            this.x += config.bird_speed;
        }
    }
    jump() {
        this.rotation = -45;
        if (this.y - 5 > this.h / 2) {
            this.vy = -config.jump_height;
        }
    }
}

export default Bird;
