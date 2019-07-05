class SceneEnd {
  constructor(context) {
    this.context = context;
  }

  run() {
    setTimeout(() => {
      this.draw();
    }, 1000 / 30);
  }

  draw() {
    this.context.fillText("游戏结束 ", 100, 280);
  }
}

export default SceneEnd;

// ******************
