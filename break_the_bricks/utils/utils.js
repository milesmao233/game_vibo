var e = sel => document.querySelector(sel);

var log = console.log.bind(console);

var imageFromPath = function(path) {
    var img = new Image();
    img.src = path;
    return img;
};

var rectIntersects = function(a, b) {
    // 思路： 中心点的距离，小于等于宽一半总和 / 长的一半总和

    let aMiddleX = a.x + a.w / 2,
        aMiddleY = a.y + a.h / 2,
        bMiddleX = b.x + b.w / 2,
        bMiddleY = b.y + b.h / 2;

    return (
        Math.abs(bMiddleX - aMiddleX) <= a.w / 2 + b.w / 2 &&
        Math.abs(bMiddleY - aMiddleY) <= a.h / 2 + b.h / 2
    );
};

export { e, log, imageFromPath, rectIntersects };
