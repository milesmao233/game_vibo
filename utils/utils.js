var e = sel => document.querySelector(sel);

var log = console.log.bind(console);

var imageFromPath = function(path) {
    var img = new Image();
    img.src = path;
    return img;
};

var rectIntersects = function(a, b) {
    // 思路： 中心点的距离，小于等于宽一半总和 / 长的一半总和

    let aMiddleX = a.x + a.width / 2,
        aMiddleY = a.y + a.height / 2,
        bMiddleX = b.x + b.width / 2,
        bMiddleY = b.y + b.height / 2;

    return (
        Math.abs(bMiddleX - aMiddleX) <= a.width / 2 + b.width / 2 &&
        Math.abs(bMiddleY - aMiddleY) <= a.height / 2 + b.height / 2
    );
};

class Image {
    constructor(game, name) {
        this.game = game;
        this.image = game.imageByName(name);
        this.x = 0;
        this.y = 0;
        this.w = this.image.width;
        this.h = this.image.height;
        this.life = 1;
    }
    draw() {
        if (this.life > 0) {
            this.game.drawImage(this);
        }
    }
    update() {}
}

export { e, log, imageFromPath, rectIntersects, Image };
