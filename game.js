import { Ball, Paddle, Block, SmallGame } from "./models/index.js";
import levels from "./models/level.js";
import { log } from "./utils.js";

const bindGameInputEvent = (game, paddle, ball) => {
  window.addEventListener("keydown", function(event) {
    if (event.key == "p") {
      ball.pause();
      return;
    }
    if ("1234567".includes(event.key)) {
      let blocks = loadLevel(Number(event.key));

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
};

const runloop = (game, paddle, ball, canvas) => {
  runGameActions(game, canvas);

  // update
  updateEvents(game, ball, paddle);
  // clear
  game.context.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  reDrawGame(game, paddle, ball);
};

const bindEvent = (game, paddle, ball, canvas) => {
  // bind events
  bindGameInputEvent(game, paddle, ball);
  // run
  setInterval(function() {
    runloop(game, paddle, ball, canvas);
  }, 1000 / 30);
};

const __main = () => {
  const canvas = document.querySelector("#id-canvas");
  const context = canvas.getContext("2d");

  const blocks = loadLevel(1);
  const game = new SmallGame(context, blocks);
  const paddle = new Paddle("paddle.png", 200, 550, 8);
  const ball = new Ball("ball.png", 250, 520, 8);

  bindEvent(game, paddle, ball, canvas);
};

__main();

// ****************

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
  if (ball.paused) {
    return;
  }
  ball.move();
  if (paddle.collide(ball)) ball.rebound();

  game.blocks.forEach(block => {
    if (block.collide(ball)) {
      block.kill();
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
}

function loadLevel(n) {
  n = n - 1;
  var level = levels[n];
  var blocks = level.map(block => {
    var x = block[0];
    var y = block[1];
    var lives = block[2] || 1;
    return new Block("block.png", x, y, lives, 50, 20);
  });
  return blocks;
}
