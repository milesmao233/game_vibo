import { log } from "../../utils/utils.js";

import { SceneStart, Scene, SceneTitle } from "./index.js";
import { Label } from "../item/index.js";

class SceneEnd extends Scene {
    constructor(game) {
        super(game);
        this.context = game.context;
        this.setup();
        this.setupInputs();
    }

    setup() {
        const labelRestart = new Label(
            this.game,
            "Game Over, 按R重新开始游戏 ",
            "restart",
            180,
            250
        );
        const labelBack = new Label(
            this.game,
            "Game Over, 按T返回菜单 ",
            "back",
            180,
            280
        );

        log("labelRestart", labelRestart);
        log("labelBack", labelBack);

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
