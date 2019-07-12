import { Particle } from "./index.js";
import config from "../config.js";

class Boom {
    constructor(game, x, y) {
        this.game = game;
        this.setup(x, y);
    }

    setup(x, y) {
        this.name = "boom";
        this.id = new Date().getTime();
        this.x = x;
        this.y = y;
        this.numParticles = 20;
        this.particles = [];
        this.life = config.boom_time;
    }

    update() {
        this.life--;
        if (this.life < 0) {
            this.scene.removeElement(this);
        }
        // 添加小火花
        if (this.particles.length < this.numParticles) {
            const p = new Particle(this.game, this.x, this.y, this.scene);
            this.particles.push(p);
        }
        // 更新所有小火花
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.update();
            if (p.life < 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw() {
        //  画所有小火花
        for (let particle of this.particles) {
            particle.draw();
        }
    }
}

export default Boom;
