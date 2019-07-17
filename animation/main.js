import Game from "./js/game.js";
import { SceneAnimation } from "./js/scene/index.js";
import { log, es, bindAll, e } from "./utils.js";

const __main = () => {
    const generateImages = () => {
        let images = {};
        for (let i = 1; i < 11; i++) {
            images[`idle-${i}`] = `img/idle-${i}.png`;
        }
        for (let i = 1; i < 9; i++) {
            images[`run-${i}`] = `img/run-${i}.png`;
        }
        return images;
    };

    const images = generateImages();

    const game = new Game(images);

    game.loadImages().then(g => {
        let s = new SceneAnimation(g);
        game.runWithScene(s);
    });
};

__main();
