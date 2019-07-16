import { Arrow, Label } from "../item/index.js";
import { log } from "../../utils/utils.js";
import { Scene, SceneStart, SceneModify } from "./index.js";

class SceneTitle extends Scene {
    constructor(game) {
        super(game);
        this.setup();
        this.setupInputs();
    }

    setup() {
        this.canvas = this.game.canvas;
        this.context = this.game.context;
        this.arrow = new Arrow(this.game);
        this.addElement(this.arrow);

        const labelStart = new Label(this.game, "开始游戏 ", "start", 230, 250);
        const labelModify = new Label(
            this.game,
            "编辑关卡 ",
            "modify",
            230,
            300
        );

        this.addElement(labelStart);
        this.addElement(labelModify);
        this.showOrHideModifyPage();
    }

    setupInputs() {
        // 绑定input
        this.registerAction("s", () => {
            this.arrow.moveDown();
        });

        this.registerAction("w", () => {
            this.arrow.moveUp();
        });

        this.registerAction("j", () => {
            if (this.arrow.choice === "start") {
                const s = new SceneStart(this.game);
                this.game.replaceScene(s);
            }
            // TODO Modify Part
            else if (this.arrow.choice === "modify") {
                const s = new SceneModify(this.game, 1);
                log("s", s);
                this.game.replaceScene(s);
            }
        });
    }
}

export default SceneTitle;

// ******************
