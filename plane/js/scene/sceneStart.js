import { log } from "../../utils.js";
import { Scene, SceneEnd } from "./index.js";
import { ImageMain } from "../image_model/index.js";
import { Player, Enemy } from "../image_model/index.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.enemies = [];
        this.bullets = [];
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

    update() {
        super.update();

        // bullet crash the enemy
        for (let enemy of this.enemies) {
            for (let bullet of this.bullets) {
                if (enemy.collide(bullet)) {
                    enemy.kill();
                    bullet.kill();
                    enemy.boom();
                }
            }
        }

        // gameover parts
        for (let enemy of this.enemies) {
            if (enemy.collide(this.player)) {
                const s = new SceneEnd(this.game);
                this.game.replaceScene(s);
            }
        }
    }
}

export default SceneStart;
