var e = sel => document.querySelector(sel);

var log = console.log.bind(console);

var imageFromPath = function(path) {
  var img = new Image();
  img.src = path;
  return img;
};

var rectIntersects = function(a, b) {
  // 思路： 中心点的距离，小于等于宽或长的一半总和

  let aMiddleX = a.x + a.image.width / 2,
    aMiddleY = a.y + a.image.height / 2,
    bMiddleX = b.x + b.image.width / 2,
    bMiddleY = b.y + b.image.height / 2;

  return (
    Math.abs(bMiddleX - aMiddleX) <= a.image.width / 2 + b.image.width / 2 &&
    Math.abs(bMiddleY - aMiddleY) <= a.image.height / 2 + b.image.height / 2
  );
};

export { e, log, imageFromPath, rectIntersects };
