import { log } from "../../utils.js";
class ImageMain {
    constructor(game, name) {
        this.game = game;
        this.scene = null;
        this.id = null;
        this.name = name;
        this.image = game.textureByName(name);
        this.x = 0;
        this.y = 0;
        this.w = this.image.width;
        this.h = this.image.height;
    }

    draw() {
        this.scene.drawImage(this);
    }

    update() {}
}

export default ImageMain;
