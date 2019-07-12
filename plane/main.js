import Game from "./js/game.js";
import { SceneTitle } from "./js/scene/index.js";
import { log, es, bindAll } from "./utils.js";
import config from "./js/config.js";

const showPageData = () => {
    const ops = es(".auto-slider");
    for (let operation of ops) {
        let type = operation.dataset.type;
        let configData = config[type];
        operation.value = configData;
        operation
            .closest("label")
            .querySelector(".speed-label").innerText = configData;
    }
};

const bindPageEvents = () => {
    bindAll(".auto-slider", "input", event => {
        const target = event.target;
        let value = target.value;
        let type = target.dataset.type;
        config[type] = Number(value);

        let label = target.closest("label").querySelector(".speed-label");
        label.innerText = value;
    });
};

const __main = () => {
    const images = {
        bg: "img/background.png",
        player: "img/hero2.png",
        enemy0: "img/enemy0.png",
        enemy1: "img/enemy1.png",
        enemy2: "img/enemy2.png",
        bullet: "img/bullet.png",
        bullet2: "img/bullet2.png",
        particle: "img/particle.png",
        arrow: "img/arrow.png"
    };

    const game = new Game(images);

    game.loadImages().then(g => {
        let s = new SceneTitle(g);
        game.runWithScene(s);
    });

    showPageData();
    bindPageEvents();
};

__main();
