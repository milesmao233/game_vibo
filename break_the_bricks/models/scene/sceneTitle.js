import { Arrow } from "../item/index.js";
import { log } from "../../utils/utils.js";
import { Scene, SceneStart, SceneModify } from "./index.js";

class SceneTitle extends Scene {
    constructor(game) {
        super(game);
        this.setup();
    }

    setup() {
        this.canvas = this.game.canvas;
        this.context = this.game.context;
        this.images = this.game.images;
        const arrowImage = this.game.images["arrow"];
        this.arrow = new Arrow(
            "arrow",
            arrowImage,
            200,
            550,
            192,
            228,
            "start"
        );

        // 绑定input
        this.registerAction("ArrowDown", () => {
            this.arrow.moveDown();
        });

        this.registerAction("ArrowUp", () => {
            this.arrow.moveUp();
        });

        this.registerAction("Enter", () => {
            if (this.arrow.choice == "start") {
                const s = new SceneStart(this.game);
                this.game.replaceScene(s);
            }
            // TODO Modify Part
            else if (this.arrow.choice == "modify") {
                const s = new SceneModify(this.game, 1);
                this.game.replaceScene(s);
            }
        });
    }

    draw() {
        this.context.font = "normal 20px Verdana";
        this.context.fillText("开始游戏 ", 230, 250);
        this.context.fillText("编辑关卡 ", 230, 300);
        this.context.drawImage(
            this.arrow.image,
            this.arrow.offsetX,
            this.arrow.offsetY,
            30,
            30
        );
    }
}

export default SceneTitle;

// ******************
