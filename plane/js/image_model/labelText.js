class Label {
    constructor(game, text, x, y) {
        this.game = game;
        this.text = text;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.game.context.font = "normal 20px Verdana";
        this.game.context.fillText(this.text, this.x, this.y);
    }

    update() {}
}

export default Label;
