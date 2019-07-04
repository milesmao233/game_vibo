var imageFromPath = function(path) {
  var img = new Image();
  img.src = path;
  return img;
};

class Item {
  constructor(path, x, y, speed) {
    this.image = imageFromPath(path);
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.x < 0) this.x = 0;
  }

  moveRight(screenWidth) {
    this.x += this.speed;
    if (this.x > screenWidth - this.image.width)
      this.x = screenWidth - this.image.width;
  }
}

export default Item;
