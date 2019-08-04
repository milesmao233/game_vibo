class Game {
    constructor() {
        this.setup();
    }

    setup() {
        this.color = 2;
        this.board = [
            [1, 1, 1, 2, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
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
                        disc = this._addDisc("white");
                    }
                    if (this.board[y][x] == 2) {
                        disc = this._addDisc("black");
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

    _addDisc(color) {
        let disc = document.createElement("section");
        disc.setAttribute("class", `disc disc-${color}`);
        return disc;
    }

    run() {
        // log("this.board3", this.board);
        // let ai = new AI(this.board);
        // ai.computeAI();

        this.bindClickEvents();
    }

    bindClickEvents() {
        // 点击事件中是整体的循环，里有update 和 render
        let blocks = es(".block");
        for (let block of blocks) {
            bindEvent(block, "click", () => {
                let [oy, ox] = block.dataset.offset.split("");
                oy = Number(oy);
                ox = Number(ox);
                this.updateBoard(oy, ox);
                this.render();

                // check pass 是否有地方下子， 没有地方就pass
                this.checkPass();

                // 删除这个点击处的AI信息，重新计算下一个颜色的AI
                // delete this.AIData[[ox, oy]];
                // this.computeAI();

                // let dataNow = this._computeWhiteAndBlockNumber(this.board);
                // log("点击后目前的数据", dataNow);
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

    checkPass() {
        if (!this.checkBoard()) {
            this.color = 3 - this.color;
            if (!this.checkBoard()) {
                console.log("Game Over");
            }
        }
    }

    // 检查是否有地方落子
    checkBoard() {
        this.canDropDiscCheck = false;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] == 0) {
                    this.discCombine(y, x, true);
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

                // 检查边界
                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    break;
                }
                if (this.board[y][x] === 3 - this.color) {
                    hasOpposite = true;
                }
                // 与落子的颜色相同， 前面又有不同的 可以落子
                if (this.board[y][x] === this.color) {
                    if (hasOpposite) {
                        directionCanChange = true;
                        // 只是检查棋盘
                        if (checkBoard) {
                            this.canDropDiscCheck = true;
                        }

                        // 可以落子改变Board
                        else {
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

            // 不是checkboard、 不是检查AI的时候，改变board数据
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
