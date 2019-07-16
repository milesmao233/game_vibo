import { log } from "../../utils.js";

class Label {
    constructor(game, text, id, x, y) {
        this.game = game;
        this.text = text;
        this.x = x;
        this.y = y;
        this.id = id;
    }

    draw() {
        this.game.context.font = "normal 20px Verdana";
        this.game.context.fillText(this.text, this.x, this.y);
    }

    update() {
        if (this.id == "score") {
            this.text = `Score: ${this.scene.score}`;
        }
    }
}

export default Label;
