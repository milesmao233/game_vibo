import { e, log } from "../../utils/utils.js";
import { Block } from "../item/index.js";
import { SceneStart, Scene, SceneTitle } from "./index.js";
import levels from "../level.js";

class SceneModify extends Scene {
    constructor(game, level) {
        super(game);
        this.context = game.context;
        this.level = level;
        this.blocks = [];
        this.blockImage = this.game.images["block"];
        this.clicks = [];
        this.setup();

        this.game.canvas.addEventListener("click", event => {
            let clickX = event.offsetX;
            let clickY = event.offsetY;
            const lives = Number(e("#life-select").value);
            this.clicks.push([clickX, clickY, lives]);

            let block = new Block(
                "block",
                this.blockImage,
                clickX,
                clickY,
                lives
            );
            this.blocks.push(block);
        });
    }

    setup() {
        // 显示编辑页面
        const modifyDiv = e(".modify-items-container");
        modifyDiv.style.display = "block";

        // 显示砖块
        let blocks = this.loadLevel(this.level, this.blockImage);
        this.blocks = blocks;

        // 绑定完成和取消事件
        const cancel = e(".btn-cancel");
        cancel.addEventListener("click", () => {
            let s = new SceneTitle(this.game);
            this.game.replaceScene(s);
        });

        const complete = e(".btn-complete");
        complete.addEventListener("click", () => {
            this.game.levels[this.level - 1].push(...this.clicks);
            let s = new SceneTitle(this.game);
            this.game.replaceScene(s);
        });
    }

    draw() {
        this.blocks.forEach(block => {
            this.drawImage(block);
        });
    }

    update() {
        let input = e("#editor-input");
        input.addEventListener("input", () => {
            let level = input.value;
            let s = new SceneModify(this.game, level);
            this.game.replaceScene(s);
        });
    }
}

export default SceneModify;

// ******************
