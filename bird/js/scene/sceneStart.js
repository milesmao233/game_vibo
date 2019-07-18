import { ImageMain, Bird, Ground, Pipes } from "../image_model/index.js";
import Scene from "./sceneMain.js";
import { log } from "../../utils.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.setup();
    }
    setup() {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.player = new Bird(this.game);
        this.addElement(this.player);

        this.grounds = new Ground(this.game);
        this.addElement(this.grounds);

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
        this.registerAction("p", () => {
            if (this.wait) return;
            this.wait = true;
            this.play = !this.play;
            setTimeout(() => {
                this.wait = false;
            }, 300);
        });
    }
}

export default SceneStart;
