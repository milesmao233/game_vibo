class SceneEnd {
  constructor(game, context) {
    this.game = game;
    this.context = context;
  }

  run(canvas) {
    this.draw(canvas);
  }

  draw(canvas) {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.fillText("Game Over, 按R重新开始游戏 ", 180, 250);
    this.context.fillText("Game Over, 按T返回菜单 ", 180, 280);
  }

  bindEvents() {
    this.bindGameInputEvent();
  }

  bindGameInputEvent() {
    window.addEventListener("keydown", event => {
      // 重置

      if (event.key == "r") {
        for (let scene in this.game.scene) {
          this.game.scene[scene].bindEvents();
        }

        this.game.gameScene = this.game.scene.start;
      } else if (event.key == "t") {
        for (let scene in this.game.scene) {
          this.game.scene[scene].bindEvents();
        }

        this.game.gameScene = this.game.scene.title;
      }
    });
  }
}

export default SceneEnd;

// ******************
