import { SmallGame } from "./models/index.js";

const bindEvent = (game, canvas) => {
  game.loadImages().then(() => {
    game.runWithScene(canvas);
  });
};

const __main = () => {
  const canvas = document.querySelector("#id-canvas");
  const context = canvas.getContext("2d");

  const images = {
    ball: "img/ball.png",
    paddle: "img/paddle.png",
    block: "img/block.png",
    arrow: "img/arrow.png"
  };

  const game = new SmallGame(canvas, context, images);

  bindEvent(game, canvas);
};

__main();
