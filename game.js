import { Block, SmallGame } from "./models/index.js";
import levels from "./models/level.js";
import { log } from "./utils.js";

const bindEvent = (game, canvas) => {
  game.loadImages().then(() => {
    game.bindEvents();
    game.run(canvas);
  });
};

const __main = () => {
  const canvas = document.querySelector("#id-canvas");
  const context = canvas.getContext("2d");

  const images = {
    ball: "ball.png",
    paddle: "paddle.png",
    block: "block.png"
  };

  const game = new SmallGame(context, images);

  bindEvent(game, canvas);
};

__main();
