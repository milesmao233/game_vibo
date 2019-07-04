import { Ball, Paddle, Block } from "./models/index.js";

var log = console.log.bind(console);

class SmallGame {
  constructor(context) {
    this.context = context;
    this.actions = {};
    this.keydowns = {};
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
}

const bindGameInputEvent = (game, paddle, ball) => {
  window.addEventListener("keydown", function(event) {
    game.keydowns[event.key] = true;
  });

  window.addEventListener("keyup", function(event) {
    game.keydowns[event.key] = false;
  });

  game.registerAction("a", function() {
    paddle.moveLeft();
  });

  game.registerAction("d", function() {
    paddle.moveRight();
  });

  game.registerAction("f", function() {
    ball.fire();
  });
};

const updateEvents = (ball, paddle, block) => {
  ball.move();
  if (paddle.collide(ball)) ball.rebound();

  if (block.collide(ball)) {
    block.kill();
    ball.rebound();
  }
};

const bindEvent = (game, paddle, ball, block, canvas) => {
  // events

  bindGameInputEvent(game, paddle, ball);

  setInterval(function() {
    var actions = Object.keys(game.actions);
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i];
      // log('g.keydowns[key]', g.keydowns[key])
      if (game.keydowns[key]) {
        game.actions[key]();
      }
    }

    // update
    updateEvents(ball, paddle, block);
    // clear
    game.context.clearRect(0, 0, canvas.width, canvas.height);
    // draw
    game.draw(Array.from([paddle, ball]));
    if (block.alive) game.draw(Array.from([block]));
  }, 1000 / 30);
};

var __main = function() {
  var canvas = document.querySelector("#id-canvas");
  var context = canvas.getContext("2d");
  var game = new SmallGame(context);
  var paddle = new Paddle("paddle.png", 100, 200, 5);
  var ball = new Ball("ball.png", 100, 200, 10, 10);
  var block = new Block("block.png", 100, 100, 50, 20);

  bindEvent(game, paddle, ball, block, canvas);
};

__main();
