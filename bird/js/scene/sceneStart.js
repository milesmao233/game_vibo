import { ImageMain, Bird, Ground, Pipes, Label } from "../image_model/index.js";
import { Scene, SceneEnd } from "./index.js";
import { log } from "../../utils.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.score = 0;
        this.setup();
    }
    setup() {
        this.bg = new ImageMain(this.game, "bg", 480, 750);
        this.addElement(this.bg);
        this.player = new Bird(this.game);
        this.addElement(this.player);

        this.ground = new Ground(this.game);
        this.addElement(this.ground);

        this.pipes = new Pipes(this.game);
        this.addElement(this.pipes);

        this.registerAction("a", () => {
            this.player.moveLeft();
        });
        this.registerAction("d", () => {
            this.player.moveRight();
        });
        this.registerAction("j", () => {
            this.player.jump();
        });

        this.labelAbout = new Label(
            this.game,
            "按J控制鸟跳跃, 按A鸟左移， 按D鸟右移",
            "about",
            0,
            20
        );

        this.addElement(this.labelAbout);

        this.labelScore = new Label(
            this.game,
            `Score: ${this.score}`,
            "score",
            15,
            720
        );
        this.addElement(this.labelScore);
        this.scoreCount = 6;
    }

    update() {
        super.update();

        this.birdCrash(this.pipes.pipes);
        this.birdCrash(this.ground.lands);

        this.birdGetScore(this.pipes.pipes);
    }

    birdCrash(items) {
        for (let item of items) {
            if (this.player.collide(item)) {
                const s = new SceneEnd(this.game, this.score);
                this.game.replaceScene(s);
            }
        }
    }

    birdGetScore(pipes) {
        for (let i = 1; i < pipes.length; i += 2) {
            let p = pipes[i];
            if (this.player.pass(p)) {
                this.scoreCount--;
                if (this.scoreCount == 0) {
                    this.score += 1;
                    this.scoreCount = 6;
                }
            }
        }
        // this.scoreCount = 10;
        // this.scoreCount--;
        // if (this.scoreCount == 0) {
        //     if (this.getScore) {
        //         this.game.score += 1;
        //         this.getScore = false;
        //     }
        // }
    }
}

export default SceneStart;
