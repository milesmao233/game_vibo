import levels from "../level.js";
import { Paddle, Ball, Block } from "../item/index.js";
import { Scene, SceneEnd } from "./index.js";
import { log } from "../../utils/utils.js";

class SceneStart extends Scene {
    constructor(game) {
        super(game);
        this.context = game.context;
        this.images = game.mages;
        this.score = 0;
        this.blocks = [];
        this.setup();
    }

    setup() {
        const paddleImage = this.game.images["paddle"];
        const ballImage = this.game.images["ball"];
        const blockImage = this.game.images["block"];
        const paddle = new Paddle("paddle", paddleImage, 200, 550, 8);
        const ball = new Ball("ball", ballImage, 230, 540, 8);
        const blocks = this.loadLevel(5, blockImage);
        this.ball = ball;
        this.paddle = paddle;
        this.blocks = blocks;

        window.addEventListener("keydown", event => {
            if (event.key == "p") {
                this.ball.pause();
                return;
            }
            if ("1234567".includes(event.key)) {
                let blocks = this.loadLevel(Number(event.key), blockImage);

                this.changeLevel(blocks);
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
        if (this.paddle.collide(this.ball)) this.ball.rebound();

        // ball touch the block
        this.blocks.forEach(block => {
            if (block.collide(this.ball)) {
                block.kill(this.game);
                this.ball.rebound();
                this.score += 100;
            }
        });
    }

    draw() {
        this.drawImage(this.ball);
        this.drawImage(this.paddle);

        this.blocks.forEach(block => {
            if (block.alive) {
                this.drawImage(block);
            }
        });
        this.context.fillText("分数: " + this.score, 10, 580);
    }

    changeLevel(blocks) {
        this.blocks = [...blocks];
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
                    x <= item.x + item.width &&
                    y >= item.y &&
                    y <= item.y + item.height
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
        ballSpeedControl.addEventListener("input", function(event) {
            const input = event.target.value;
            this.ball.speedX =
                this.ball.speedX > 0 ? Number(input) : -Number(input);
            this.ball.speedY =
                this.ball.speedY > 0 ? Number(input) : -Number(input);
        });
    }
}

export default SceneStart;

// ******************

// function loadLevel(n, image) {
//   n = n - 1;
//   var level = levels[n];
//   var blocks = level.map(block => {
//     var x = block[0];
//     var y = block[1];
//     var lives = block[2] || 1;
//     return new Block("block", image, x, y, lives);
//   });
//   return blocks;
// }

// function bindGameInputEvent(scene, paddle, ball) {
//   window.addEventListener("keydown", function(event) {
//     if (event.key == "p") {
//       ball.pause();
//       return;
//     }
//     if ("1234567".includes(event.key)) {
//       let blocks = loadLevel(Number(event.key), scene.images["block"]);
//       scene.changeLevel(blocks);
//       return;
//     }
//     scene.keydowns[event.key] = true;
//   });
//   window.addEventListener("keyup", function(event) {
//     scene.keydowns[event.key] = false;
//   });
//   mouse drag
//   mouseDragItem(scene);
//   const ballSpeedControl = document.querySelector("#id-input-ball-speed");
//   ballSpeedControl.addEventListener("input", function(event) {
//     const input = event.target.value;
//     ball.speedX = ball.speedX > 0 ? Number(input) : -Number(input);
//     ball.speedY = ball.speedY > 0 ? Number(input) : -Number(input);
//   });
//   record the press key into game object
//   scene.registerAction("a", function() {
//     paddle.moveLeft();
//     if (!ball.fired) ball.moveLeft();
//     // TODO
//   });
//   scene.registerAction("d", function(screenWidth) {
//     paddle.moveRight(screenWidth);
//     if (!ball.fired) ball.moveRight(screenWidth);
//     // TODO
//   });
//   scene.registerAction("f", function() {
//     ball.fire();
//   });
// }

// function runloop(game, scene, paddle, ball, canvas) {
//   runGameActions(scene, canvas);

//   // update
//   updateEvents(game, scene, ball, paddle, canvas);
//   // clear
//   scene.context.clearRect(0, 0, canvas.width, canvas.height);
//   // draw
//   reDrawGame(scene, paddle, ball);
// }

// function mouseDragItem(scene) {
//   // distanceX: distanceX(dragPointX, itemPointX)
//   let enableDrag = false,
//     dragItem,
//     distanceX,
//     distanceY;

//   window.addEventListener("mousedown", function(event) {
//     // click if in the item area
//     let x = event.offsetX;
//     let y = event.offsetY;
//     let canDragItems = Array.from([...scene.items, ...scene.blocks]);
//     if (beInArea(x, y, canDragItems)) {
//       enableDrag = true;
//       distanceX = dragItem.x - x;
//       distanceY = dragItem.y - y;
//     }
//   });

//   window.addEventListener("mousemove", function(event) {
//     let x = event.offsetX;
//     let y = event.offsetY;
//     if (enableDrag) {
//       dragItem.x = x + distanceX;
//       dragItem.y = y + distanceY;
//     }
//   });

//   window.addEventListener("mouseup", function(event) {
//     enableDrag = false;
//   });

//   function beInArea(x, y, items) {
//     const filter = items.filter(item => {
//       return (
//         x >= item.x &&
//         x <= item.x + item.width &&
//         y >= item.y &&
//         y <= item.y + item.height
//       );
//     });
//     if (filter.length == 1) {
//       dragItem = filter[0];
//       return true;
//     }
//   }
// }

// function runGameActions(scene, canvas) {
//   var actions = Object.keys(scene.actions);
//   for (var i = 0; i < actions.length; i++) {
//     var key = actions[i];
//     // log('g.keydowns[key]', g.keydowns[key])
//     if (scene.keydowns[key]) {
//       scene.actions[key](canvas.width);
//     }
//   }
// }

// function updateEvents(game, scene, ball, paddle, canvas) {
//   // game over
//   if (ball.y > paddle.y) {
//     game.gameScene = game.scene.end;
//   }
//   // pause
//   if (ball.paused) {
//     return;
//   }

//   // ball move
//   ball.move();

//   // ball touch the paddle
//   if (paddle.collide(ball)) ball.rebound();

//   // ball touch the block
//   scene.blocks.forEach(block => {
//     if (block.collide(ball)) {
//       block.kill(game);
//       ball.rebound();
//     }
//   });
// }

// function reDrawGame(scene, ball, paddle) {
//   scene.draw(Array.from([paddle, ball]));
//   scene.blocks.forEach(block => {
//     if (block.alive) {
//       scene.draw(Array.from([block]));
//     }
//   });
//   scene.context.fillText("分数: " + scene.score, 10, 580);
// }
