import Game from "./js/game.js";
import { SceneAnimation } from "./js/scene/index.js";
import { log, es, bindAll, e } from "./utils.js";

const forLoopImg = (images, name, n) => {
    for (let i = 0; i < n; i++) {
        images[`${name}-${i + 1}`] = `img/${name}-${i + 1}.png`;
    }
};

const generateImages = () => {
    let images = {};
    forLoopImg(images, "idle", 10);
    forLoopImg(images, "run", 8);
    forLoopImg(images, "jump", 12);

    return images;
};

const pageDebug = () => {
    // debug the offsetX and offsetY
    e("canvas").addEventListener("click", event => {
        log(event.offsetX);
    });
};

const __main = () => {
    const images = generateImages();

    const game = new Game(images);

    game.loadImages().then(g => {
        let s = new SceneAnimation(g);
        game.runWithScene(s);
    });

    pageDebug();
};

__main();
