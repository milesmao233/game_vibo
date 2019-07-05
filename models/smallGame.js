import { Paddle, Ball, Block } from "./index.js";
import levels from "../models/level.js";

class SmallGame {
  constructor(context, images) {
    this.context = context;
    this.actions = {};
    this.keydowns = {};
    this.images = images;
    this.items = [];
    this.blocks = [];
    this.score = 0;
  }

  loadImages() {
    let s = [];
    let names = [];
    for (let i in this.images) {
      s.push(getImages(this.images[i]));
      names.push(i);
    }
    return Promise.all(s).then(values => {
      for (let i = 0; i < values.length; i++) {
        this.images[names[i]] = values[i];
      }
    });
  }

  bindEvents() {
    const paddleImage = this.images["paddle"];
    const ballImage = this.images["ball"];
    const blockImage = this.images["block"];

    const paddle = new Paddle("paddle", paddleImage, 200, 550, 8);
    const ball = new Ball("ball", ballImage, 250, 520, 8);

    const blocks = loadLevel(1, blockImage);
    this.blocks = blocks;

    this.items = [paddle, ball];
    bindGameInputEvent(this, paddle, ball);
  }

  run(canvas) {
    let [paddle, ball] = [...this.items];

    setInterval(() => {
      runloop(this, paddle, ball, canvas);
    }, 1000 / 30);
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

export default SmallGame;

// ********************************************************

function getImages(path) {
  const p = new Promise((resolve, reject) => {
    let img = new Image();
    img.src = path;
    img.onload = function() {
      resolve(img);
    };
  });

  return p;
}

function runloop(game, paddle, ball, canvas) {
  runGameActions(game, canvas);

  // update
  updateEvents(game, ball, paddle);
  // clear
  game.context.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  reDrawGame(game, paddle, ball);
}

function runGameActions(game, canvas) {
  var actions = Object.keys(game.actions);
  for (var i = 0; i < actions.length; i++) {
    var key = actions[i];
    // log('g.keydowns[key]', g.keydowns[key])
    if (game.keydowns[key]) {
      game.actions[key](canvas.width);
    }
  }
}

function updateEvents(game, ball, paddle) {
  // pause
  if (ball.paused) {
    return;
  }

  // ball move
  ball.move();

  // ball touch the paddle
  if (paddle.collide(ball)) ball.rebound();

  // ball touch the block
  game.blocks.forEach(block => {
    if (block.collide(ball)) {
      block.kill(game);
      ball.rebound();
    }
  });
}

function reDrawGame(game, ball, paddle) {
  game.draw(Array.from([paddle, ball]));
  game.blocks.forEach(block => {
    if (block.alive) {
      game.draw(Array.from([block]));
    }
  });
  game.context.fillText("分数: " + game.score, 10, 580);
}

function bindGameInputEvent(game, paddle, ball) {
  window.addEventListener("keydown", function(event) {
    if (event.key == "p") {
      ball.pause();
      return;
    }
    if ("1234567".includes(event.key)) {
      let blocks = loadLevel(Number(event.key), game.images["block"]);

      game.changeLevel(blocks);
      return;
    }
    game.keydowns[event.key] = true;
  });

  window.addEventListener("keyup", function(event) {
    game.keydowns[event.key] = false;
  });

  const ballSpeedControl = document.querySelector("#id-input-ball-speed");
  ballSpeedControl.addEventListener("input", function(event) {
    const input = event.target.value;
    ball.speedX = Number(input);
    ball.speedY = Number(input);
  });

  game.registerAction("a", function() {
    paddle.moveLeft();
    if (!ball.fired) ball.moveLeft();
    // TODO
  });

  game.registerAction("d", function(screenWidth) {
    paddle.moveRight(screenWidth);
    if (!ball.fired) ball.moveRight(screenWidth);
    // TODO
  });

  game.registerAction("f", function() {
    ball.fire();
  });
}

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
