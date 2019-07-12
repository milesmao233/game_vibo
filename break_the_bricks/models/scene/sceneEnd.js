import { log } from "../../utils/utils.js";

import { SceneStart, Scene, SceneTitle } from "./index.js";

class SceneEnd extends Scene {
    constructor(game) {
        super(game);
        this.context = game.context;
        this.setup();
    }

    setup() {
        this.registerAction("r", () => {
            let s = new SceneStart(this.game);
            this.game.replaceScene(s);
        });
        this.registerAction("t", () => {
            let s = new SceneTitle(this.game);
            this.game.replaceScene(s);
        });
    }

    draw() {
        this.context.clearRect(
            0,
            0,
            this.game.canvas.width,
            this.game.canvas.height
        );
        this.context.fillText("Game Over, 按R重新开始游戏 ", 180, 250);
        this.context.fillText("Game Over, 按T返回菜单 ", 180, 280);
    }

    update() {}
}

export default SceneEnd;

// ******************
