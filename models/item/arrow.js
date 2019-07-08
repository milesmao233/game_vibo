import Item from "./item.js";
import { log } from "../../utils.js";

class Arrow extends Item {
  constructor(name, image, x, y, offsetX, offsetY, choice) {
    super(name, image, x, y);
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.choice = choice;
  }
}

export default Arrow;
