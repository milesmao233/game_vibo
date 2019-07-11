import { log } from "../../utils/utils.js";
import { Block } from "../item/index.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.actions = {};
        this.keydowns = {};
        this.levels = this.game.levels;

        window.addEventListener("keydown", event => {
            this.keydowns[event.key] = true;
        });
        window.addEventListener("keyup", event => {
            this.keydowns[event.key] = false;
        });
    }
    runInputActions() {
        const actions = Object.keys(this.actions);
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i];
            if (this.keydowns[key]) {
                this.actions[key](this.game.canvas.width);
            }
        }
    }

    drawImage(item) {
        this.context.drawImage(item.image, item.x, item.y);
    }

    draw() {}
    update() {}

    registerAction(key, callback) {
        this.actions[key] = callback;
    }

    loadLevel(n, image) {
        n = n - 1;
        var level = this.levels[n];
        if (!level) {
            return [];
        }
        var blocks = level.map(block => {
            var x = block[0];
            var y = block[1];
            var lives = block[2] || 1;
            return new Block("block", image, x, y, lives);
        });
        return blocks;
    }
}

export default Scene;
