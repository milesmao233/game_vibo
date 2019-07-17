import { log } from "../../utils.js";

class Dinosaur {
    constructor(game) {
        this.game = game;
        this.context = this.game.context;
        this.setup();
    }

    setup() {
        this.scene = null;

        this.animations = {
            idle: [],
            run: []
        };
        this.addImages("idle", 10);
        this.addImages("run", 8);

        this.animationsName = "idle";
        this.texture = this.frames()[0];
        this.x = 100;
        this.y = 100;
        this.w = this.texture.width / 3;
        this.h = this.texture.height / 3;
        this.frameIndex = 0;
        this.frameCount = 2;
        this.flipX = false;
    }

    draw() {
        if (this.flipX) {
            this.context.save();
            let middle = this.x + this.w / 4;
            this.context.translate(middle, 0);
            this.context.scale(-1, 1);
            this.context.translate(-middle, 0);
            this.context.drawImage(
                this.texture,
                this.x,
                this.y,
                this.w,
                this.h
            );
            this.context.restore();
        } else {
            this.context.drawImage(
                this.texture,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    update() {
        this.frameCount--;
        if (this.frameCount == 0) {
            this.frameCount = 3;
            this.frameIndex = (this.frameIndex + 1) % this.frames().length;
            this.texture = this.frames()[this.frameIndex];
        }
    }

    addImages(name, n) {
        for (let i = 0; i < n; i++) {
            let n = `${name}-${i + 1}`;
            let p = this.game.textureByName(n);
            this.animations[name].push(p);
        }
    }

    frames() {
        return this.animations[this.animationsName];
    }

    changeAnimation(name) {
        this.animationsName = name;
    }

    move(num, eventStatus) {
        this.flipX = num < 0;
        if (eventStatus == "keydown") {
            this.changeAnimation("run");
            this.x = this.x + num;
        } else if (eventStatus == "keyup") {
            this.changeAnimation("idle");
        }
    }
}

export default Dinosaur;
