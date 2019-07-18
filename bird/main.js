import Game from "./js/game.js";
import { SceneTitle } from "./js/scene/index.js";

const __main = () => {
    let images = {
        bg: "./img/bg_night.png",
        bird0: "./img/bird0_0.png",
        bird1: "./img/bird0_1.png",
        bird2: "./img/bird0_2.png",
        pipe: "./img/pipe_up.png",
        land: "./img/land.png",
        title: "./img/title.png",
        ready: "./img/text_ready.png",
        end: "./img/text_game_over.png"
    };
    const game = new Game(images);

    game.loadImages().then(g => {
        let s = new SceneTitle(g);
        game.runWithScene(s);
    });
};
__main();
