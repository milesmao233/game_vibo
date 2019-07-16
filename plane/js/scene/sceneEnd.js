import { log } from "../../utils.js";

import { SceneStart, Scene, SceneTitle } from "./index.js";
import { Label } from "../image_model/index.js";

class SceneEnd extends Scene {
    constructor(game) {
        super(game);
        this.setup();
        this.setupInputs();
    }

    setup() {
        const labelRestart = new Label(
            this.game,
            "Game Over, 按R重新开始游戏",
            "restart",
            100,
            250
        );
        const labelBack = new Label(
            this.game,
            "Game Over, 按T返回菜单",
            "back",
            100,
            300
        );
        this.addElement(labelRestart);
        this.addElement(labelBack);
    }

    setupInputs() {
        this.registerAction("r", () => {
            let s = new SceneStart(this.game);
            this.game.replaceScene(s);
        });
        this.registerAction("t", () => {
            let s = new SceneTitle(this.game);
            this.game.replaceScene(s);
        });
    }
}

export default SceneEnd;

// ******************
