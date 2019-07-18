import { ImageMain, Bird, Ground, Pipes } from "../image_model/index.js";
import { Scene, SceneEnd } from "./index.js";
import { log } from "../../utils.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.score = 0;
        this.setup();
    }
    setup() {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.player = new Bird(this.game);
        this.addElement(this.player);

        this.ground = new Ground(this.game);
        this.addElement(this.ground);

        this.pipes = new Pipes(this.game);
        this.addElement(this.pipes);

        this.registerAction("a", () => {
            this.player.moveLeft();
        });
        this.registerAction("d", () => {
            this.player.moveRight();
        });
        this.registerAction("j", () => {
            this.player.jump();
        });
    }

    update() {
        super.update();

        this.birdCrash(this.pipes.pipes);
        this.birdCrash(this.ground.lands);
    }

    birdCrash(items) {
        for (let item of items) {
            if (this.player.collide(item)) {
                const s = new SceneEnd(this.game);
                this.game.replaceScene(s);
            }
        }
    }
}

export default SceneStart;
