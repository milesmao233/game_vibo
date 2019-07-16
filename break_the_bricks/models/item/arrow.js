import ImageMain from "./image.js";
import { log, rectIntersects } from "../../utils/utils.js";

class Arrow extends ImageMain {
    constructor(game) {
        super(game, "arrow");
        this.setup();
    }

    setup() {
        this.x = 192;
        this.y = 228;
        this.choice = "start";
        this.w = 30;
        this.h = 30;
    }

    moveDown() {
        this.y = 278;
        this.choice = "modify";
    }

    moveUp() {
        this.y = 228;
        this.choice = "start";
    }
}

export default Arrow;
