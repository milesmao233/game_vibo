class AI {
    constructor(board) {
        this.board = board;
        this.color = 2;
        this.AIData = {};
        this.fakeBoardCheck = null;
        this.fakeBoard = [];

        this.setup();
    }

    // 检查是否有地方落子
    checkBoard(board) {
        this.canDropDiscCheck = false;
        this.checkBoardWhetherDrop(y, x, board, true);

        return this.canDropDiscCheck;
    }

    setup() {
        this.computeAI(this.board);
        if (this.canDropDiscCheck) {
            this.color = 3 - this.color;
        }

        this.fakeBoard.forEach(board => {
            this.computeAI(board);
        });
        log("fakeboard", this.fakeBoard);
        // this.computeAI(this.fakeBoard);
        this.fakeBoard.forEach(board => {
            log("board", board);
            log(this._computeWhiteAndBlackNumber(board));
        });
        // log("AIData", this.AIData);
    }

    computeAI(board) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (board[y][x] == 0) {
                    log("空白的位置", x, y);
                    this.simulateClick(y, x, board);
                    this.fakeBoardCheck[y][x] = this.color;

                    // this.AIData[[x, y]] = this._computeWhiteAndBlackNumber(
                    //     this.fakeBoardCheck
                    // );

                    this.fakeBoard.push(this.fakeBoardCheck);
                }
            }
        }
        // log("AIData", this.AIData);
    }

    simulateClick(y, x, board, checkBoard = false) {
        this.fakeBoardCheck = JSON.parse(JSON.stringify(board));
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
                if (this.fakeBoardCheck[y][x] === 3 - this.color) {
                    hasOpposite = true;
                }
                // 与落子的颜色相同， 前面又有不同的 可以落子
                if (this.fakeBoardCheck[y][x] === this.color) {
                    if (hasOpposite) {
                        directionCanChange = true;
                        if (checkBoard) {
                            this.canDropDiscCheck = true;
                        }
                    }
                    break;
                }
                // 碰到没有黑白的跳出
                if (this.fakeBoardCheck[y][x] === 0) {
                    break;
                }
            }

            if (directionCanChange) {
                while (true) {
                    x -= moveX;
                    y -= moveY;
                    if (x == ox && y === oy) break;
                    this.fakeBoardCheck[y][x] = this.color;
                }
                return this.fakeBoardCheck;
            }
        }
    }

    checkBoardWhetherDrop(y, x, board, checkBoard = false) {
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
                if (board[y][x] === 3 - this.color) {
                    hasOpposite = true;
                }
                // 与落子的颜色相同， 前面又有不同的 可以落子
                if (board[y][x] === this.color) {
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
                if (board[y][x] === 0) {
                    break;
                }
            }
        }
    }

    _computeWhiteAndBlackNumber(arr) {
        let blackNum = 0,
            whiteNum = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (arr[y][x] == 2) {
                    blackNum++;
                } else if (arr[y][x] == 1) {
                    whiteNum++;
                }
            }
        }

        return {
            blackNum,
            whiteNum
        };
    }
}
