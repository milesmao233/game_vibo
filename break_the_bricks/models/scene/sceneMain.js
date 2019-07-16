import { e, log } from "../../utils/utils.js";
import { Block } from "../item/index.js";
import levels from "../level.js";
class Scene {
    constructor(game) {
        this.game = game;
        this.actions = {};
        this.keydowns = {};
        this.elements = [];
        this.levels = this.game.levels;
        this.modifyPage = false;

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
            element.draw();
        }
    }
    update() {
        for (let element of this.elements) {
            element.update();
        }
    }

    addElement(element) {
        element.scene = this;
        this.elements.push(element);
    }

    addElements(arr) {
        for (let element of arr) {
            element.scene = this;
            this.elements.push(element);
        }
    }

    addBlocks(arr) {
        for (let element of arr) {
            element.scene = this;
            if (element.alive) {
                this.elements.push(element);
            }
        }
    }

    removeElements(arr) {
        for (let a of arr) {
            let index = this.elements.findIndex(e => e.id === a.id);
            this.elements.splice(index, 1);
        }
    }

    drawImage(item) {
        this.context.drawImage(item.image, item.x, item.y, item.w, item.h);
    }

    registerAction(key, callback) {
        this.actions[key] = callback;
    }

    showOrHideModifyPage() {
        log("this.modifyPage", this.modifyPage);
        const modifyDiv = e(".modify-items-container");
        if (this.modifyPage) {
            modifyDiv.style.display = "block";
        } else {
            modifyDiv.style.display = "none";
        }
    }

    loadLevel(n) {
        n = n - 1;
        var level = levels[n];
        if (!level) {
            return [];
        }
        return level.map(block => {
            var x = block[0];
            var y = block[1];
            var lives = block[2] || 1;
            return new Block(this.game, x, y, lives);
        });
    }

    // loadLevel(n, image) {
    //     n = n - 1;
    //     var level = this.levels[n];
    //     if (!level) {
    //         return [];
    //     }
    //     var blocks = level.map(block => {
    //         var x = block[0];
    //         var y = block[1];
    //         var lives = block[2] || 1;
    //         return new Block("block", image, x, y, lives);
    //     });
    //     return blocks;
    // }
}

export default Scene;
