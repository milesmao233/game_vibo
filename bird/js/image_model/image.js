import { log } from "../../utils.js";
class ImageMain {
    constructor(game, name, w, h, x, y) {
        this.game = game;
        this.name = name;
        this.scene = null;
        this.id = null;
        this.image = game.textureByName(name);
        this.w = w || this.image.width;
        this.h = h || this.image.height;
        this.x = x || 0;
        this.y = y || 0;
    }

    draw() {
        this.scene.drawImage(this);
    }

    update() {}
}

export default ImageMain;
