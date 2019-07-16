import { log } from "../../utils/utils.js";
class Label {
    constructor(game, text, id, x, y) {
        this.game = game;
        this.text = text;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.game.context.font = "normal 20px Verdana";
        this.game.context.fillText(this.text, this.x, this.y);
    }

    update() {
        if (this.id == "score") {
            this.text = `分数: ${this.scene.score}`;
        }
    }
}

export default Label;
