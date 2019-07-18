import config from "../config.js";
import ImageMain from "./image.js";
import { log, randomBetween } from "../../utils.js";

class Pipes {
    constructor(game) {
        this.game = game;
        this.setup();
    }
    setup() {
        this.intervalY = config.pipe_Y;
        this.intervalX = config.pipe_X;
        this.pipes = [];
        this.pipeCount = 3;
        this.id = "pipes";
        for (let i = 0; i < this.pipeCount; i++) {
            const p1 = new ImageMain(this.game, "pipe");
            p1.flip = true;
            p1.x = 500 + i * this.intervalX;
            const p2 = new ImageMain(this.game, "pipe");
            p2.x = p1.x;
            this.pipeForY(p1, p2);
            this.pipes.push(p1, p2);
        }
    }
    pipeForY(p1, p2) {
        p1.y = randomBetween(-config.pipe_Up, 0);
        p2.y = p1.h + p1.y + this.intervalY;
        let pipeDownHeight = 670 - p2.y;
        p2.h = pipeDownHeight;
    }
    update() {
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            const p1 = this.pipes[i];
            const p2 = this.pipes[i + 1];

            p1.x -= 5;
            if (p1.x < -100) {
                p1.x += (this.pipeCount - 1) * this.intervalX;
            }
            p2.x -= 5;
            if (p2.x < -100) {
                p2.x += (this.pipeCount - 1) * this.intervalX;
                this.pipeForY(p1, p2);
            }
        }
    }
    draw() {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            let context = this.game.context;
            context.save();
            let w = pipe.w / 2;
            let h = pipe.h / 2;
            context.translate(pipe.x + w, pipe.y + h);
            if (pipe.flip) {
                context.scale(1, -1);
            }
            context.translate(-w, -h);
            context.drawImage(pipe.image, 0, 0, pipe.w, pipe.h);
            context.restore();
        }
    }
}

export default Pipes;
