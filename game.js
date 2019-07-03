var log = console.log.bind(console);
var canvas = document.querySelector("#id-canvas");
var context = canvas.getContext("2d");

var x = 100;
var y = 200;
var speed = 5;

var img = new Image();
img.src = "paddle.png";
img.onload = function() {
  context.drawImage(img, x, y);
};

var leftDown = false;
var rightDown = false;

window.addEventListener("keydown", function(event) {
  var k = event.key;
  if (k == "a") {
    leftDown = true;
  } else if (k == "d") {
    rightDown = true;
  }
});

window.addEventListener("keyup", function(event) {
  var k = event.key;
  if (k == "a") {
    leftDown = false;
  } else if (k == "d") {
    rightDown = false;
  }
});

setInterval(function() {
  // update x
  if (leftDown) {
    x -= speed;
  } else if (rightDown) {
    x += speed;
  }

  // draw
  context.clearRect(0, 0, canvas.clientWidth, canvas.height);
  context.drawImage(img, x, y);
}, 1000 / 30);
