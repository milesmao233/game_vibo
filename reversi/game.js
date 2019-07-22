class Game {
    constructor() {
        this.color = 1;
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.setup();
    }

    setup() {
        this.addFrame();
    }

    run() {
        this.bindClickEvents();
    }

    addFrame() {
        let container = e("#container");
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let element = document.createElement("section");
                element.setAttribute("class", "block");
                element.setAttribute("data-offset", `${y}${x}`);
                container.appendChild(element);
            }
            container.appendChild(document.createElement("br"));
        }
    }

    bindClickEvents() {
        let blocks = es(".block");
        for (let block of blocks) {
            bindEvent(block, "click", () => {
                let [oy, ox] = block.dataset.offset.split("");
                this.update(oy, ox);
                this.render();
            });
        }
    }

    update(y, x) {
        if (this.board[y][x] !== 0) {
            return;
        } else {
            this.board[y][x] = this.color;
            this.color = 3 - this.color;
        }
    }

    render() {
        let disc;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] != 0) {
                    if (this.board[y][x] == 1) {
                        disc = this.addDisc("white");
                    }
                    if (this.board[y][x] == 2) {
                        disc = this.addDisc("black");
                    }
                    let element = e(`.block[data-offset= '${y}${x}']`);
                    if (!element.firstChild) {
                        element.appendChild(disc);
                    }
                }
            }
        }
    }

    addDisc(color) {
        let disc = document.createElement("section");
        disc.setAttribute("class", `disc disc-${color}`);
        return disc;
    }
}
