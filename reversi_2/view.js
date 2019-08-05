class View {
    constructor(container, game) {
        this.container = container;
        this.game = game;
        this.setFrame();
    }

    setFrame() {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let element = document.createElement("section");
                element.setAttribute("class", "block");
                element.setAttribute("data-offset", `${y}${x}`);
                this.container.appendChild(element);
            }
            this.container.appendChild(document.createElement("br"));
        }

        // 悔棋部分
        let regret = document.createElement("button");
        regret.setAttribute("class", "regret");
        regret.innerText = "悔棋";
        this.container.appendChild(regret);

        this.game.bindEventClickEvent(this);
    }

    render() {
        let disc;
        let board = this.game.pattern.board;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (board[y][x] != 0) {
                    if (board[y][x] == 1) {
                        disc = this._addDisc("white");
                    }
                    if (board[y][x] == 2) {
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
}
