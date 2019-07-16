import levels from "../level.js";
import { Paddle, Ball, Block, Label } from "../item/index.js";
import { Scene, SceneEnd } from "./index.js";
import { log } from "../../utils/utils.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.context = game.context;
        this.score = 0;
        this.blocks = [];
        this.setup();
        this.setupInputs();
    }

    setup() {
        const paddle = new Paddle(this.game);
        const ball = new Ball(this.game);
        const blocks = this.loadLevel(5);
        this.ball = ball;
        this.paddle = paddle;
        this.blocks = blocks;

        this.addElement(ball);
        this.addElement(paddle);
        this.addBlocks(blocks);

        const labelScore = new Label(
            this.game,
            `分数: ${this.score}`,
            "score",
            10,
            580
        );
        this.addElement(labelScore);

        this.showOrHideModifyPage();
    }

    setupInputs() {
        window.addEventListener("keydown", event => {
            if (event.key == "p") {
                this.ball.pause();
                return;
            }
            if ("1234567".includes(event.key)) {
                let blocks = this.loadLevel(Number(event.key));
                this.removeElements(this.blocks);
                this.addElements(blocks);
                this.blocks = blocks;
                return;
            }
        });

        this.registerAction("a", () => {
            this.paddle.moveLeft();
            if (!this.ball.fired) this.ball.moveLeft();
            // TODO
        });

        this.registerAction("d", () => {
            this.paddle.moveRight(this.game.canvas.width);
            if (!this.ball.fired) {
                this.ball.moveRight(this.game.canvas.width);
            }
            // TODO
        });

        this.registerAction("f", () => {
            this.ball.fire();
        });

        this.mouseDragItem();

        this.changeBallSpeed();
    }

    update() {
        if (this.ball.y > this.paddle.y) {
            const s = new SceneEnd(this.game);
            this.game.replaceScene(s);
        }
        // pause
        if (this.ball.paused) {
            return;
        }

        // ball move

        this.ball.move();

        // ball touch the paddle
        if (this.paddle.collide(this.ball)) {
            this.ball.rebound();
        }

        // ball touch the block
        this.blocks.forEach(block => {
            if (block.collide(this.ball)) {
                block.kill(this.game);
                this.ball.rebound();
                this.score += 100;
            }
        });
    }

    mouseDragItem() {
        // distanceX: distanceX(dragPointX, itemPointX)
        let enableDrag = false,
            dragItem,
            distanceX,
            distanceY;

        this.game.canvas.addEventListener("mousedown", event => {
            // click if in the item area
            let x = event.offsetX;
            let y = event.offsetY;
            let canDragItems = Array.from([
                this.ball,
                this.paddle,
                ...this.blocks
            ]);
            if (beInArea(x, y, canDragItems)) {
                enableDrag = true;
                distanceX = dragItem.x - x;
                distanceY = dragItem.y - y;
            }
        });

        this.game.canvas.addEventListener("mousemove", event => {
            let x = event.offsetX;
            let y = event.offsetY;
            if (enableDrag) {
                dragItem.x = x + distanceX;
                dragItem.y = y + distanceY;
            }
        });

        this.game.canvas.addEventListener("mouseup", () => {
            enableDrag = false;
        });

        function beInArea(x, y, items) {
            const filter = items.filter(item => {
                return (
                    x >= item.x &&
                    x <= item.x + item.w &&
                    y >= item.y &&
                    y <= item.y + item.h
                );
            });
            if (filter.length == 1) {
                dragItem = filter[0];
                return true;
            }
        }
    }

    changeBallSpeed() {
        const ballSpeedControl = document.querySelector("#id-input-ball-speed");
        ballSpeedControl.addEventListener("input", event => {
            const input = event.target.value;
            this.ball.speedX =
                this.ball.speedX > 0 ? Number(input) : -Number(input);
            this.ball.speedY =
                this.ball.speedY > 0 ? Number(input) : -Number(input);
        });
    }
}

export default SceneStart;
