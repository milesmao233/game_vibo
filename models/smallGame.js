class SmallGame {
  constructor(context) {
    this.context = context;
    this.actions = {};
    this.keydowns = {};
  }

  drawImage(item) {
    this.context.drawImage(item.image, item.x, item.y);
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  draw(items) {
    for (let item of items) {
      this.drawImage(item);
    }
  }
}

export default SmallGame;
