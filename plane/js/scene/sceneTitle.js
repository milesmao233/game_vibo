import { Arrow, Label, Boom } from "../image_model/index.js";
import { log } from "../../utils.js";
import { Scene, SceneStart } from "./index.js";

class SceneTitle extends Scene {
    constructor(game) {
        super(game);
        this.setup();
        this.setupInputs();
    }

    setup() {
        this.arrow = new Arrow(this.game);
        this.arrow.x = 200;
        this.arrow.y = 230;
        const labelStart = new Label(this.game, "开始游戏", 230, 250);
        const labelAbout = new Label(this.game, "帮助说明", 230, 300);
        this.addElement(this.arrow);
        this.addElement(labelStart);
        this.addElement(labelAbout);

        this.boom = new Boom(this.game);
        this.addElement(this.boom);
    }

    setupInputs() {
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
            // TODO about Part
            else if (this.arrow.choice == "about") {
                //
            }
        });
    }
}

export default SceneTitle;

// ******************