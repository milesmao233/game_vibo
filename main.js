import { Game } from "./models/index.js";
import { SceneTitle } from "./models/scene/index.js";

const __main = () => {
    const images = {
        ball: "img/ball.png",
        paddle: "img/paddle.png",
        block: "img/block.png",
        arrow: "img/arrow.png"
    };

    const game = new Game(images);

    game.loadImages().then(g => {
        let s = new SceneTitle(g);
        game.runWithScene(s);
    });
};

__main();
