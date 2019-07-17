class Game {
    constructor(images) {
        this.canvas = document.querySelector("#id-canvas");
        this.context = this.canvas.getContext("2d");
        this.images = images;
        this.scene = null;
    }

    runWithScene(scene) {
        this.scene = scene;
        setTimeout(() => {
            this.runloop();
        }, 1000 / 30);
    }

    runloop() {
        this.runInputActions();
        this.update();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();

        setTimeout(() => {
            this.runloop();
        }, 1000 / 30);
    }

    // run Input Actions
    runInputActions() {
        this.scene.runInputActions();
    }

    // update
    update() {
        this.scene.update();
    }
    // draw
    draw() {
        this.scene.draw();
    }

    replaceScene(scene) {
        this.scene = scene;
    }

    textureByName(name) {
        var img = this.images[name];
        return img;
    }

    loadImages() {
        let s = [];
        let names = [];
        for (let i in this.images) {
            s.push(this.getImages(this.images[i]));
            names.push(i);
        }
        return Promise.all(s).then(values => {
            for (let i = 0; i < values.length; i++) {
                this.images[names[i]] = values[i];
            }
            return this;
        });
    }

    getImages(path) {
        const p = new Promise((resolve, reject) => {
            let img = new Image();
            img.src = path;
            img.onload = function() {
                resolve(img);
            };
        });
        return p;
    }
}

export default Game;
