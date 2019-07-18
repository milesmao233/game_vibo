import { ImageMain } from "../image_model/index.js";
import { SceneStart, Scene } from "../scene/index.js";

class SceneTitle extends Scene {
    constructor(game, type) {
        super(game);
        this.type = type || 1; // 根据类型显示画面
        this.setup();
    }
    setup(text) {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.title = new ImageMain(this.game, "title");
        this.addElement(this.title);
        if (this.type == 1) {
            this.ready = new ImageMain(
                this.game,
                "ready",
                null,
                null,
                150,
                250
            );
            this.addElement(this.ready);
        } else {
            this.end = new ImageMain(this.game, "end", null, null, 150, 250);
            this.addElement(this.end);
        }
        this.registerAction("k", () => {
            let s = new SceneStart(this.game);
            this.game.replaceScene(s);
        });
    }
}

export default SceneTitle;
