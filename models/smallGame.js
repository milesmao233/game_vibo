import { SceneStart, SceneEnd, SceneTitle } from "./scene/index.js";
import { log } from "../utils.js";

class SmallGame {
  constructor(canvas, context, images) {
    this.canvas = canvas;
    this.context = context;
    this.images = images;
    this.gameScene = null;
    this.scene = {};
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
    let sceneTitle = new SceneTitle(
      this,
      this.canvas,
      this.context,
      this.images
    );
    let sceneStart = new SceneStart(this, this.context, this.images);
    let sceneEnd = new SceneEnd(this, this.context);
    this.scene = {
      title: sceneTitle,
      start: sceneStart,
      end: sceneEnd
    };
    this.gameScene = this.scene.title;

    sceneStart.bindEvents();
    sceneTitle.bindEvents();
    sceneEnd.bindEvents();

    // 根据状态改场景
    setInterval(() => {
      this.gameScene.run(canvas);
    }, 1000 / 30);
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
