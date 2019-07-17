import { Dinosaur } from "../image_model/index.js";
import { log } from "../../utils.js";
import Scene from "./sceneMain.js";

class SceneAnimation extends Scene {
    constructor(game) {
        super(game);
        this.setup();
        this.setupInputs();
    }

    setup() {
        this.dinosaur = new Dinosaur(this.game);
        this.addElement(this.dinosaur);
    }

    setupInputs() {
        this.registerAction("d", eventId => {
            this.dinosaur.move(8, eventId);
        });

        this.registerAction("a", eventId => {
            this.dinosaur.move(-8, eventId);
        });
    }
}

export default SceneAnimation;

// ******************
