import { ImageMain, Label } from "../image_model/index.js";
import { SceneStart, Scene } from "../scene/index.js";

class SceneTitle extends Scene {
    constructor(game, type) {
        super(game);
        this.setup();
    }
    setup() {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.title = new ImageMain(this.game, "title");
        this.addElement(this.title);
        this.end = new ImageMain(this.game, "end", null, null, 150, 250);
        this.addElement(this.end);

        this.playButton = new ImageMain(
            this.game,
            "button_play",
            null,
            null,
            190,
            350
        );
        this.addElement(this.playButton);

        this.labelStart = new Label(
            this.game,
            "按K重新开始游戏",
            "start",
            170,
            450
        );
        this.addElement(this.labelStart);

        // if (this.type == 1) {

        // } else {
        //     this.end = new ImageMain(this.game, "end", null, null, 150, 250);
        //     this.addElement(this.end);
        // }
        this.registerAction("k", () => {
            let s = new SceneStart(this.game);
            this.game.replaceScene(s);
        });
    }
}

export default SceneTitle;
