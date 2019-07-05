class SceneEnd {
  constructor(context) {
    this.context = context;
  }

  run(canvas) {
    this.draw(canvas);
  }

  draw(canvas) {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.fillText("游戏结束 ", 100, 280);
  }
}

export default SceneEnd;

// ******************
