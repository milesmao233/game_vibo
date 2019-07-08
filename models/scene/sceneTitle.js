import { Arrow } from "../item/index.js";
import { log } from "../../utils.js";

class SceneTitle {
  constructor(game, canvas, context, images) {
    this.game = game;
    this.canvas = canvas;
    this.context = context;
    this.images = images;
    this.items = {};
    this.actions = {};
    this.keydowns = {};
  }

  bindEvents() {
    const arrowImage = this.images["arrow"];
    const arrow = new Arrow("arrow", arrowImage, 200, 550, 192, 228, "start");
    this.items = { arrow: arrow };

    this.bindGameInputEvent();
  }

  run() {
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = "normal 20px Verdana";
    this.context.fillText("开始游戏 ", 230, 250);
    this.context.fillText("编辑关卡 ", 230, 300);
    this.context.drawImage(
      this.items.arrow.image,
      this.items.arrow.offsetX,
      this.items.arrow.offsetY,
      30,
      30
    );
  }

  bindGameInputEvent() {
    window.addEventListener("keydown", event => {
      if (event.key == "ArrowDown") {
        this.items.arrow.offsetY = 278;
        this.items.arrow.choice = "modify";
        this.draw();
      } else if (event.key == "Enter") {
        if (this.items.arrow.choice == "start") {
          this.game.gameScene = this.game.scene.start;
        }
      }
    });

    window.addEventListener("keyup", event => {
      if (event.key == "ArrowUp") {
        this.items.arrow.offsetY = 228;
        this.items.arrow.choice = "start";
        this.draw();
      }
    });
  }
}

export default SceneTitle;

// ******************
