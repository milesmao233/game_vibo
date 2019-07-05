import levels from "./level.js";
import { Paddle, Ball, Block } from "./index.js";

class Scene {
  constructor(game, context, images) {
    this.game = game;
    this.context = context;
    this.images = images;
    this.actions = {};
    this.keydowns = {};
    this.items = [];
    this.blocks = [];
    this.score = 0;
  }

  bindEvents() {
    const paddleImage = this.images["paddle"];
    const ballImage = this.images["ball"];
    const blockImage = this.images["block"];

    const paddle = new Paddle("paddle", paddleImage, 200, 550, 8);
    const ball = new Ball("ball", ballImage, 230, 540, 8);

    const blocks = loadLevel(3, blockImage);
    this.blocks = blocks;

    this.items = [paddle, ball];
    bindGameInputEvent(this, paddle, ball);
  }

  run(canvas) {
    let [paddle, ball] = [...this.items];
    runloop(this.game, this, paddle, ball, canvas);
  }

  drawImage(item) {
    this.context.drawImage(item.image, item.x, item.y);
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  draw(items) {
    for (let item of items) {
      this.drawImage(item);
    }
  }

  changeLevel(blocks) {
    this.blocks = [...blocks];
  }
}

export default Scene;

// ******************

function loadLevel(n, image) {
  n = n - 1;
  var level = levels[n];
  var blocks = level.map(block => {
    var x = block[0];
    var y = block[1];
    var lives = block[2] || 1;
    return new Block("block", image, x, y, lives);
  });
  return blocks;
}

function bindGameInputEvent(scene, paddle, ball) {
  window.addEventListener("keydown", function(event) {
    if (event.key == "p") {
      ball.pause();
      return;
    }
    if ("1234567".includes(event.key)) {
      let blocks = loadLevel(Number(event.key), scene.images["block"]);

      scene.changeLevel(blocks);
      return;
    }
    scene.keydowns[event.key] = true;
  });

  window.addEventListener("keyup", function(event) {
    scene.keydowns[event.key] = false;
  });

  // mouse drag

  mouseDragItem(scene);

  const ballSpeedControl = document.querySelector("#id-input-ball-speed");
  ballSpeedControl.addEventListener("input", function(event) {
    const input = event.target.value;
    ball.speedX = ball.speedX > 0 ? Number(input) : -Number(input);
    ball.speedY = ball.speedY > 0 ? Number(input) : -Number(input);
  });

  // record the press key into game object
  scene.registerAction("a", function() {
    paddle.moveLeft();
    if (!ball.fired) ball.moveLeft();
    // TODO
  });

  scene.registerAction("d", function(screenWidth) {
    paddle.moveRight(screenWidth);
    if (!ball.fired) ball.moveRight(screenWidth);
    // TODO
  });

  scene.registerAction("f", function() {
    ball.fire();
  });
}

function runloop(game, scene, paddle, ball, canvas) {
  runGameActions(scene, canvas);

  // update
  updateEvents(game, scene, ball, paddle, canvas);
  // clear
  scene.context.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  reDrawGame(scene, paddle, ball);
}

function mouseDragItem(scene) {
  // distanceX: distanceX(dragPointX, itemPointX)
  let enableDrag = false,
    dragItem,
    distanceX,
    distanceY;

  window.addEventListener("mousedown", function(event) {
    // click if in the item area
    let x = event.offsetX;
    let y = event.offsetY;
    let canDragItems = Array.from([...scene.items, ...scene.blocks]);
    if (beInArea(x, y, canDragItems)) {
      enableDrag = true;
      distanceX = dragItem.x - x;
      distanceY = dragItem.y - y;
    }
  });

  window.addEventListener("mousemove", function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    if (enableDrag) {
      dragItem.x = x + distanceX;
      dragItem.y = y + distanceY;
    }
  });

  window.addEventListener("mouseup", function(event) {
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

function runGameActions(scene, canvas) {
  var actions = Object.keys(scene.actions);
  for (var i = 0; i < actions.length; i++) {
    var key = actions[i];
    // log('g.keydowns[key]', g.keydowns[key])
    if (scene.keydowns[key]) {
      scene.actions[key](canvas.width);
    }
  }
}

function updateEvents(game, scene, ball, paddle, canvas) {
  // game over
  if (ball.y > paddle.y) {
    game.gameOver = true;
  }
  // pause
  if (ball.paused) {
    return;
  }

  // ball move
  ball.move();

  // ball touch the paddle
  if (paddle.collide(ball)) ball.rebound();

  // ball touch the block
  scene.blocks.forEach(block => {
    if (block.collide(ball)) {
      block.kill(game);
      ball.rebound();
    }
  });
}

function reDrawGame(scene, ball, paddle) {
  scene.draw(Array.from([paddle, ball]));
  scene.blocks.forEach(block => {
    if (block.alive) {
      scene.draw(Array.from([block]));
    }
  });
  scene.context.fillText("分数: " + scene.score, 10, 580);
}
