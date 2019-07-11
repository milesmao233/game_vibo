import Item from "./item.js";
import { log } from "../../utils/utils.js";

class Arrow extends Item {
    constructor(name, image, x, y, offsetX, offsetY, choice) {
        super(name, image, x, y);
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.choice = choice;
    }

    moveDown() {
        this.offsetY = 278;
        this.choice = "modify";
    }

    moveUp() {
        this.offsetY = 228;
        this.choice = "start";
    }
}

export default Arrow;
