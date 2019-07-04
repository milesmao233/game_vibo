class SmallGame {
  constructor(context, blocks) {
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.blocks = blocks;
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

  changeLevel(blocks) {
    this.blocks = [...blocks];
  }
}

export default SmallGame;
