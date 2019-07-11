import { log } from "../../utils/utils.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.actions = {};
        this.keydowns = {};

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
    draw() {}
    update() {}

    registerAction(key, callback) {
        this.actions[key] = callback;
    }
}

export default Scene;
