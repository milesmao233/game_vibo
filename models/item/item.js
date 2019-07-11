import { log } from "../../utils/utils.js";

class Item {
  constructor(name, image, x, y, speed) {
    this.name = name;
    this.image = image;
    this.width = image.width;
    this.height = image.height;
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
