import { Paddle, Ball, Block, Scene, SceneEnd } from "./index.js";
import { log } from "../utils.js";

class SmallGame {
  constructor(context, images) {
    this.context = context;
    this.images = images;
    this.gameOver = false;
  }

  loadImages() {
    let s = [];
    let names = [];
    for (let i in this.images) {
      s.push(getImages(this.images[i]));
      names.push(i);
    }
    return Promise.all(s).then(values => {
      for (let i = 0; i < values.length; i++) {
        this.images[names[i]] = values[i];
      }
    });
  }

  runWithScene(canvas) {
    let sceneEnd = new SceneEnd(this.context);
    let sceneStart = new Scene(this, this.context, this.images);
    sceneStart.bindEvents();

    setInterval(() => {
      if (this.gameOver) {
        sceneEnd.run();
      } else {
        sceneStart.run(canvas);
      }
    }, 1000 / 30);
  }

  bindEvents() {
    const paddleImage = this.images["paddle"];
    const ballImage = this.images["ball"];
    const blockImage = this.images["block"];

    const paddle = new Paddle("paddle", paddleImage, 200, 550, 8);
    const ball = new Ball("ball", ballImage, 230, 540, 8);

    const blocks = loadLevel(3, blockImage);
    this.blocks = blocks;

    this.items = [paddle, ball];
    bindGameInputEvent(this, paddle, ball);
  }
}

export default SmallGame;

// ********************************************************

function getImages(path) {
  const p = new Promise((resolve, reject) => {
    let img = new Image();
    img.src = path;
    img.onload = function() {
      resolve(img);
    };
  });

  return p;
}
