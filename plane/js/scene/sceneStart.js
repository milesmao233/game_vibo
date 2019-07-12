import { log } from "../../utils.js";
import { Scene } from "./index.js";
import { ImageMain } from "../image_model/index.js";
import { Player, Enemy } from "../image_model/index.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.enemies = [];
        this.setup();
        this.setupInputs();
    }

    setup() {
        this.numOfEnemies = 10;
        this.bg = new ImageMain(this.game, "bg");

        this.player = new Player(this.game);
        this.player.x = 200;
        this.player.y = 650;

        this.addElement(this.bg);
        this.addElement(this.player);
        //
        this.addEnemies();
    }

    setupInputs() {
        this.registerAction("a", () => {
            this.player.moveLeft();
        });
        this.registerAction("d", () => {
            this.player.moveRight();
        });
        this.registerAction("s", () => {
            this.player.moveUp();
        });
        this.registerAction("w", () => {
            this.player.moveDown();
        });
        this.registerAction("j", () => {
            this.player.fire();
        });
    }

    addEnemies() {
        for (let i = 0; i < this.numOfEnemies; i++) {
            let element = new Enemy(this.game);
            this.enemies.push(element);
            this.addElement(element);
        }
    }
}

export default SceneStart;
