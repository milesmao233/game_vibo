import { log } from "../../utils.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.context = game.context;
        this.actions = {};
        this.keydowns = {};
        this.elements = [];

        window.addEventListener("keydown", event => {
            this.keydowns[event.key] = "keydown";
        });
        window.addEventListener("keyup", event => {
            this.keydowns[event.key] = "keyup";
        });
    }
    runInputActions() {
        const actions = Object.keys(this.actions);
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i];
            let status = this.keydowns[key];
            if (status) {
                this.actions[key](status);
                if (status == "keyup") {
                    this.keydowns[key] = null;
                }
            }
        }
    }

    draw() {
        for (let element of this.elements) {
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
}

export default Scene;
