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
        // 点击事件中是整体的循环，里有update 和 render
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
        }

        // 吃子
        // 左横向吃子
        this.leftRowCombine(y, x);
        // 右横向吃子
        this.rightRowCombine(y, x);

        this.color = 3 - this.color;
    }

    leftRowCombine(y, x) {
        let hasOpposite = false;
        let canMove = false;
        let ox = x;
        x -= 1;
        while (x >= 0) {
            if (this.board[y][x] === 3 - this.color) {
                hasOpposite = true;
            }
            // 与落子的颜色相同， 前面又有不同的开始吃子
            if (this.board[y][x] === this.color) {
                if (hasOpposite) canMove = true;
                break;
            }
            // 碰到没有黑白的跳出
            if (this.board[y][x] === 0) {
                break;
            }
            x -= 1;
        }

        if (canMove) {
            while (x != ox) {
                this.board[y][x] = this.color;
                x++;
            }
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
                    } else {
                        element.replaceChild(disc, element.firstChild);
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

const __main = () => {
    const g = new Game();
    g.run();
};

__main();
