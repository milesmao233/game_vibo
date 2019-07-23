class Game {
    constructor() {
        this.setup();
    }

    setup() {
        this.color = 2;
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.canDropDisc = false;
        this.canDropDiscCheck = false;
        this.setFrame();
        this.render();
    }

    setFrame() {
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

    run() {
        this.bindClickEvents();
    }

    bindClickEvents() {
        // 点击事件中是整体的循环，里有update 和 render
        let blocks = es(".block");
        for (let block of blocks) {
            bindEvent(block, "click", () => {
                let [oy, ox] = block.dataset.offset.split("");
                oy = parseInt(oy);
                ox = parseInt(ox);
                this.updateBoard(oy, ox);
                this.render();

                if (!this.checkBoard()) {
                    this.color = 3 - this.color;
                    if (!this.checkBoard()) {
                        console.log("Game Over");
                    }
                }
            });
        }
    }

    updateBoard(y, x) {
        if (this.board[y][x] !== 0) {
            log("有棋子占据该位置");
            return;
        } else {
            // 吃子, 改变board数据
            this.discCombine(y, x);
            // 判断落子规则
            if (!this.canDropDisc) {
                log("这个位置落子不符合规则");
                return;
            }
            // 落子，改变Board数据
            this.board[y][x] = this.color;

            // 落子初始化
            this.canDropDisc = false;
            // 改变下一颗棋子颜色
            this.color = 3 - this.color;
        }
    }

    checkBoard() {
        this.canDropDiscCheck = false;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] == 0) {
                    this.discCombine(x, y, true);
                }
            }
        }
        return this.canDropDiscCheck;
    }

    discCombine(y, x, checkBoard = false) {
        let directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
                [0, -1],
                [1, -1],
                [1, 0],
                [1, 1]
            ],
            ox = x,
            oy = y;

        for (let direction of directions) {
            let moveX = direction[0],
                moveY = direction[1],
                hasOpposite = false,
                directionCanChange = false;

            while (true) {
                // 每个direction 初始化点击的x, y
                if (!hasOpposite) {
                    x = ox;
                    y = oy;
                }
                x += moveX;
                y += moveY;

                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    break;
                }
                if (this.board[y][x] === 3 - this.color) {
                    hasOpposite = true;
                }
                // 与落子的颜色相同， 前面又有不同的开始吃子
                if (this.board[y][x] === this.color) {
                    if (hasOpposite) {
                        directionCanChange = true;
                        if (checkBoard) {
                            this.canDropDiscCheck = true;
                        } else {
                            this.canDropDisc = true;
                        }
                    }
                    break;
                }
                // 碰到没有黑白的跳出
                if (this.board[y][x] === 0) {
                    break;
                }
            }

            // 是checkboard的时候，不改变board数据
            if (directionCanChange && !checkBoard && this.canDropDisc) {
                while (true) {
                    x -= moveX;
                    y -= moveY;
                    if (x == ox && y === oy) break;
                    this.board[y][x] = this.color;
                }
            }
        }
    }
}
