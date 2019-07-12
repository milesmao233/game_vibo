import { ImageMain } from "./index.js";

class Arrow extends ImageMain {
    constructor(game) {
        super(game, "arrow");
        this.setup();
    }

    setup() {
        this.choice = "start";
        this.w = 30;
        this.h = 30;
    }

    moveDown() {
        this.y = 280;
        this.choice = "about";
    }

    moveUp() {
        this.y = 230;
        this.choice = "start";
    }
}

export default Arrow;
