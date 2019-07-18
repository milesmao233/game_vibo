import ImageMain from "./image.js";
import { log } from "../../utils.js";

class Land extends ImageMain {
    constructor(game, w, h, ground) {
        super(game, "land", w, h);
        this.x = 0;
        this.y = 670;
        this.ground = ground;
    }
}

class Ground {
    constructor(game) {
        this.game = game;
        this.setup();
    }

    setup() {
        this.lands = [];
        this.skipCount = 49;
        for (let i = 0; i < 4; i++) {
            let land = new Land(this.game, 240, 80, this);
            land.x = i * 240;
            this.lands.push(land);
        }
    }

    draw() {
        for (let l of this.lands) {
            this.scene.drawImage(l);
        }
    }

    update() {
        // grounds update
        this.skipCount--;
        let offset = -5;
        if (this.skipCount == 0) {
            this.skipCount = 49;
            offset = 240;
        }
        for (let i = 0; i < 4; i++) {
            let lands = this.lands;
            let g = lands[i];
            g.x += offset;
        }
    }
}

export default Ground;
