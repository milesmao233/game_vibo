import { ImageMain, Label } from "../image_model/index.js";
import { SceneStart, Scene } from "../scene/index.js";

class SceneEnd extends Scene {
    constructor(game, score) {
        super(game);
        this.score = score;
        this.setup();
    }
    setup() {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.title = new ImageMain(this.game, "title", null, null, 160);
        this.addElement(this.title);
        this.end = new ImageMain(this.game, "end", null, null, 150, 200);
        this.addElement(this.end);

        this.playButton = new ImageMain(
            this.game,
            "button_play",
            null,
            null,
            190,
            300
        );
        this.addElement(this.playButton);

        this.labelStart = new Label(
            this.game,
            "按K重新开始游戏",
            "start",
            170,
            400
        );
        this.addElement(this.labelStart);

        this.labelScore = new Label(
            this.game,
            `Score: ${this.score}`,
            "score",
            200,
            450
        );
        this.addElement(this.labelScore);

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

export default SceneEnd;
