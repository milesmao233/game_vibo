import { log } from "../../utils.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.context = game.context;
        this.actions = {};
        this.keydowns = {};
        this.levels = this.game.levels;
        this.elements = [];

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

    draw() {
        for (let element of this.elements) {
            // this.drawImage(element);
            element.draw();
        }
    }
    update() {
        for (let element of this.elements) {
            element.update();
        }
    }

    addElement(e) {
        e.scene = this;
        this.elements.push(e);
    }

    removeElement(element) {
        const index = this.elements.findIndex(e => e.id == element.id);
        if (index != -1) {
            this.elements.splice(index, 1);
        }
    }

    drawImage(item) {
        this.context.drawImage(item.image, item.x, item.y, item.w, item.h);
    }

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
